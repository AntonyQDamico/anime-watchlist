const bcrypt = require("bcrypt");
const db = require("../../db/database.js");
const express = require("express");
const registerRoute = express.Router();

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Create a new user for the system, store a hashed and salted password
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: user's email address and password
 *         in: body
 *         required: true
 *         type: object
 *         properties:
 *           email:
 *             type: string
 *           password:
 *             type: string
 *     responses:
 *       201:
 *         description: User added
 *       400:
 *         description: User already exists
 *       403:
 *         description: User should not be logged in
 *       500:
 *         description: An unexpexted error occured
 */
registerRoute.post("/", async (req, res, next) => {
  try {
    const userExist = await db.asyncQuery(
      "SELECT COUNT(1) FROM users WHERE email = $1",
      [req.body.email]
    );
    if (userExist.rows[0].count !== "0") {
      res.status(400).send("email already exists");
    }
    const hashPass = await bcrypt.hash(req.body.password, 10);
    await db.asyncQuery("INSERT INTO users (email, password) VALUES ($1, $2)", [
      req.body.email,
      hashPass,
    ]);
    res.status(201).send("User Registered");
  } catch (err) {
    res.status(500).send("An unexpexted error occured");
  }
});

module.exports = registerRoute;
