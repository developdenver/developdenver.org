
exports.up = function(knex, Promise) {
    return knex.schema.raw(`
    CREATE TABLE unclaimed_ticket (
        ticket_id integer PRIMARY KEY NOT NULL REFERENCES ticket(id) ON DELETE CASCADE,
        claim_token character varying(10),
        emailed_to character varying(255)
    )
    `);
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('unclaimed_ticket');
};
