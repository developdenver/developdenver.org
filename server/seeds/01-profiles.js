const faker = require("faker");

const profiles = [1, 2, 3, 4, 5].map(profileFactory);

exports.seed = async (knex) => {
    await knex("profile").del();
    await knex("profile").insert(profiles);
    await knex.raw("ALTER SEQUENCE profile_id_seq RESTART WITH 6");
};

function profileFactory(id){
    return {
        id,
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        linkedin_username: faker.internet.userName(),
        github_username: faker.internet.userName(),
        twitter_username: faker.internet.userName(),
        website: faker.internet.url(),
        is_looking: faker.random.boolean(),
        is_student: faker.random.boolean(),
        is_self_employed: faker.random.boolean(),
        employer: faker.company.companyName(),
        position: faker.name.jobTitle(),
        bio: faker.lorem.paragraph(),
        profile_photo_url: faker.internet.avatar(),
        is_over_21: faker.random.boolean()
    };
}
