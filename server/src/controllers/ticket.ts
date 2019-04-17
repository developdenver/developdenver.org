import { send } from '../utilities/email';

const Ticket = require('../models/ticket');
const UnclaimedTicket = require('../models/unclaimed_ticket');

export function ticketsForUser(userId) {
    return Ticket.database
        .raw(
            `
    SELECT
        t.*,
        CASE WHEN attendee IS NULL THEN NULL ELSE JSON_BUILD_OBJECT(
            'id', attendee.id,
            'first_name', attendee.first_name,
            'last_name', attendee.last_name,
            'email', attendee.email
        ) END AS attendee,
        CASE WHEN unclaimed_ticket IS NULL THEN NULL ELSE JSON_BUILD_OBJECT(
            'ticket_id', unclaimed_ticket.ticket_id,
            'emailed_to', unclaimed_ticket.emailed_to
        ) END as unclaimed_ticket
    FROM ticket t
    LEFT JOIN profile attendee ON (t.attendee_id = attendee.id)
    LEFT JOIN unclaimed_ticket ON (unclaimed_ticket.ticket_id = t.id)
    WHERE (purchaser_id = :userId OR attendee_id = :userId)
      AND event_date = :eventDate
    `,
            { userId, eventDate: Ticket.nextEventDate },
        )
        .then(result => result.rows);
}

export function revokeTicketClaim({ unclaimedTicketId }) {
    return UnclaimedTicket.update(
        unclaimedTicketId,
        { claim_token: UnclaimedTicket.mkClaimToken() },
        true,
    );
}

export async function createTickets({
    purchaser,
    amountCents,
    discount_code,
    invitees,
    quantity,
    sku,
}) {
    // insert {quantity} tickets
    // if quantity > invitees, create UnclaimedTickets
    // for each unclaimed ticket with an email address, send an email
    // unless an email address belongs to the purchaser, and they are not already an attendee
    const purchaserWillNewlyAttend =
        invitees.includes(purchaser.email) &&
        !(await Ticket.holdsCurrentTicket(purchaser.id));

    const unclaimedQuantity = quantity - invitees.length;
    const ticketData = Array.from({ length: quantity }).map((_, ix) => ({
        purchaser_id: purchaser.id,
        attendee_id:
            purchaserWillNewlyAttend && invitees[ix] === purchaser.email
                ? purchaser.id
                : null,
        sku,
        discount_code,
        price_paid_cents: amountCents,
        event_date: Ticket.nextEventDate,
    }));
    const tickets = await Ticket.addAll(ticketData);
    let unclaimedTickets = [];
    if (unclaimedQuantity > 0) {
        const toInsert = tickets
            .map((tick, ix) => {
                if (tick.attendee_id !== null) return null;
                return {
                    ticket_id: tick.id,
                    claim_token: UnclaimedTicket.mkClaimToken(),
                    emailed_to: invitees[ix],
                };
            })
            .filter(t => !!t);
        unclaimedTickets = await UnclaimedTicket.addAll(toInsert);
    }
    return { tickets, unclaimedTickets };
}

export function sendInvitationEmail(purchaser, unclaimedTicket) {
    // TODO fill out the claimUrl, check with Gabi for the copy
    const purchaserName = purchaser.first_name
        ? `${purchaser.first_name} ${purchaser.last_name}`
        : purchaser.email;
    const content = `
## Congratulations!

${purchaserName} bought you a ticket to DVLP DNVR! To claim your ticket, visit ${
        process.env.FRONTEND_URL
    }/claim-ticket/${
        unclaimedTicket.claim_token
    } and log in or create an account.
    `;
    return send(
        unclaimedTicket.emailed_to,
        "You're Going to DVLP DNVR!",
        content,
    );
}

export function sendConfirmationEmail(email, unclaimedTickets) {
    const content = `
## Success!

Hi-five! You've purchased your ticket to DVLP DNVR. We will see you on Aug 15th and 16th. Before then make sure to come back to the site and log in. We'll email you when Call for Proposals start. After all call to proposals are in, all ticket holders will have time to submit their votes. These votes help determine our schedule for the year.

We'll keep you up to date. Thank you for contributing to the Denver tech community! It's going to be awesome.

If you purchased more than one ticket, you can manage your invitations at ${
        process.env.FRONTEND_URL
    }/profiles/me/tickets
    `;
    return send(email, "You're Going to DVLP DNVR!", content);
}

export async function shareUnclaimedTicket(
    purchaser,
    unclaimedTicket,
    emailed_to,
) {
    const claim_token = UnclaimedTicket.mkClaimToken();
    await UnclaimedTicket.update(unclaimedTicket.id, {
        claim_token,
        emailed_to,
    });
    await sendInvitationEmail(purchaser, unclaimedTicket);
}

export async function exerciseClaim(claimant, claim_token) {
    const unclaimedTickets = await UnclaimedTicket.database('unclaimed_ticket')
        .delete()
        .where({ claim_token })
        .returning('*');
    if (!unclaimedTickets.length) {
        return null;
    }
    const { ticket_id } = unclaimedTickets[0];
    const ticket = await Ticket.update(ticket_id, {
        attendee_id: claimant.id,
    });
    await sendConfirmationEmail(claimant.email, []);
    return ticket;
}
