const express = require("express");
const passport = require("passport");
const router = express.Router();
const EventController = require("../controllers/event");

const {
    read, list, 
} = require("../controllers/event");

module.exports = (app) => {
    router.get("/", list);
    router.get("/:id", read);

    return router;
};
