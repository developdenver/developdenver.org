const Vote = require("../models/vote");

function getVotes(request, response, next) {
    console.log('user', request.user)
    Vote.list(request.user.id)
        .then(votes => {
            response.status(200).json({
                data:votes,
            })
        }).catch(error => next(error));
}

async function vote(request, response, next) {
    const talk_id = request.params.id;
    const user_id = request.user.id;
    const exists = await Vote.exists(talk_id, user_id);
    if (exists) {
        return response.status(409).json({
            message: "Quit it."
        });
    }
    Vote.add(talk_id, user_id)
        .then(vote => {
            response.status(201).json({
                data: vote,
            });
        }).catch(error => next(error));
}

function unvote(request, response, next) {
    const talk_id = request.params.id;
    const user_id = request.user.id;
    Talk.remove(talk_id, user_id)
        .then(() => {
            response.status(202).send();
        }).catch(error => next(error));
}

module.exports = {
    vote,
    unvote,
    getVotes,
};