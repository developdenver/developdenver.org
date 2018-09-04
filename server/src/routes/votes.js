const express = require("express");
const router = express.Router();

const {
    list,
} = require("../controllers/vote");

module.exports = (app) => {
    router.get("/", list);
    return router;
};