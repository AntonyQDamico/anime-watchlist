const express = require("express");
const app = express();
module.exports = app;

const PORT = 3001;

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Anime Watch List",
      description: "Keep Track of watch lists including watch queues",
      contact: {
        name: "Antony Damico",
        email: "AntonyQDamico@gmail.com",
      },
      servers: [`https://localhost:${PORT}`],
    },
  },
  apis: ["./*/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Add middleware for handling CORS requests from index.html.
var cors = require("cors");
app.use(cors());

// Add middware for parsing request bodies here.
var bodyParser = require("body-parser");
app.use(bodyParser.json());

// Add authentication middleware
// var passport = require("passport");
// app.use(passport.initialize());
// app.use(passport.session());

// Mount the apiRouter below at the '/api' path.
const apiRouter = require("./api.js");
app.use("/api", apiRouter);

// To start the server listening at PORT below:
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
