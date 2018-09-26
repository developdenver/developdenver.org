exports.up = function(knex, Promise) {
    return knex.schema.table("talk", talk => {
        talk.boolean("is_accepted");
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table("talk", talk => {
        talk.dropColumn("is_accepted");
    });
};
