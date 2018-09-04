const Vote = require("../models/vote");

function vote(request, response, next) {
    Vote.add(Number(request.body.id), Number(request.body.user_id))
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