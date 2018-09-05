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

    list(user_id) {
        return this.database(this.modelName)
            .where({ user_id });            
    }

    add(talk_id, user_id) {
        const item = {
            talk_id,
            user_id,
        };
        return this.database(this.modelName)
            .insert(item)
            .then(items => items[0])
            .catch(error => {
                throw new Error(error.message);
            });
    }

    remove(talk_id, user_id) {
        const item = {
            talk_id,
            user_id,
        };
        return this.database(this.modelName)
            .del(item)
            .catch(error => {
                throw new Error(error.message);
            });
    }
}

module.exports = new Vote();
