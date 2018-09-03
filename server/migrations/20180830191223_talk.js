exports.up = (knex) => {
    return knex.schema.createTable("talk", talk => {
        talk.increments();
        talk.string("title").notNullable();
        talk.string("type").notNullable();
        talk.string("talk_photo_url").notNullable();
        talk.text("description").notNullable();
        talk.integer("user_id").unsigned().notNullable().references('id').inTable('profile').onDelete('CASCADE');
        talk.dateTime("submission_date").defaultTo(knex.fn.now());
    });
};

exports.down = (knex) => {
    return knex.schema.dropTableIfExists("talk");
};
