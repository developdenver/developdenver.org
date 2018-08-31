exports.up = (knex) => {
  return knex.schema.createTable("talk", talk => {
    talk.increments();
    talk.string("title");
    talk.string("type");
    talk.string("talk_photo_url");
    talk.text("description");
    talk.integer("vote_count");
    talk.integer("user_id").references('id').inTable('profile').onDelete('CASCADE');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists("talk");
};