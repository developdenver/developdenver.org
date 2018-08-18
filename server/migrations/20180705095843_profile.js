exports.up = (knex) => {
    return knex.schema.createTable("profile", profile => {
        profile.increments();
        profile.string("first_name");
        profile.string("last_name");
        profile.string("email");
        profile.string("salt");
        profile.string("hashed_password");
        profile.string("profile_photo_url");
        profile.text("bio");
        profile.string("employer");
        profile.string("position");
        profile.string("website");
        profile.string("linkedin_username");
        profile.string("github_username");
        profile.string("twitter_username");
        profile.string("secret_key");
        profile.string("role");
        profile.string("ticket_level");
        profile.boolean("is_looking");
        profile.boolean("is_student");
        profile.boolean("is_self_employed");
        profile.boolean("is_over_21");
    });
};

exports.down = (knex) => {
    return knex.schema.dropTableIfExists("profile");
};
