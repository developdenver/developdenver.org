const Model = require("./model");

class Talk extends Model {
    constructor() {
        super("talk");
        this.publicProperties = [
            "id", "title", "type", "description",
            "talk_photo_url", "user_id", "category"
        ];
    }
}

module.exports = new Talk();
