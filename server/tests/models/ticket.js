const testDatabase = require('../../src/database-connection');
const profiles = require('../fixtures/profiles');
const Ticket = require('../models/ticket');
const assert = require('assert');

describe('ticket model', () => {
    beforeEach(async () => {
        await testDatabase('ticket').del();
        await testDatabase('profile').del();
        await testDatabase('profile').insert(profiles.list);
        await testDatabase.raw('ALTER SEQUENCE profile_id_seq RESTART WITH 3');
    });
    it('is happy when the ticket is current', async () => {
        const userId = 1,
        await Ticket.add({
            purchaser_id: userId,
            date_purchased: '2019-02-22',
            level: 'regular',
            event_date: Ticket.nextEventDate,
        });
        const result = await Ticket.holdsCurrentTicket(userId);
        assert.ok(result);

    });

    it('complains when no ticket is found', async () => {
        const result = await Ticket.holdsCurrentTicket(5);
        assert.equal(result, false);

    });
    it('complains when only tickets are out of date', async () => {
        const userId = 2;
        await Ticket.add({
            purchaser_id: userId,
            date_purchased: '2017-02-22',
            level: 'regular',
            event_date: '2017-09',
        });
        const result = await Ticket.holdsCurrentTicket(userId);
        assert.equal(result, false);
    });

    it('is happy when both an outdated ticket and a current one exist', () => {
        const userId = 3;
        await Ticket.add({
            purchaser_id: userId,
            date_purchased: '2017-02-22',
            level: 'regular',
            event_date: '2017-09',
        });
        await Ticket.add({
            purchaser_id: userId,
            date_purchased: '2017-02-22',
            level: 'regular',
            event_date: Ticket.nextEventDate,
        });

        const result = await Ticket.holdsCurrentTicket(userId);
        assert.ok(result);
    });
});
