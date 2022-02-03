const db = require("../../db/database.js");
const express = require("express");
const userShowsRoute = express.Router();

/**
 * @swagger
 * definitions:
 *   userShows:
 *     properties:
 *       next_ep:
 *         type: integer
 *       user_id:
 *         type: integer
 *       show_id:
 *         type: integer
 *   userShowResponse:
 *     properties:
 *       title:
 *         type: string
 *       site:
 *         type: string
 *       air_day:
 *         type: string
 *       ending_ep:
 *         type: integer
 *       next_ep:
 *         type: integer
 *       show_id:
 *         type: integer
 */

//PARAMETERS
userShowsRoute.param("userId", async (req, res, next, userId) => {
  try {
    const userIdValue = await db.asyncQuery(
      "SELECT COUNT(1) FROM users WHERE user_id = $1",
      [userId]
    );
    if (userIdValue.rows[0].count !== "0") {
      req.userId = userId;
      next();
    } else {
      res.status(404).send("User not found.");
    }
  } catch (err) {
    res.status(500).send("An unexpected error occured");
  }
});
userShowsRoute.param("showId", async (req, res, next, showId) => {
  try {
    const showIdValue = await db.asyncQuery(
      "SELECT COUNT(1) FROM shows WHERE show_id = $1",
      [showId]
    );
    if (showIdValue.rows[0].count !== "0") {
      req.showId = showId;
      next();
    } else {
      res.status(404).send("Show not found.");
    }
  } catch (err) {
    res.status(500).send("An unexpected error occured");
  }
});

/**
 * @swagger
 * /api/user-shows:
 *   get:
 *     summary: Returns all shows on a specific users list
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of show information
 *         schema:
 *           $ref: '#/definitions/userShowResponse'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: The specified user cannot be found
 *       500:
 *         description: An unexpected error occured
 */
//GET /api/user-shows
userShowsRoute.get("/", async (req, res, next) => {
  try {
    const searchResult = await db.asyncQuery(
      `SELECT shows.title, shows.site, shows.air_day, shows.ending_ep, usershows.next_ep, shows.show_id
       FROM usershows INNER JOIN shows ON usershows.show_id = shows.show_id 
       WHERE user_id = $1 
       ORDER BY shows.title ASC`,
      [req.user.user_id]
    );
    res.send(searchResult.rows);
  } catch (err) {
    res.status(500).send("An unexpected error occured");
  }
});

/**
 * @swagger
 * /api/user-shows:
 *   post:
 *     summary: Add a specific show to a specific users list, returning the entry to usershows
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: payload
 *         description: the next episode and show_id of the show added to the list
 *         in: body
 *         required: true
 *         type: object
 *         properties:
 *           nextEp:
 *             type: integer
 *           show_id:
 *             type: integer
 *     responses:
 *       201:
 *         description: show added to list
 *         schema:
 *           $ref: '#/definitions/userShows'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: The specified user or show cannot be found
 *       500:
 *         description: An unexpexted error occured
 */
//POST /api/user-shows
userShowsRoute.post("/", async (req, res, next) => {
  try {
    const postResult = await db.asyncQuery(
      "INSERT INTO usershows (next_ep, user_id, show_id) VALUES ($1, $2, $3) RETURNING *",
      [req.body.next_ep, req.user.user_id, req.body.show_id]
    );
    res.status(201).send(postResult.rows[0]);
  } catch (err) {
    res.status(500).send("An unexpexted error occured");
  }
});

/**
 * @swagger
 * /api/user-shows:
 *   put:
 *     summary: update the next episode of a specific show in a specific users watch list
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: payload
 *         description: the next episode of the show on the list
 *         in: body
 *         required: true
 *         type: object
 *         properties:
 *           nextEp:
 *             type: integer
 *           showId:
 *             type: integer
 *     responses:
 *       200:
 *         description: An array of show information
 *         schema:
 *           $ref: '#/definitions/userShows'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: The specified user cannot be found
 *       500:
 *         description: An unexpected error occured
 */
// PUT /api/user-shows/
userShowsRoute.put("/", async (req, res, next) => {
  try {
    const putResult = await db.asyncQuery(
      "UPDATE usershows SET next_ep = $1 WHERE user_id = $2 AND show_id = $3 RETURNING *",
      [req.body.nextEp, req.user.user_id, req.body.showId]
    );
    res.status(200).send(putResult.rows[0]);
  } catch (err) {
    res.status(500).send("An unexpexted error occured");
  }
});

/**
 * @swagger
 * /api/user-shows/{userId}/{showId}:
 *   delete:
 *     summary: Delete a show from a specific users list
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: user's id number
 *         in: path
 *         required: true
 *         type: integer
 *       - name: showId
 *         description: show's id number
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       204:
 *         description: Successful removal of show from watch list
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: The specified user or show cannot be found
 *       500:
 *         description: An unexpexted error occured
 */
//DELETE /api/user-shows/:userId/:showId
userShowsRoute.delete("/:userId/:showId", async (req, res, next) => {
  try {
    await db.asyncQuery(
      "DELETE FROM usershows WHERE user_id = $1 AND show_id = $2",
      [req.userId, req.showId]
    );
    res.status(204).send("Item Removed");
  } catch (err) {
    res.status(500).send("An unexpexted error occured");
  }
});

module.exports = userShowsRoute;
