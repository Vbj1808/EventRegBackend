//require express package
var express = require('express');
var router = express.Router();
//require authenticale file
var authenticate = require("../authenticate");
//require passport package
var passport = require('passport');
//require multer package
var multer = require("multer");
//require fs package
var fs = require("fs");

//usign multer to store image 
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

var upload = multer({ storage: storage })

//Load event registration model

var Event = require('../model/regForm');

// @route POST 
// @description create event route
router.post("/createEvent", authenticate.verifyAdmin, upload.single("image"), (req, res) => {
    const host = req.host;
    const filePath = req.protocol + "://" + host + ":" +req.socket.localPort +'/' + req.file.filename;
    var event = new Event(req.body);
    event.imageUrl = filePath
    console.log(event);
    Event.create(event)
        .then((event) => {
            console.log(event);
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(event);
        })
        .catch((err) => console.log(err));
});
// @route GET
// @description display event route
router.get('/events', (req,res,next) => {
    Event.find()
        .then(events => res.json(events))
        .catch(err => res.status(400).json({ noevent: "no event"}));
});

// @route PUT
// @description update event route
router.put('/:eventid/update', (req,res) => {
  Event.findByIdAndUpdate(req.params.eventid, req.body)
      .then(event => res.json({ msg: 'Updated successfully'}))
      .catch(err => res.status(400).json({ error: 'Unable to update the database'}));
});

// @route Delete 
// @description delete event route
router.delete("/:eventid", (req, res,next) => {
  // console.log(req.params.taskId);
  Event.findByIdAndRemove(req.params.eventid,req.body)
      .then(Event => res.json({msgs: 'Event entry deleted successfully'}))
      .catch(err => res.status(400).json({ error: 'Unable to update the database'}));
});

// @route GET 
// @description get one event based on event id route
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
//export
module.exports = router;