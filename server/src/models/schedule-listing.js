const Model = require("./model");

class Event extends Model {
    constructor() {
        super("schedule_listing");
        this.publicProperties = [
            "id", "talk_id", "title", "type", "description", "talk_photo_url",
            "author_id", "author_first_name", "author_photo_url",
            "author_last_name", "category", "venue", "day",
            "venue_coordinates", "venue_address", "start_time", "duration"
        ]
    }
    find(id){
        return this.list().where("schedule_listing.id", id).first();
    }
    list(){
        return this.database("schedule_listing")
            .select(
                "schedule_listing.id as id", "talk.id as talk_id", "talk.title as title",
                "talk.type as type", "talk.description as description",
                "talk.talk_photo_url as talk_photo_url",
                "profile.id as author_id", "profile.first_name as first_name",
                "profile.last_name as last_name", "profile.profile_photo_url",
                "talk.category as category", "venue.name as venue",
                "schedule_listing.day", "venue.coordinates as venue_coordinates",
                "venue.location as venue_address",
                "schedule_listing.start_time as start_time",
                "schedule_listing.duration as duration"
            ).innerJoin("talk", "schedule_listing.talk_id", "talk.id")
            .innerJoin("venue", "schedule_listing.venue_id", "venue.id")
            .innerJoin("profile", "talk.user_id", "profile.id")
    }
}

module.exports = new Event();
