const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID:
          "561561007990-dl70plvj0ftkc0s67k7otcpqbb1l2b6f.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:3000/auth/google/callback",
      },
      async function (accessToken, refreshToken, profile, done) {
        console.log(profile)
        try {
          let user = await User.findOne({ id: profile.id })
          if (user) {
          done(null, user);
          } else {
            const newUser = new User({
              id: profile.id,
              name: profile.displayName,
              avatar: profile.photos[0].value,
            });
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    )
  );
  passport.serializeUser(function (user,done) {
    done(null, user.id);
  });
  passport.deserializeUser(function (id,done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
