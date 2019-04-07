import { ClientError, withErrorHandling } from '../error-handling';

const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_KEY);
const { promisify } = require('util');
const { zip } = require('lodash/zip');
const studentDiscountCodes = process.env.STUDENT_DISCOUNT_CODES.split(',');
const { send } = require('../utilities/email');
const passport = require('passport');
const { createTickets, sendInvitationEmail } = require('../controllers/ticket');

const stripeCreateOrder = promisify(stripe.orders.create.bind(stripe.orders));
const stripePayOrder = promisify(stripe.orders.pay.bind(stripe.orders));

const closeOfEarlyPricing = new Date(2019, 5, 1);

async function purchaseTicket({
    sku,
    source,
    discount_code,
    receipt_email,
    quantity,
}) {
    if (sku === 'skuStudent' && !studentDiscountCodes.includes(discount_code)) {
        throw new ClientError('Invalid discount code');
    }
    if (sku === 'skuEarly' && new Date() > closeOfEarlyPricing) {
        throw new ClientError('Too late for early pricing');
    }
    const orderParams = {
        currency: 'usd',
        items: Array.from({ length: quantity }).map(() => ({
            type: 'sku',
            parent: sku,
        })),
        email: receipt_email,
    };
    const order = await stripeCreateOrder(orderParams);
    try {
        return await stripePayOrder(order.id, { source });
    } catch (err) {
        if (err.type === 'StripeCardError') {
            throw new ClientError(err.message);
        }
        throw err;
    }
}

function validateQuantityAgainstInvitees({ quantity, invitees }) {
    if (quantity < invitees.length) {
        throw new ClientError(
            `Cannot purchase ${quantity} tickets for ${
                invitees.length
            } invitees`,
        );
    }
}

export default app => {
    router.use(passport.authenticate('jwt', { session: false }));

    router.post('/', async (request, response, next) => {
        withErrorHandling(response, async () => {
            const {
                sku,
                discount_code,
                token,
                email,
                quantity,
                invitees,
            } = request.body;
            validateQuantityAgainstInvitees({ quantity, invitees });
            const order = await purchaseTicket({
                sku,
                discount_code,
                source: token,
                receipt_email: email,
                quantity,
            });
            const ticketItem = order.items.find(item => item.type === 'sku');
            const singleTicketAmountCents =
                ticketItem.amount / ticketItem.quantity;
            const { unclaimedTickets } = await createTickets({
                purchaser: request.user,
                amountCents: singleTicketAmountCents,
                discount_code,
                invitees,
                quantity,
                sku,
            });
            await Promise.all(
                unclaimedTickets
                    .filter(t => t.emailed_to)
                    .map(t => sendInvitationEmail(request.user, t)),
            );
            await sendConfirmationEmail(email, unclaimedTickets);
            response.json({ data: order });
        });
    });

    return router;
};

function sendConfirmationEmail(email, unclaimedTickets) {
    const content = `
## Success!

Hi-five! You've purchased your ticket to DVLP DNVR. We will see you on Aug 15th and 16th. Before then make sure to come back to the site and log in. We'll email you when Call for Proposals start. After all call to proposals are in, all ticket holders will have time to submit their votes. These votes determine our schedule for the year.

We'll keep you up to date. Thank you for contributing to the Denver tech community! It's going to be awesome.
    `;
    return send(email, "You're Going to DVLP DNVR!", content);
}
