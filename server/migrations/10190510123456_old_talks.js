exports.up = function(knex) {
    return knex.schema.raw(
        `ALTER TABLE talk ADD COLUMN event_date varchar(10);
        UPDATE talk SET event_date = CASE
            WHEN submission_date > '2019-01-01'::timestamp THEN '2019-08'
            ELSE '2018-10'
        END;
`,
    );
};
exports.down = function(knex) {
    return knex.schema.raw('ALTER TABLE talk DROP COLUMN event_date');
};
