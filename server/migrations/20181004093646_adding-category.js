exports.up = function(knex, Promise) {
    return knex.schema.table("talk", profile => {
        profile.string("category").defaultTo("");
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table("talk", profile => {
        profile.string("category");
    });
};
