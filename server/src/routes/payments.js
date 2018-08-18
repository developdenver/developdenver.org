const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const levels = {
    "early-bird": 135 * 100,
    "regular": 235 * 100,
    "employer": 375 * 100,
    "premium": 500 * 100,
};

module.exports = (app) => {
    router.post("/", (request, response, next) => {
        const options = {
            description: request.body.description,
            amount: levels[request.body.level],
            currency: "usd",
            source: request.body.token,
        };
        stripe.charges.create(options, (error, charge) => {
            error
                ? response.status(400).json({error: error.message})
                : response.json({data: charge});
        });
    });

    return router;
};

