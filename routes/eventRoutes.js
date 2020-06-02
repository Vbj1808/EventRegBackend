var express = require('express');
var router = express.Router();
var authenticate = require("../authenticate");
var passport = require('passport');

//Load event registration model

var Event = require('../model/regForm');

// @route GET 
// @description tests event route
// @access Public 

router.post('/createEvent', authenticate.verifyAdmin, (req,res,next)=> {
    Event.create({ image: req.body.image, name: req.body.name, description: req.body.description, lastdate: req.body.lastdate})
        .then((event) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(event);
        })
        .catch(err => res.status(400).json({ error: 'Unable to create an event'}))
});

module.exports = router;