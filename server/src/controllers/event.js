const Event = require("../models/event");

function read(request, response, next) {
  Event.find(request.params.id)
    .then(event => {
      response.status(200).json({
        data: event
      });
    }).catch(error => next(error));
}

function list(request, response, next) {
  Event.list()
    .then(events => {
      response.status(200).json({
        data: events
      });
    }).catch(error => next(error));
}

module.exports = {
  read,
  list,
};
