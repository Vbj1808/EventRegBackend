var express = require('express');
var router = express.Router();

var Event = require('../model/regForm');

router.get('/events', (req,res,next) => {
    Event.find()
        .then(events => res.json(events))
        .catch(err => res.status(400).json({ noevent: "no event"}));
});

module.exports = router;