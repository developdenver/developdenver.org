exports.up = function(knex, Promise) {
    return knex.schema.table("talk", talk => {
        talk.text("talk_photo_url").notNullable().alter();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table("talk", talk => {
        talk.string("talk_photo_url").notNullable().alter();
    });
};
