var express = require('express');
var router = express.Router();

var Event = require('../model/regForm');

router.get('/', (req,res,next) => {
    Event.find()
        .then(events => res.json(events))
        .catch(err => res.status(400).json({ noevent: "no event"}));
});