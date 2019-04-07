import { send } from '../utilities/email';

const Ticket = require('../models/ticket');
const UnclaimedTicket = require('../models/unclaimed_ticket');

export function ticketsPurchasedBy(userId) {
    return Ticket.database.raw(
        `
    SELECT
        t.*,
        ROW_TO_JSON(attendee) AS attendee,
        ROW_TO_JSON(unclaimed_ticket) as unclaimed_ticket
    FROM ticket t
    LEFT JOIN profile attendee ON (t.attendee_id = attendee.id)
    LEFT JOIN unclaimed_ticket ON (unclaimed_ticket.ticket_id = t.id)
    WHERE purchaser_id = :userId
      AND event_date = :eventDate
    `,
        { userId, eventDate: Ticket.nextEventDate },
    );
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
        attendee_id: purchaserWillNewlyAttend && ix === 0 ? purchaser.id : null,
        sku,
        discount_code,
        price_paid_cents: amountCents,
        event_date: Ticket.nextEventDate,
    }));
    const tickets = await Ticket.addAll(ticketData);
    let unclaimedTickets = [];
    if (unclaimedQuantity > 0) {
        const whichOnes = tickets.filter(t => t.attendee_id === null);
        const toInsert = whichOnes.map((tick, ix) => ({
            ticket_id: tick.id,
            claim_token: UnclaimedTicket.mkClaimToken(),
            emailed_to: invitees[ix],
        }));
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
        unclaimedTicket.claim_token
    } and log in or create an account.
    `;
    return send(
        unclaimedTicket.emailed_to,
        "You're Going to DVLP DNVR!",
        content,
    );
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

export async function exerciseClaim(claimantId, claim_token) {
    const unclaimedTickets = await UnclaimedTicket.database.raw(
        `DELETE FROM unclaimed_ticket
        WHERE claim_token = :claim_token
        RETURNING *`,
        { claim_token },
    );
    if (!unclaimedTickets.length) {
        return null;
    }
    const { ticket_id } = unclaimedTickets[0];
    return Ticket.update(ticket_id, {
        attendee_id: claimantId,
    });
}
