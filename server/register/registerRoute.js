const express = require("express");
const registerRoute = express.Router();

registerRoute.get("/", (req, res, next) => {
  res.send("this is a thing");
});

module.exports = registerRoute;
