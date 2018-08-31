const Talk = require("../models/talk");

function create(request, response, next) {
  const fullTalk = Talk.add(request.body, true)
    .then(fullTalk => {
      Talk.find(fullTalk.id, false).then(talk => {
        response.status(201).json({
          data: talk,
        });
      });
    }).catch(error => next(error));
}

function read(request, response, next) {
  Talk.find(request.params.id)
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
  Talk.list()
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
