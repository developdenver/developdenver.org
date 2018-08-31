exports.up = (knex) => {
  return knex.schema.createTable("talk", talk => {
    talk.increments();
    talk.string("title");
    talk.string("type");
    talk.string("talk_photo_url");
    talk.text("description");
    talk.integer("vote_count");
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists("talk");
};