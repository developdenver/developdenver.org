const express = require("express");
const passport = require("passport");
const router = express.Router();
const VoteController = require("../controllers/vote");

const {
  create, read, update, destroy, list, 
} = require("../controllers/talk");

function isTicketHolder(request, response, next) {
  if (request.user && request.user.ticket_level !== null) {
    next();
  } else {
    const error = new Error("You must have a ticket to vote.");
    error.status = 401;
    next(error);
  }
}

module.exports = (app) => {
  router.get("/", list);
  router.get("/:title", read);
  router.use(passport.authenticate("jwt", { session: false }));
  router.post("/:id/vote", isTicketHolder, VoteController.vote);
  router.post("/:id/unvote", isTicketHolder, VoteController.unvote);
  router.post("/", create);
  router.put("/:id", update);
  router.delete("/:id", destroy);

  return router;
};
