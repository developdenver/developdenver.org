import request from 'supertest';
import assert from 'assert';
const app = require('../../src/app');
const profiles = require('../fixtures/profiles');
const tickets = require('../fixtures/tickets');
const testDatabase = require('../../src/database-connection');
const { generateToken } = require('../../src/utilities/auth');
const Ticket = require('../../src/models/ticket');
const Profile = require('../../src/models/profile');
const UnclaimedTicket = require('../../src/models/unclaimed_ticket');

describe('/tickets', () => {
    beforeEach(async () => {
        await testDatabase('profile').del();
        await testDatabase('profile').insert(profiles.list);
        await testDatabase('ticket').insert(tickets.list);
        await testDatabase('unclaimed_ticket').insert(tickets.unclaimed);
    });

    describe('listMyTickets', () => {
        it('requires login', () => {
            return request(app)
                .get('/tickets')
                .expect(401);
        });
        it('lists no tickets for a no-ticket user', () => {
            return request(app)
                .get('/tickets')
                .set({
                    Authorization: `Bearer ${generateToken(profiles.list[1])}`,
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .then(response => assert.deepEqual(response.body.tickets, []));
        });
        it('lists three tickets for our target user, one claimed, two unclaimed', async () => {
            const user = profiles.list[0];
            const response = await request(app)
                .get('/tickets')
                .set({
                    Authorization: `Bearer ${generateToken(user)}`,
                })
                .expect('Content-Type', /json/)
                .expect(200);
            const { tickets } = response.body;
            assert.equal(tickets.length, 3);
            assert(tickets.find(t => t.attendee_id === user.id));
            assert(
                tickets.find(
                    t =>
                        t.unclaimed_ticket &&
                        t.unclaimed_ticket.emailed_to === 'asdf@nope.nope',
                ),
            );
            assert(
                tickets.find(
                    t =>
                        t.unclaimed_ticket &&
                        t.unclaimed_ticket.emailed_to === null,
                ),
            );
        });
    });

    describe('remindUnclaimedTicket', () => {
        it('rejects on claimed tickets', () =>
            request(app)
                .post('/tickets/1/remind')
                .set({
                    Authorization: `Bearer ${generateToken(profiles.list[0])}`,
                })
                .expect(400));
        it('rejects on non-owner', () =>
            request(app)
                .post('/tickets/2/remind')
                .set({
                    Authorization: `Bearer ${generateToken(profiles.list[1])}`,
                })
                .expect(400));
        it('rejects on non-assigned', () =>
            request(app)
                .post('/tickets/3/remind')
                .set({
                    Authorization: `Bearer ${generateToken(profiles.list[0])}`,
                })
                .expect(400));
        it('succeeds', () =>
            request(app)
                .post('/tickets/2/remind')
                .set({
                    Authorization: `Bearer ${generateToken(profiles.list[0])}`,
                })
                .expect(200));
    });

    describe('revokeUnclaimedTicket', () => {
        it('replaces the claim token and blanks the email', async () => {
            const original = await UnclaimedTicket.find(2, true);
            await request(app)
                .post('/tickets/2/revoke')
                .set({
                    Authorization: `Bearer ${generateToken(profiles.list[0])}`,
                })
                .expect(200);
            const updated = await UnclaimedTicket.find(2, true);
            assert(updated.emailed_to === null);
            assert.notDeepEqual(updated.claim_token,original.claim_token);
        });
    });

    describe('shareUnclaimedTicket', () => {
        it('replaces the emailed_to field', () =>
            request(app)
                .post('/tickets/3/share')
                .set({
                    Authorization: `Bearer ${generateToken(profiles.list[0])}`,
                })
                .send({ email: 'test@nope.nope' })
                .expect(200)
        );
    });

    describe('claim token', () => {
        it('requires a logged-in session', () =>
            request(app)
                .post('/tickets/ticket3/claim')
                .expect(401)
        );
        it('removes the unclaimed ticket', async () => {
            let uc = await UnclaimedTicket.find(3, true);
            const user = await Profile.find(2, true);
            assert(user, 'user with id 2 exists');
            let ticket = await Ticket.query({ attendee_id: user.id });
            assert(!ticket, 'user does not already have a ticket');
            await request(app)
                .post(`/tickets/${uc.claim_token}/claim`)
                .set({
                    Authorization: `Bearer ${generateToken(user)}`,
                })
                .expect(200);
            uc = await UnclaimedTicket.find(3);
            assert.equal(uc, null);

            ticket = await Ticket.query({ attendee_id: user.id });
            assert(ticket);
        });
    });
});
