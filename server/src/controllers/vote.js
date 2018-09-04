const Vote = require("../models/vote");

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