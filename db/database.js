require("dotenv").config({ path: __dirname + "/./../.env" });
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = {
  asyncQuery: (text, params) => pool.query(text, params),
};
