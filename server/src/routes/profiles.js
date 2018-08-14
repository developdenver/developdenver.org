const express = require("express");
const router = express.Router();

const {
    create, read, update, destroy, list
} = require("../controllers/profile");

module.exports = (app) => {
    router.get("/", list);
    router.get("/:id", read);
    router.post("/", create);
    router.put("/:id", update);
    router.delete("/:id", destroy);

    return router;
};
