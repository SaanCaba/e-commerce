"use strict";
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const co_passport = require("passport");
co_passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    scope: ["profile", "email"],
}, function (accessToken, refreshToken, profile, callback) {
    callback(null, profile);
}));
co_passport.serializeUser((user, done) => {
    done(null, user);
});
co_passport.deserializeUser((user, done) => {
    done(null, user);
});
