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
    const file = req.file;
    if (file) {
        console.log(req.file);
    }
    // res.render('image', {
    //     path: req.file.path
    //   });
    const host = req.host;
    const filePath = req.protocol + "://" + host + '/' + req.file.filename;
    res.send(filePath);
    // var img = fs.readFileSync(req.file.path);
    // var encode_image = img.toString('base64');
    // // Define a JSONobject for the image att
    // var event = new Event(req.body);
    // event.image.data = new Buffer(encode_image, 'base64');
    // event.image.contentType = req.file.mimetype;
    // console.log(event);
    // Event.create(req.body)
    //     .then((event) => {

    //         res.statusCode = 200;
    //         res.setHeader("Content-Type", "application/json");
    //         res.json(event);
    //     })
    //     .catch((err) => console.log(err));
});

module.exports = router;