const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Admin = require("./model/admin");
const User = require("./model/user");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

const config = require('./config.js');

const cookieExtractor = req => {
    let token = null;
    if(req && req.cookies){
        token = req.cookies["access_token"]
    }
}

passport.use(new JwtStrategy({
   jwtFromRequest: cookieExtractor,
   secretOrKey: "NoobCoder" 
},(payload,done)=>{
    User.findById({_id : payload.sub},(err,user)=>{
        if(err){
            return done(err, false);
        }
        if(user)
            return done(null,user);
    });
}));

passport.use(new LocalStrategy((username,password,done)=>{
    User.findOne({username},(err,user)=>{
        //something went wrong
        if(err)
            return done(err);
        // if no user exists
        if(!user)
            return done(null,false);
        user.comparePassword(password,done);
    })
}));

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, Admin.authenticate()));
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

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
        Admin.findOne({ _id: jwt_payload._id }, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    })
);

exports.verifyUser = passport.authenticate('jwt', { session: false });