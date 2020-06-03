var express = require('express');
var router = express.Router();
var authenticate = require("../authenticate");
var passport = require('passport');
var multer = require("multer");
var fs = require("fs");

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

// @route GET 
// @description tests event route
// @access Public 


router.post("/createEvent", authenticate.verifyAdmin, upload.single("image"), (req, res) => {
    const host = req.host;
    const filePath = req.protocol + "://" + host + ":" +req.socket.localPort +'/' + req.file.filename;
    var event = new Event(req.body);
    event.imageUrl = filePath
    console.log(event);
    Event.create(event)
        .then((event) => {

            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(event);
        })
        .catch((err) => console.log(err));
});



module.exports = router;