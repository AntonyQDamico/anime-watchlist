const express = require("express");
const userShowsRoute = express.Router();

userShowsRoute.get("/", (req, res, next) => {
  res.send("this is a thing");
});

module.exports = userShowsRoute;
