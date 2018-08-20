const express = require("express");
const router = express.Router();

const {
    create, read, update, destroy, list, isEmailUnique,
} = require("../controllers/profile");

module.exports = (app) => {
    router.get("/", list);
    router.post("/email", isEmailUnique);
    router.get("/:id", read);
    router.post("/", create);
    router.put("/:id", update);
    router.delete("/:id", destroy);

    return router;
};
