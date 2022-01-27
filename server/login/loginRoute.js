const express = require("express");
const passport = require("passport");
const loginRoute = express.Router();

loginRoute.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res, next) => {
    res.send("User Logged In");
  }
);

module.exports = loginRoute;
