const express = require("express");
const loginRoute = express.Router();

loginRoute.get("/", (req, res, next) => {
  res.send("this is a thing");
});

module.exports = loginRoute;
