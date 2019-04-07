const express = require('express');
const passport = require('passport');
const router = express.Router();
const VoteController = require('../controllers/vote');
const Ticket = require('../models/ticket');

const { create, read, update, destroy, list } = require('../controllers/talk');

async function isTicketHolder(request, response, next) {
    const holdsCurrentTicket = await Ticket.holdsCurrentTicket(request.user.id);
    if (holdsCurrentTicket) {
        next();
    } else {
        const error = new Error('You must have a ticket to vote.');
        error.status = 401;
        next(error);
    }
}

export default app => {
    router.get('/', list);
    router.get('/:title', read);
    router.use(passport.authenticate('jwt', { session: false }));
    router.post('/:id/vote', isTicketHolder, VoteController.vote);
    router.post('/:id/unvote', isTicketHolder, VoteController.unvote);
    router.post('/', create);
    router.put('/:id', update);
    router.delete('/:id', destroy);

    return router;
};
