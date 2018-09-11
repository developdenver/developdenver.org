const express = require("express");
const passport = require("passport");
const router = express.Router();
const VoteController = require("../controllers/vote");

const {
    list,
} = require("../controllers/vote");

module.exports = (app) => {
    router.use(passport.authenticate("jwt", { session: false }));
    router.get("/", VoteController.getVotes);
    return router;
};