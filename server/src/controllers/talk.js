const Talk = require("../models/talk");
const Ticket = require('../models/ticket');

function create(request, response, next) {
  request.body.user_id = request.user.id;
  Talk.add({ ...request.body, event_date: Ticket.nextEventDate }, true)
    .then(talk => {
      response.status(201).json({
        data: talk,
      });
    }).catch(error => next(error));
}

function read(request, response, next) {
  Talk.find(request.params.title)
    .then(talks => {
      response.status(200).json({
        data: talks
      });
    }).catch(error => next(error));
}

function update(request, response, next) {
  Talk.update(request.params.id, request.body)
    .then(talk => {
      response.status(200).json({
        data: talk
      });
    }).catch(error => next(error));
}

function destroy(request, response, next) {
  Talk.remove(request.params.id)
    .then(() => {
      response.status(204).send();
    }).catch(error => next(error));
}

function list(request, response, next) {
  const loggedInUser = request.user && request.user.id || null;
  console.log('LOGGED IN USER', loggedInUser, request.user)
  const knex = Talk.database;

  knex
    .select(knex.raw('talk.*, vote.id IS NOT NULL as voted'))
    .from('talk')
    .leftJoin('vote', function() {
      this.on('talk.id', '=', 'vote.talk_id')
        .andOn('vote.user_id', '=', knex.raw('?', [loggedInUser]));
    })
    .where({ event_date: Ticket.nextEventDate })

    .then(talks => {
      response.status(200).json({
        data: talks
      });
    }).catch(error => next(error));
}

module.exports = {
  create,
  read,
  update,
  destroy,
  list,
};
