const db = require("../../db/database.js");
const bcrypt = require("bcrypt");
const express = require("express");
const usersRoute = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Returns the email of a specific user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Users email
 *         properties:
 *           email:
 *             type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: An unexpected error occured
 */
//GET /api/users
usersRoute.get("/", async (req, res, next) => {
  res.send(req.user.email);
});

/**
 * @swagger
 * /api/users:
 *   put:
 *     summary: update the password of a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: password
 *         description: users new password
 *         in: body
 *         required: true
 *         type: object
 *         properties:
 *           password:
 *             type: string
 *     responses:
 *       200:
 *         description: Password Updated
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: An unexpected error occured
 */
//PUT /api/users
usersRoute.put("/", async (req, res, next) => {
  try {
    const hashPass = await bcrypt.hash(req.body.password, 10);
    await db.asyncQuery(
      `UPDATE users 
        SET password = $1
        WHERE user_id = $2`,
      [hashPass, req.user.user_id]
    );
    res.status(200).send("Password Updated");
  } catch (err) {
    res.status(500).send("An unexpexted error occured");
  }
});

/**
 * @swagger
 * /api/users:
 *   delete:
 *     summary: Delete a user from the database
 *     produces:
 *       - application/json
 *     responses:
 *       204:
 *         description: Successful removal of user account
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: An unexpexted error occured
 */
//DELETE /api/users
usersRoute.delete("/", async (req, res, next) => {
  try {
    await db.asyncQuery("DELETE FROM users WHERE user_id = $1", [
      req.user.user_id,
    ]);
    req.logOut();
    res.status(204).send("Item Removed");
  } catch (err) {
    res.status(500).send("An unexpexted error occured");
  }
});

module.exports = usersRoute;
