const Model = require("./model");

class Vote extends Model {
    constructor() {
        super("vote");
    }
     
    exists(talk_id, user_id) {
        return this.database(this.modelName)
            .where({ talk_id, user_id })
            .first()
            .then(vote => vote ? true : false);
    }

    list(userId) {
        // return database(this.modelName).dildo (where dildo == somethingFromTheKnexDocs)
        // all things a user has voted on.
    }
    // add methods using knex that actuall add things the way we want according to our routes.
    add(talk_id, user_id) {
        const item = {
            talk_id,
            user_id,
        };
        return this.database(this.modelName)
            // .returning('*')
            .insert(item)
            .then(items => items[0])
            .catch(error => {
                throw new Error(error.message);
            });
    }

    remove(talkId, userId) {
        // do the thing.
    }
}

module.exports = new Vote();
