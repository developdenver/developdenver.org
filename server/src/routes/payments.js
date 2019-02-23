const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_KEY);
const { promisify } = require('util');
const studentDiscountCodes = process.env.STUDENT_DISCOUNT_CODES.split(',');
const { send } = require('../utilities/email');
const passport = require('passport');
const Ticket = require('../models/ticket');

const stripeCreateOrder = promisify(stripe.orders.create.bind(stripe.orders));
const stripePayOrder = promisify(stripe.orders.pay.bind(stripe.orders));

const closeOfEarlyPricing = new Date(2019, 5, 1);

async function purchaseTicket({ sku, source, discount_code, receipt_email }) {
    if (sku === 'skuStudent' && !studentDiscountCodes.includes(discount_code)) {
        throw new Error('Invalid discount code');
    }
    if (sku === 'skuEarly' && Date.now() > closeOfEarlyPricing) {
        throw new Error('Too late for early pricing');
    }
    const order = await stripeCreateOrder({
        currency: 'usd',
        items: [{ type: 'sku', parent: sku }],
        email: receipt_email,
    });
    const orderAgain = await stripePayOrder(order.id, { source });
    return orderAgain;
}

module.exports = app => {
    router.use(passport.authenticate('jwt', { session: false }));

    router.post('/', async (request, response, next) => {
        const { sku, discount_code, token, email } = request.body;
        try {
            const order = await purchaseTicket({
                sku,
                discount_code,
                source: token,
                receipt_email: email,
            });
            await Ticket.add({
                purchaser_id: request.user.id,
                sku,
                discount_code,
                price_paid_cents: order.amount,
                event_date: Ticket.nextEventDate,
            });
            await sendConfirmationEmail(email);
            response.json({ data: order });
        } catch (err) {
            response.status(400).json({ error: err.message });
        }
    });

    return router;
};

function sendConfirmationEmail(email) {
    const content = `
## Success!

Hi-five! You've purchased your ticket to DVLP DNVR. We will see you on October 18th and 19th. Before then make sure to come back to the site and log in. We'll email you when Call for Proposals start. After all call to proposals are in, all ticket holders will have time to submit their votes. These votes determine our schedule for the year.

We'll keep you up to date. Thank you for contributing to the Denver tech community! It's going to be awesome.
    `;
    return send(email, "You're Going to DVLP DNVR!", content);
}
