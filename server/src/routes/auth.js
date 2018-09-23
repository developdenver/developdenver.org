const express = require("express");
const router = express.Router();
const passport = require("passport");

const { generateToken, hashPassword } = require("../utilities/auth");
const { send } = require("../utilities/email");
const Profile = require("../models/profile");

module.exports = (app) => {
    router.post("/login",
        passport.authenticate("local", { session: false }),
        async (request, response, next) => {
            const profile = await Profile.find(request.user.id, false);
            response.status(201).send({
                user: profile,
                jwt: generateToken(request.user),
            });
        },
    );

    router.post("/reset-request", async (request, response, next) => {
        const email = request.body.email.toLowerCase();
        const profile = await Profile.query({email}, true);
        const token = await generateToken(profile, 1000 * 60 * 60); // One hour
        const resetUrl = `${process.env.PASSWORD_RESET_CALLBACK}?token=${token}`;
        const content = `
We received a request to reset the password for your account on developdenver.org. If you didn't make this request, ignore this message.

Otherwise, [reset your password here](${resetUrl})!
        `;
        send(
            request.body.email,
            "Password reset request for Develop Denver",
            content,
        ).then(() => {
            response.status(201).send();
        }).catch(error => next(error));
    });

    router.post("/reset-password",
        passport.authenticate("jwt", { session: false }),
        async (request, response, next) => {
            const { hashedPassword, secretKey } = await hashPassword(request.body.password);
            delete request.body.password;
            const profile = await Profile.update(request.user.id, {
                secret_key: secretKey,
                hashed_password: hashedPassword,
            }).catch(error => next(error));
            response.status(201).send();
        },
    );

    return router;
};
