const Model = require("./model");

class Event extends Model {
    constructor() {
        super("event");
        this.publicProperties = [
            "id", "title", "type", "description", "talk_photo_url",
            "author_id", "author_first_name", "author_photo_url",
            "author_last_name", "category"
        ]
    }
    find(id){
        return this.list().where("id", id).first();
    }
    list(){
        return this.database("talk")
            .select(
                "talk.id as id", "talk.title as title",
                "talk.type as type", "talk.description as description",
                "talk.talk_photo_url as talk_photo_url",
                "profile.id as author_id", "profile.first_name as first_name",
                "profile.last_name as last_name", "profile.profile_photo_url",
                "talk.category as category"
            ).innerJoin("profile", "talk.user_id", "profile.id")
            .where("talk.is_accepted", true);
    }
}

module.exports = new Event();
