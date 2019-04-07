const Model = require('./model');

const claimTokenAlphabet =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

class UnclaimedTicket extends Model {
    constructor() {
        super('unclaimed_ticket');
        this.publicProperties = ['ticket_id', 'emailed_to'];
        this.primary_key = 'ticket_id';
    }

    mkClaimToken() {
        return Array.from({ length: 10 })
            .map(() =>
                claimTokenAlphabet.charAt(
                    Math.floor(claimTokenAlphabet.length * Math.random()),
                ),
            )
            .join('');
    }
}

module.exports = new UnclaimedTicket();
