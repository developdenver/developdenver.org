const Vote = require("../models/vote");

function vote(request, response, next) {
    Vote.add(request.params.id, request.user.id)
        .then(vote => {
            response.status(201).json({
                data: vote,
            });
        }).catch(error => next(error));
}

function unvote(request, response, next) {
    console.log(request)
    Talk.remove(request)
        .then(() => {
            response.status(204).send();
        }).catch(error => next(error));
}

module.exports = {
    vote,
    unvote,
};