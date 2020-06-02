var express = require('express');
var router = express.Router();
var authenticate = require("../authenticate");
var passport = require('passport');

//Load event registration model

var Event = require('../model/regForm');

// @route GET 
// @description tests event route
// @access Public 


router.post("/createEvent", authenticate.verifyAdmin, (req, res) => {
    Event.create(req.body)
        .then((event) => {
            
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(event);
        })
        .catch((err) => console.log(err));
});



module.exports = router;