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
        // do the thing
    }

    remove(userId, talkId) {
        // do the thing.
    }
}

module.exports = new Vote();
