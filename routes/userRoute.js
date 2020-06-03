var express = require('express');
var router = express.Router();

var Event = require('../model/regForm');
var User = require("../model/user");
var passport = require("passport");
var authenticate = require("../authenticate");

router.get('/:userId/events', (req,res,next) => {
    Event.find()
        .then(events => res.json(events))
        .catch(err => res.status(400).json({ noevent: "no event"}));
});

router.get('/:userId/:eventId', (req,res,next) => {
  Event.findById(req.params.eventId)
    .then((event) => {
      if(event != null){
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(event.eventreg);

      }
      else{
        err = new Error('Event' + req.params.eventId + 'not found');
        err.status = 404;
        return next(err);
      }
    }, (err) => next(err))
    .catch((err) => next(err));
})

router.post('/:eventId/eventReg', (req,res,next) => {
  Event.findById(req.params.eventId)
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
        err = new Error('Event ' + req.params.eventId+ 'not found');
        err.status = 404;
        return next(err);
      }
    }, (err)=> next(err))
    .catch((err) => next(err));
})


router.post("/login", passport.authenticate("user"), (req, res) => {
    const token = authenticate.getToken({ _id: req.user._id });
    res.cookie('token', token, { httpOnly: true });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ success: true, status: 'Login Successful!', token: token, userId: req.user._id });
});

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

module.exports = router;