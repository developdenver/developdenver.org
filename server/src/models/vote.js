const Model = require("./model");

class Vote extends Model {
    constructor() {
        super("vote");
    }
    list(userId) {
        // return database(this.modelName).dildo (where dildo == somethingFromTheKnexDocs)
        // all things a user has voted on.
    }
    // add methods using knex that actuall add things the way we want according to our routes.
    add(userId, talkId) {
        const item = {
            talk_id: talkId,
            user_id: userId,
        };
        return this.database(this.modelName)
            // .returning('*')
            .insert(item)
            .then(items => items[0])
            .catch(error => {
                throw new Error(error.message);
            });
    }

    remove(userId, talkId) {
        // do the thing.
    }
}

module.exports = new Vote();
