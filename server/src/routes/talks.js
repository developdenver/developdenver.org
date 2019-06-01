const express = require('express');
const passport = require('passport');
const router = express.Router();
const { checkLogin } =require('../auth/auth-middleware');
const VoteController = require('../controllers/vote');
const Ticket = require('../models/ticket');
const Talk = require('../models/talk');

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

async function mustOwnTalk(req, res, next) {
    const user = req.user;
    const talk = await Talk.find(req.params.id);
    if (talk.user_id !== user.id) {
        next(new Error('must own talk to take this action'));
    } else {
        next();
    }
}

export default app => {
    router.get('/', checkLogin, list);
    router.get('/:title', read);
    router.use(passport.authenticate('jwt', { session: false }));
    router.post('/:id/vote', isTicketHolder, VoteController.vote);
    router.post('/:id/unvote', isTicketHolder, VoteController.unvote);
    router.post('/', create);
    router.put('/:id', mustOwnTalk, update);
    router.delete('/:id', mustOwnTalk, destroy);

    return router;
};
