const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const studentDiscountCodes = process.env.STUDENT_DISCOUNT_CODES.split(",");

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
            stripe.charges.create(options, (error, charge) => {
                error
                    ? response.status(400).json({error: error.message})
                    : response.json({data: charge});
            });
        } catch (error){
            next(error);
        }
    });

    return router;
};
