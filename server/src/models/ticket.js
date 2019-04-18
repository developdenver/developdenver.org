const Model = require('./model');

const nextEventDate = '2018-08';

class Ticket extends Model {
    constructor() {
        super('ticket');
        this.publicProperties = [
            'id',
            'purchaser_id',
            'attendee_id',
            'date_purchased',
            'sku',
            'discount_code',
            'price_paid_cents',
            'event_date',
        ];
    }

    async holdsCurrentTicket(user_id) {
        return !!(await this.query({
            attendee_id: user_id,
            event_date: '2018-08',
        }));
    }

    get nextEventDate() {
        return nextEventDate;
    }
}

module.exports = new Ticket();
