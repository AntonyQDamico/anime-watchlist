const express = require("express");
const apiRouter = express.Router();
const registerRouter = require("./register/registerRoute.js");
const loginRouter = require("./login/loginRoute.js");
const showsRouter = require("./shows/showsRoute.js");
const userShowsRouter = require("./userShows/userShowsRoute.js");
const watchQueueRouter = require("./watchQueue/watchQueueRoute.js");

apiRouter.use("/register", registerRouter);
apiRouter.use("/login", loginRouter);
apiRouter.use("/shows", showsRouter);
apiRouter.use("/user-shows", userShowsRouter);
apiRouter.use("/watch-queue", watchQueueRouter);

module.exports = apiRouter;
