var passport = require("passport"),
  FacebookStrategy = require("passport-facebook").Strategy;
const config = require("config");

passport.use(
  new FacebookStrategy(
    {
      clientID: config.get("facebookAppId"),
      clientSecret: config.get("facebookSecretId"),
      callbackURL: config.get("facebookCallbackSuccess"),
      profileFields: [
        "id",
        "displayName",
        "email",
        "first_name",
        "middle_name",
        "last_name",
      ],
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      done(null, profile);
    }
  )
);
