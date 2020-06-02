const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Admin = require("./model/admin");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const User = require("./model/user");
const config = require('./config.js');

passport.use("admin",new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, Admin.authenticate()));
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

passport.use("user",new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function (admin) {
    return jwt.sign(admin, config.secretKey,
        { expiresIn: 3600 });
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        Admin.findOne({ _id: jwt_payload._id }, (err, admin) => {
            if (err) {
                return done(err, false);
            }
            else if (admin) {
                return done(null, admin);
            }
            else {
                return done(null, false);
            }
        });
    })
);

exports.verifyAdmin = passport.authenticate('jwt', { session: false });