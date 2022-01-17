const express = require("express");
const showsRoute = express.Router();

showsRoute.get("/", (req, res, next) => {
  res.send("this is a thing");
});

module.exports = showsRoute;
