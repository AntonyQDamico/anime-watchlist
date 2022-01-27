const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const db = require("../db/database,js");

function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    try {
      let user = null;
      const userSearch = await db.asyncQuery(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
      if (userSearch.rows.length > 0) {
        user = userSearch.rows[0];
      }
      if (user == null) {
        return done(null, false, { message: "Incorrect email or password" });
      }

      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect email or password" });
      }
    } catch (err) {
      done(err);
    }
  };
  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((user, done) => {
    done(null, user.user_id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const userSearch = await db.asyncQuery(
        "SELECT * FROM users WHERE user_id = $1",
        [id]
      );
      done(null, userSearch.rows[0]);
    } catch (err) {
      done(err);
    }
  });
}
module.exports = initialize;
