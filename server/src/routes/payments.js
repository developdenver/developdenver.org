const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const studentDiscountCodes = process.env.STUDENT_DISCOUNT_CODES.split(",");
const { send } = require("../utilities/email");

function getPrice(level, discountCode){
    const levels = {
        "early-bird": 135 * 100,
        "regular": 235 * 100,
        "employer": 375 * 100,
        "premium": 500 * 100,
        "student": 90 * 100
    };

    let price;
    if (level === "student" && studentDiscountCodes.includes(discountCode)){
        price = levels["student"];
    } else if (level === "student"){
        throw new Error("Invalid discount code");
    } else {
        price = levels[level];
    }
    return price;
}

module.exports = (app) => {
    router.post("/", (request, response, next) => {
        let options;
        try {
            options = {
                description: request.body.description,
                amount: getPrice(request.body.level, request.body.discount_code),
                currency: "usd",
                source: request.body.token,
            };
            stripe.charges.create(options, async (error, charge) => {
                if (error){
                    response.status(400).json({error: error.message});
                } else {
                    await sendConfirmationEmail(request.body.email);
                    response.json({data: charge});
                }
            });
        } catch (error){
            next(error);
        }
    });

    return router;
};

function sendConfirmationEmail(email){
    const content = `
## Success!

Hi-five! You've purchased your ticket to DVLP DNVR. We will see you on October 18th and 19th. Before then make sure to come back to the site and log in. We'll email you when Call for Proposals start. After all call to proposals are in, all ticket holders will have time to submit their votes. These votes determine our schedule for the year.

We'll keep you up to date. Thank you for contributing to the Denver tech community! It's going to be awesome.
    `;
    return send(
        email,
        "You're Going to DVLP DNVR!",
        content,
    )
}
