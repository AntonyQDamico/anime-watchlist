const db = require("../../db/database.js");
const express = require("express");
const showsRoute = express.Router();

/**
 * @swagger
 * definitions:
 *   shows:
 *     properties:
 *       show_id:
 *         type: integer
 *       title:
 *         type: string
 *       air_day:
 *         type: string
 *       site:
 *         type: string
 *       start_ep:
 *         type: integer
 *       ending_ep:
 *         type: integer
 */

//PARAMETERS
showsRoute.param("showId", async (req, res, next, showId) => {
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
 * /api/shows/{showId}:
 *   get:
 *     summary: Returns all the information of a specific show based on showId
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: showId
 *         description: shows's id number
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: An object of show information
 *         schema:
 *           $ref: '#/definitions/shows'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: The specified show cannot be found
 *       500:
 *         description: An unexpected error occured
 */
//GET /api/user-shows/:userId
showsRoute.get("/:showId", async (req, res, next) => {
  try {
    const searchResult = await db.asyncQuery(
      "SELECT * FROM shows WHERE show_id = $1",
      [req.showId]
    );
    res.send(searchResult.rows);
  } catch (err) {
    res.status(500).send("An unexpected error occured");
  }
});

/**
 * @swagger
 * /api/shows:
 *   post:
 *     summary: Add a show to the show database
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: showItem
 *         description: show object
 *         in: body
 *         required: true
 *         type: object
 *         properties:
 *           title:
 *             type: string
 *           air_day:
 *             type: string
 *           site:
 *             type: string
 *           start_ep:
 *             type: integer
 *           ending_ep:
 *             type: integer
 *     responses:
 *       201:
 *         description: show added to list
 *         schema:
 *           $ref: '#/definitions/shows'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: An unexpexted error occured
 */
//POST /api/shows/
showsRoute.post("/", async (req, res, next) => {
  try {
    const postResult = await db.asyncQuery(
      "INSERT INTO shows (title, air_day, site, start_ep, ending_ep) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [
        req.body.title,
        req.body.air_date,
        req.body.site,
        req.body.start_ep,
        req.body.ending_ep,
      ]
    );
    res.status(201).send(postResult.rows[0]);
  } catch (err) {
    res.status(500).send("An unexpected error occured");
  }
});

/**
 * @swagger
 * /api/shows/{showId}:
 *   put:
 *     summary: update the information of show
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: showId
 *         description: shows's id number
 *         in: path
 *         required: true
 *         type: integer
 *       - name: showItem
 *         description: show object
 *         in: body
 *         required: true
 *         type: object
 *         properties:
 *           title:
 *             type: string
 *           air_day:
 *             type: string
 *           site:
 *             type: string
 *           start_ep:
 *             type: integer
 *           ending_ep:
 *             type: integer
 *     responses:
 *       200:
 *         description: Show information updated
 *         schema:
 *           $ref: '#/definitions/shows'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: The specified show cannot be found
 *       500:
 *         description: An unexpected error occured
 */
//PUT /api/shows/:showId
showsRoute.put("/:showId", async (req, res, next) => {
  try {
    const putResult = await db.asyncQuery(
      `UPDATE shows 
      SET title = $1,
      air_day = $2,
      site = $3,
      start_ep = $4,
      ending_ep = $5
      WHERE show_id = $6 RETURNING *`,
      [
        req.body.title,
        req.body.air_day,
        req.body.site,
        req.body.start_ep,
        req.body.ending_ep,
        req.showId,
      ]
    );
    res.status(200).send(putResult.rows[0]);
  } catch (err) {
    res.status(500).send("An unexpexted error occured");
  }
});

/**
 * @swagger
 * /api/shows/{showId}:
 *   delete:
 *     summary: Delete a show from the database
 *     produces:
 *       - application/json
 *     parameters:
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
//DELETE /api/shows/:showId
showsRoute.delete("/:showId", async (req, res, next) => {
  try {
    await db.asyncQuery("DELETE FROM shows WHERE show_id = $1", [req.showId]);
    res.status(204).send("Item Removed");
  } catch (err) {
    res.status(500).send("An unexpexted error occured");
  }
});

module.exports = showsRoute;
