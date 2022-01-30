const express = require("express");
const apiRouter = express.Router();
const registerRouter = require("./register/registerRoute.js");
const loginRouter = require("./login/loginRoute.js");
const logoutRouter = require("./logout/logoutRoute.js");
const showsRouter = require("./shows/showsRoute.js");
const userShowsRouter = require("./userShows/userShowsRoute.js");
const watchQueueRouter = require("./watchQueue/watchQueueRoute.js");

apiRouter.use("/register", checkNotAuthenticated, registerRouter);
apiRouter.use("/login", checkNotAuthenticated, loginRouter);
apiRouter.use("/logout", checkAuthenticated, logoutRouter);
apiRouter.use("/shows", checkAuthenticated, showsRouter);
apiRouter.use("/user-shows", checkAuthenticated, userShowsRouter);
apiRouter.use("/watch-queue", checkAuthenticated, watchQueueRouter);
apiRouter.get("/auth-check", authCheck);

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).send("User not Authenticated");
  }
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    res.status(403).send("User should not be logged in");
  } else {
    return next();
  }
}

function authCheck(req, res, next) {
  res.send(req.isAuthenticated());
}

module.exports = apiRouter;
