const express = require("express");
const router = express.Router();
const passport = require("passport");

const { generateToken } = require("../utilities/auth");

module.exports = (app) => {
    router.post("/login",
        passport.authenticate("local", { session: false }),
        async (request, response, next) => {
            response.send({
                user: request.user,
                jwt: generateToken(request.user),
            });
        },
    );

    return router;
};
