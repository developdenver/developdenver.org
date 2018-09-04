const Vote = require("../models/vote");

function vote(request, response, next) {
    Vote.add(request.body, true)
        .then(vote => {
            response.status(201).json({
                data: vote,
            });
        }).catch(error => next(error));
}

function unvote(request, response, next) {
    Talk.remove(request.params.id)
        .then(() => {
            response.status(204).send();
        }).catch(error => next(error));
}

module.exports = {
    add,
    destroy,
};