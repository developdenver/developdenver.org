exports.up = async (knex, Promise) => {
    await knex.schema.createTable("venue", venue => {
        venue.increments();
        venue.string("name");
        venue.string("location");
        venue.string("coordinates");
    });
    await knex.schema.createTable("schedule_listing", scheduleListing => {
        scheduleListing.increments();
        scheduleListing.string("day");
        scheduleListing.decimal("start_time");
        scheduleListing.decimal("duration");
        scheduleListing.integer("venue_id").references("id").on("venue");
        scheduleListing.integer("talk_id").references("id").on("talk");
    });
    return true;
};

exports.down = async (knex, Promise) => {
    await knex.schema.dropTableIfExists("schedule_listing");
    await knex.schema.dropTableIfExists("venue");
    return true;
};
