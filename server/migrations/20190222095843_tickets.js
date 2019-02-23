exports.up = function(knex, Promise) {
    return knex.schema.raw(`
    CREATE TABLE ticket (
        id SERIAL PRIMARY KEY,
        purchaser_id integer NOT NULL REFERENCES profile(id) ON DELETE CASCADE,
        date_purchased timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        sku character varying(255) NOT NULL,
        discount_code character varying(255),
        price_paid_cents integer NOT NULL,
        event_date character varying(30) NOT NULL
    )
    `);
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('ticket');
};
