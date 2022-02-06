require("dotenv").config({ path: __dirname + "/./../.env" });
const express = require("express");
const path = require("path");
const app = express();
module.exports = app;

const PORT = process.env.PORT || 3001;
const servers =
  process.env.NODE_ENV === "production"
    ? "https://derailed-anime.herokuapp.com/"
    : `https://localhost:${PORT}`;
const origin =
  process.env.NODE_ENV === "production"
    ? "https://derailed-anime.herokuapp.com/"
    : "http://localhost:3000";
//Procution Check
if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "../build")));
}

//Setup for Swagger and swagger-docs
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
      servers: [servers],
    },
  },
  apis: ["./*/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Add middware for parsing request bodies here.
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add middleware for handling CORS requests from index.html.
var cors = require("cors");
app.use(
  cors({
    origin: origin, // <-- location of react app we are conneting to
    credentials: true,
  })
);

// Add session middleware
const expressSession = require("express-session");
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

// Add cookie-parser
const cookieParser = require("cookie-parser");
app.use(cookieParser(process.env.SESSION_SECRET));

// Add authentication middleware
const passport = require("passport");
const initializePassport = require("./passport-config.js");
app.use(passport.initialize());
app.use(passport.session());
initializePassport(passport);

// Mount the apiRouter below at the '/api' path.
const apiRouter = require("./api.js");
app.use("/api", apiRouter);

// To start the server listening at PORT below:
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
