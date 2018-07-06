const assert = require("assert");
const request = require("supertest");
const database = require("../src/database-connection");

const app = require("../src/app");

describe("/profiles", () => {
    beforeEach(() => {
        // Seed database
        return database.seed.run();
    });
    it("returns a list of profiles", done => {
        request(app)
            .get("/profiles")
            .expect("Content-Type", /json/)
            .expect(200)
            .then(response => {
                assert.deepEqual(response.body.data, [{
                    id: 1,
                    first_name: "First",
                    last_name: "Last",
                    email_address: "email@address.com",
                    linkedin_username: "linkedin",
                    github_username: "github",
                    twitter_username: "twitter",
                    website_url: "https://website.com",
                    is_looking: false,
                    is_student: false,
                    is_self_employed: false,
                    employer: "Employer",
                    position: "Position",
                    bio: "Bio",
                    profile_photo_url: "http://via.placeholder.com/500x500",
                    is_over_21: true
                },{
                    id: 2,
                    first_name: "First2",
                    last_name: "Last2",
                    email_address: "email2@address.com",
                    linkedin_username: "linkedin2",
                    github_username: "github2",
                    twitter_username: "twitter2",
                    website_url: "https://website2.com",
                    is_looking: true,
                    is_student: true,
                    is_self_employed: true,
                    employer: "Employer2",
                    position: "Position2",
                    bio: "Bio2",
                    profile_photo_url: "http://via.placeholder.com/500x500",
                    is_over_21: false
                }]);
                done();
            }).catch(done);
    });
    it("returns a profile", done => {
        request(app)
            .get("/profiles/2")
            .expect("Content-Type", /json/)
            .expect(200)
            .then(response => {
                assert.deepEqual(response.body.data, {
                    id: 2,
                    first_name: "First2",
                    last_name: "Last2",
                    email_address: "email2@address.com",
                    linkedin_username: "linkedin2",
                    github_username: "github2",
                    twitter_username: "twitter2",
                    website_url: "https://website2.com",
                    is_looking: true,
                    is_student: true,
                    is_self_employed: true,
                    employer: "Employer2",
                    position: "Position2",
                    bio: "Bio2",
                    profile_photo_url: "http://via.placeholder.com/500x500",
                    is_over_21: false
                });
                done();
            }).catch(done);
    });
    it("adds a profile", done => {
        request(app)
            .post("/profiles")
            .send({
                first_name: "First3",
                last_name: "Last3",
                email_address: "email3@address.com",
                linkedin_username: "linkedin3",
                github_username: "github3",
                twitter_username: "twitter3",
                website_url: "https://website3.com",
                is_looking: true,
                is_student: true,
                is_self_employed: true,
                employer: "Employer3",
                position: "Position3",
                bio: "Bio3",
                profile_photo_url: "http://via.placeholder.com/500x500",
                is_over_21: false
            }).expect("Content-Type", /json/)
            .expect(201)
            .then(response => {
                assert.deepEqual(response.body.data, {
                    id: 3,
                    first_name: "First3",
                    last_name: "Last3",
                    email_address: "email3@address.com",
                    linkedin_username: "linkedin3",
                    github_username: "github3",
                    twitter_username: "twitter3",
                    website_url: "https://website3.com",
                    is_looking: true,
                    is_student: true,
                    is_self_employed: true,
                    employer: "Employer3",
                    position: "Position3",
                    bio: "Bio3",
                    profile_photo_url: "http://via.placeholder.com/500x500",
                    is_over_21: false
                });
                done();
            }).catch(done);
    });
    it("deletes a profile", done => {
        request(app)
            .get("/profiles")
            .then(response => {
                assert.equal(response.body.data.length, 2);
            }).then(() => {
                return request(app)
                    .delete("/profiles/1")
                    .expect(204);
            }).then(() => {
                return request(app)
                    .get("/profiles")
                    .then(response => {
                        assert.equal(response.body.data.length, 1);
                        assert.deepEqual(response.body.data, [{
                            id: 2,
                            first_name: "First2",
                            last_name: "Last2",
                            email_address: "email2@address.com",
                            linkedin_username: "linkedin2",
                            github_username: "github2",
                            twitter_username: "twitter2",
                            website_url: "https://website2.com",
                            is_looking: true,
                            is_student: true,
                            is_self_employed: true,
                            employer: "Employer2",
                            position: "Position2",
                            bio: "Bio2",
                            profile_photo_url: "http://via.placeholder.com/500x500",
                            is_over_21: false
                        }]);
                        done();
                    });
            }).catch(done);
    });
});
