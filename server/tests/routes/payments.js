const request = require('supertest');
const assert = require('assert');
const app = require('../../src/app');
const profiles = require('../fixtures/profiles');
const testDatabase = require('../../src/database-connection');
const { generateToken } = require('../../src/utilities/auth');
const Ticket = require('../../src/models/ticket');

describe('/payments', () => {
    beforeEach(async () => {
        await testDatabase('profile').del();
        await testDatabase('profile').insert(profiles.list);
        await testDatabase('ticket').del();
    });
    it('anonymous purchase should be rejected', async () => {
        this.response = await request(app)
            .post('/payments')
            .expect(401);
    });
    it('should accept a regular ticket sale', async () => {
        const user = profiles.list[0];
        this.response = await request(app)
            .post('/payments')
            .set({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${generateToken(user)}`,
            })
            .send({
                description: '4 - Schiller, Brian',
                email: 'nope@nope.nope',
                sku: 'skuRegular',
                token: 'tok_visa',
            })
            .expect('Content-Type', /json/)
            .expect(200);
        assert.equal(await Ticket.holdsCurrentTicket(user.id), true);
    });
    it('should reject a ticket sale with invalid card', async () => {
        const user = profiles.list[0];
        this.response = await request(app)
            .post('/payments')
            .set({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${generateToken(user)}`,
            })
            .send({
                description: '4 - Schiller, Brian',
                email: 'nope@nope.nope',
                sku: 'skuRegular',
                token: 'tok_chargeDeclined',
            })
            .expect('Content-Type', /json/)
            .expect(400);
        assert.equal(await Ticket.holdsCurrentTicket(user.id), false);
    });
    it('should reject a ticket sale for skuStudent without a code', async () => {
        const user = profiles.list[0];
        this.response = await request(app)
            .post('/payments')
            .set({
                Authorization: `Bearer ${generateToken(user)}`,
            })
            .send({
                description: '4 - Schiller, Brian',
                email: 'nope@nope.nope',
                sku: 'skuStudent',
                token: 'tok_visa',
            })
            .expect('Content-Type', /json/)
            .expect(400);
        assert.equal(await Ticket.holdsCurrentTicket(user.id), false);
    });
});
