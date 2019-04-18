const Ticket = require('../../src/models/ticket');

module.exports = {
    list: [
        {
            id: 1,
            purchaser_id: 1,
            attendee_id: 1,
            date_purchased: (new Date()),
            sku: 'skuRegular',
            discount_code: null,
            price_paid_cents: 15000,
            event_date: Ticket.nextEventDate,
        },
        {
            id: 2,
            purchaser_id: 1,
            attendee_id: null,
            date_purchased: (new Date()),
            sku: 'skuRegular',
            discount_code: null,
            price_paid_cents: 15000,
            event_date: Ticket.nextEventDate,
        },
        {
            id: 3,
            purchaser_id: 1,
            attendee_id: null,
            date_purchased: (new Date()),
            sku: 'skuRegular',
            discount_code: null,
            price_paid_cents: 15000,
            event_date: Ticket.nextEventDate,
        },
    ],
    unclaimed: [
        { ticket_id: 2, claim_token: 'ticket2', emailed_to: 'asdf@nope.nope' },
        { ticket_id: 3, claim_token: 'ticket3', emailed_to: null },
    ],
}