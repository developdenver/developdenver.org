exports.up = (knex) => {
    return knex.schema.table("profile", profile => {
        profile.boolean("is_self_employed").defaultTo(false);
    });
};

exports.down = (knex) => {
    return knex.schema.table("profile", profile => {
        profile.dropColumn("is_self_employed");
    });
};
