const db = require("../../db/database.js");
const express = require("express");
const watchQueueRoute = express.Router();

/**
 * @swagger
 * definitions:
 *   watchQueue:
 *     properties:
 *       queue_ep:
 *         type: integer
 *       user_id:
 *         type: integer
 *       show_id:
 *         type: integer
 */

//PARAMETERS
watchQueueRoute.param("userId", async (req, res, next, userId) => {
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
watchQueueRoute.param("showId", async (req, res, next, showId) => {
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
 * /api/watch-queue/{userId}/{showId}:
 *   get:
 *     summary: Returns all watch-queue items for a specific show on a specific users list
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
 *       200:
 *         description: An array of queue episodes
 *         schema:
 *           type: array
 *           example: [1, 2, 3]
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: The specified user or show cannot be found
 *       500:
 *         description: An unexpected error occured
 */
//GET /api/watch-queue/:userId/:showId
watchQueueRoute.get("/:userId/:showId", async (req, res, next) => {
  try {
    let returnArray = [];
    const searchResult = await db.asyncQuery(
      "SELECT queue_ep FROM watchqueue WHERE user_id = $1 AND show_id = $2 ORDER BY queue_ep ASC",
      [req.userId, req.showId]
    );
    if (searchResult.rows.length > 0) {
      returnArray = searchResult.rows.map((item) => item.queue_ep);
    }
    res.send(returnArray);
  } catch (err) {
    res.status(500).send("An unexpected error occured");
  }
});

/**
 * @swagger
 * /api/watch-queue/{userId}/{showId}:
 *   post:
 *     summary: Add a watch-queue item for a specific show on a specific users list, returns the watch-queue item added
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
 *       - name: queueEp
 *         description: episode to add to watch-queue
 *         in: body
 *         required: true
 *         type: object
 *         properties:
 *           queueEp: integer
 *     responses:
 *       201:
 *         description: watch-queue item added
 *         schema:
 *           $ref: '#/definitions/watchQueue'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: The specified user or show cannot be found
 *       500:
 *         description: An unexpexted error occured
 */
//POST /api/watch-queue/:userId/:showId
watchQueueRoute.post("/:userId/:showId", async (req, res, next) => {
  try {
    const postResult = await db.asyncQuery(
      "INSERT INTO watchqueue (queue_ep, user_id, show_id) VALUES ($1, $2, $3) RETURNING *",
      [req.body.queueEp, req.userId, req.showId]
    );
    res.status(201).send(postResult.rows[0]);
  } catch (err) {
    res.status(500).send("An unexpexted error occured");
  }
});

/**
 * @swagger
 * /api/watch-queue/{userId}/{showId}:
 *   delete:
 *     summary: Delete a watch-queue item from a specific show on a specific users list
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
 *       - name: queueEp
 *         description: episode to remove from watch-queue
 *         in: body
 *         required: true
 *         type: object
 *         properties:
 *           queueEp: integer
 *     responses:
 *       204:
 *         description: Successful removal of watch-queue item
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: The specified user or show cannot be found
 *       500:
 *         description: An unexpexted error occured
 */
//DELETE /api/watch-queue/:userId/:showId
watchQueueRoute.delete("/:userId/:showId", async (req, res, next) => {
  try {
    await db.asyncQuery(
      "DELETE FROM watchqueue WHERE queue_ep = $1 AND user_id = $2 AND show_id = $3",
      [req.body.queueEp, req.userId, req.showId]
    );
    res.status(204).send("Item Removed");
  } catch (err) {
    res.status(500).send("An unexpexted error occured");
  }
});

module.exports = watchQueueRoute;
