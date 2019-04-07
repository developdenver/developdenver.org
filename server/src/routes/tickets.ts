import { sendInvitationEmail } from '../controllers/ticket';

const express = require('express');
const Ticket = require('../models/ticket');
const passport = require('passport');
const UnclaimedTicket = require('../models/unclaimed_ticket');
const { ClientError } = require('../error-handling');
const { ticketsPurchasedBy, exerciseClaim } = require('../controllers/ticket');

async function mustOwnTicket(req, res, next) {
    const userId = req.user.id;
    const ticketId = req.params.ticketId;
    const ticket = await Ticket.find(ticketId);
    const ownsTicket = ticket && ticket.purchaser_id === userId;
    if (!ownsTicket) {
        return next(
            new ClientError(
                'You must be the owner of the ticket to take this action',
            ),
        );
    }
    req.ticket = ticket;
    return next();
}

async function ticketMustBeUnclaimed(req, res, next) {
    const ticketId = req.params.ticketId;
    const unclaimedTicket = await UnclaimedTicket.find(ticketId);
    if (!unclaimedTicket) {
        return next(
            new ClientError(
                'Ticket could not be found, or has already been claimed',
            ),
        );
    }
    req.unclaimedTicket = unclaimedTicket;
    return next();
}

async function listMyTickets(req, res) {
    const userId = req.user.id;
    const tickets = await ticketsPurchasedBy(userId);
    res.json({ tickets });
}

async function remindUnclaimedTicket(req, res) {
    const { unclaimedTicket, user } = req;
    if (!unclaimedTicket.emailed_to) {
        throw new ClientError('Ticket has not been assigned to an email');
    }
    await sendInvitationEmail(user, unclaimedTicket);
    res.json({ status: 'success' });
}

async function revokeUnclaimedTicket(req, res) {
    const { ticketId } = req.params;
    await UnclaimedTicket.update(ticketId, {
        claim_token: UnclaimedTicket.mkClaimToken(),
        emailed_to: null,
    });
    res.json({ status: 'success' });
}

async function shareUnclaimedTicket(req, res) {
    const { user } = req;
    const { ticketId } = req.params;
    const { email } = req.body;
    const claim_token = UnclaimedTicket.mkClaimToken();
    const ticket = await UnclaimedTicket.update(
        ticketId,
        {
            claim_token,
            emailed_to: email,
        },
        true,
    );
    await sendInvitationEmail(user, ticket);
    res.json({ status: 'success' });
}

async function claimTicket(req, res) {
    const userId = req.user.id;
    const claim_token = req.params.claimTicket;
    const ticket = await exerciseClaim(userId, claim_token);
    res.json(ticket);
}

export default app => {
    const router = express.Router();
    router.use(passport.authenticate('jwt', { session: false }));
    router.get('/', listMyTickets);
    router.post(
        '/:ticketId/remind',
        mustOwnTicket,
        ticketMustBeUnclaimed,
        remindUnclaimedTicket,
    );
    router.post(
        '/:ticketId/revoke',
        mustOwnTicket,
        ticketMustBeUnclaimed,
        revokeUnclaimedTicket,
    );
    router.post(
        '/:ticketId/share',
        mustOwnTicket,
        ticketMustBeUnclaimed,
        shareUnclaimedTicket,
    );
    router.get('/:claimToken/claim', claimTicket);
    return router;
};
