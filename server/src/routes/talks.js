const express = require("express");
const router = express.Router();

const {
  create, read, update, destroy, list, 
} = require("../controllers/talk");

module.exports = (app) => {
  router.get("/talks", list);
  router.get("/talks/:id", read);
  router.post("/talks", create);
  router.put("/talks/:id", update);
  router.delete("/talks/:id", destroy);

  return router;
};
