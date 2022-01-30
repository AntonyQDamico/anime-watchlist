const express = require("express");
const logoutRoute = express.Router();

/**
 * @swagger
 * /api/logout:
 *   post:
 *     summary: perform a logout attempt
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: logout success
 *       401:
 *         description: Unauthorized
 */
logoutRoute.post("/", (req, res, next) => {
  req.logOut();
  res.send("user logged out");
});

module.exports = logoutRoute;
