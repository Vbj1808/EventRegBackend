//require express package
var express = require('express');
//require router
var router = express.Router();
//Load Event model
var Event = require('../model/regForm');
//Load User model
var User = require("../model/user");
//require passport package
var passport = require("passport");
//require authenticate file
var authenticate = require("../authenticate");

// @route GET 
// @description get event route
router.get('/:userId/events', (req,res,next) => {
    Event.find()
        .then(events => res.json(events))
        .catch(err => res.status(400).json({ noevent: "no event"}));
});


// @route POST 
// @description login user route
router.post("/login", passport.authenticate("user"), (req, res) => {
    const token = authenticate.getToken({ _id: req.user._id });
    res.cookie('token', token, { httpOnly: true });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ success: true, status: 'Login Successful!', token: token, userId: req.user._id });
});


// @route POST 
// @description create user route
router.post("/signup",(req,res,next)=>{
    console.log(req.body);
  User.register(new User({ name : req.body.name,username: req.body.username ,dob : req.body.dob, email: req.body.email,mobile : req.body.mobile}), req.body.password, (err, user) => {
    if (err) {
      res.status = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({ err: err });
    } else {
      passport.authenticate("user")(req, res, () => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: true, status: 'Registration Successful!' });
      });
    }
  });
});

// @route GET
// @description display event based on event id route
router.get('/:eventid/eventreg', (req,res,next) => {
  Event.findById(req.params.eventid)
    .then((event) => {
      if(event != null){
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(event);

      }
      else{
        err = new Error('Event' + req.params.eventid + 'not found');
        err.status = 404;
        return next(err);
      }
    }, (err) => next(err))
    .catch((err) => next(err));
})

// @route POST 
// @description create user reg for an event route
router.post('/:eventid/eventreg', (req,res,next) => {
  Event.findById(req.params.eventid)
    .then((event) => {
      if(event != null){
        event.eventreg.push(req.body);
        event.save()
        .then((event) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(event);

        }, (err)=> next(err));
      }
      else{
        err = new Error('Event ' + req.params.eventid+ 'not found');
        err.status = 404;
        return next(err);
      }
    }, (err)=> next(err))
    .catch((err) => next(err));
})


//Export
module.exports = router;