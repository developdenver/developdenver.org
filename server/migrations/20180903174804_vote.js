exports.up = (knex) => {
    return knex.schema.createTable("vote", vote => {
        vote.increments();
        vote.integer("talk_id").unsigned().notNullable().references('id').inTable('talk').onDelete('CASCADE');
        vote.integer("user_id").unsigned().notNullable().references('id').inTable('profile').onDelete('CASCADE');
    });
};

exports.down = (knex) => {
    return knex.schema.dropTableIfExists("vote");
};
