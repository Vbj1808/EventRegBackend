//require passport package
const passport = require('passport');
//require passport local strategy 
const LocalStrategy = require('passport-local').Strategy;
//require admin model
const Admin = require("./model/admin");
//require jwt strategy
const JwtStrategy = require('passport-jwt').Strategy;
//require extract jwt
const ExtractJwt = require('passport-jwt').ExtractJwt;
// used to create, sign, and verify tokens
const jwt = require('jsonwebtoken'); 
//require user model
const User = require("./model/user");
//require config file
const config = require('./config.js');


//using passport to authenticate admin login
passport.use("admin",new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, Admin.authenticate()));
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

//using passport to authenticate user login
passport.use("user",new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//using jwt to authenticate
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

//export
exports.verifyAdmin = passport.authenticate('jwt', { session: false });
