const express = require("express");
const passport = require("passport");
const loginRoute = express.Router();

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: perform a login attempt
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: user object
 *         in: body
 *         required: true
 *         type: object
 *         properties:
 *           email:
 *             type: string
 *           password:
 *             type: string
 *     responses:
 *       200:
 *         description: login success
 *       403:
 *         description: User Should not be logged in
 */
loginRoute.post("/", passport.authenticate("local"), (req, res, next) => {
  res.send("User Logged In");
});

module.exports = loginRoute;
