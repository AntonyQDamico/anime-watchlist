const express = require("express");
const watchQueueRoute = express.Router();

watchQueueRoute.get("/", (req, res, next) => {
  res.send("this is a thing");
});

module.exports = watchQueueRoute;
