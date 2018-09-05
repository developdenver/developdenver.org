const express = require("express");
const router = express.Router();
const VoteController = require("../controllers/vote");

const {
    list,
} = require("../controllers/vote");

module.exports = (app) => {
    router.get("/", VoteController.getVotes);
    return router;
};