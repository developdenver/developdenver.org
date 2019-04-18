const request = require('supertest');
const assert = require('assert');
const { omit } = require('lodash/fp');
const profiles = require('../fixtures/profiles');
const app = require('../../src/app');
const testDatabase = require('../../src/database-connection');
const { generateToken } = require('../../src/utilities/auth');

const withoutSecrets = omit(['hashed_password', 'secret_key', 'password']);
describe('/profiles', () => {
    beforeEach(async () => {
        await testDatabase('profile').del();
        await testDatabase('profile').insert(profiles.list);
        await testDatabase.raw('ALTER SEQUENCE profile_id_seq RESTART WITH 3');
    });
    describe('GET multiple', () => {
        before(async () => {
            try {
                this.response = await request(app)
                    .get('/profiles')
                    .expect('Content-Type', /json/)
                    .expect(200);
            } catch (error) {
                throw new Error(error);
            }
        });
        it('returns a list of profiles', () => {
            assert.deepEqual(
                this.response.body.data,
                profiles.list.map(withoutSecrets),
            );
        });
    });
    describe('GET single', () => {
        before(async () => {
            try {
                this.response = await request(app)
                    .get('/profiles/2')
                    .expect('Content-Type', /json/)
                    .expect(200);
            } catch (error) {
                throw new Error(error);
            }
        });
        it('returns a profile', () => {
            assert.deepEqual(
                this.response.body.data,
                withoutSecrets(profiles.list[1]),
            );
        });
    });
    describe('POST', () => {
        before(async () => {
            try {
                this.firstListResponse = await request(app).get('/profiles');
                this.postResponse = await request(app)
                    .post('/profiles')
                    .send(profiles.new)
                    .expect('Content-Type', /json/)
                    .expect(201);
                this.secondListResponse = await request(app).get('/profiles');
            } catch (error) {
                throw new Error(error);
            }
        });
        it('lists two profiles before a profile is added', () => {
            assert.deepEqual(
                this.firstListResponse.body.data,
                profiles.list.map(withoutSecrets),
            );
        });
        it('returns a complete profile', () => {
            this.newProfile = Object.assign({}, { id: 3 }, profiles.new);
            assert.deepEqual(
                this.postResponse.body.data,
                withoutSecrets(this.newProfile),
            );
        });
        it('lists three profiles after a profile has been added', () => {
            this.newList = [...profiles.list, this.newProfile].map(
                withoutSecrets,
            );
            assert.deepEqual(this.secondListResponse.body.data, this.newList);
        });
    });
    describe('DELETE', () => {
        before(async () => {
            debugger;
            try {
                this.firstListResponse = await request(app).get('/profiles');
                this.deleteResponse = await request(app)
                    .delete('/profiles/1')
                    .set({
                        Authorization: `Bearer ${generateToken(
                            profiles.list[0],
                        )}`,
                    })
                    .expect(204);
                this.secondListResponse = await request(app).get('/profiles');
            } catch (error) {
                throw new Error(error);
            }
        });
        it('lists 2 profiles before deleting', () => {
            assert.deepEqual(
                this.firstListResponse.body.data,
                profiles.list.map(withoutSecrets),
            );
        });
        it('returns nothing on DELETE', () => {
            assert.ok(!this.deleteResponse.body.data);
        });
        it('lists 1 profile after DELETEing', () => {
            assert.deepEqual(this.secondListResponse.body.data, [
                withoutSecrets(profiles.list[1]),
            ]);
        });
    });
    describe('PUT', () => {
        before(async () => {
            this.firstListResponse = await request(app).get('/profiles/1');
            this.updateResponse = await request(app)
                .put('/profiles/1')
                .set({
                    Authorization: `Bearer ${generateToken(
                        profiles.list[0],
                    )}`,
                })
                .send(withoutSecrets(profiles.new))
                .expect('Content-Type', /json/)
                .expect(200);
            this.updatedProfile = Object.assign(
                { id: 1 },
                withoutSecrets(profiles.new),
            );
            this.secondListResponse = await request(app).get('/profiles/1');
        });
        it('reads a profile before updating', () => {
            assert.deepEqual(
                this.firstListResponse.body.data,
                withoutSecrets(profiles.list[0]),
            );
        });
        it('returns the modified profile on PUT', () => {
            assert.deepEqual(
                this.updateResponse.body.data,
                this.updatedProfile,
            );
        });
        it('reads the new profile after updating', () => {
            assert.deepEqual(
                this.secondListResponse.body.data,
                this.updatedProfile,
            );
        });
    });
});
