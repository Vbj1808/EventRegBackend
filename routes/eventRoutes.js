const express = require('express');
const router = express.Router();

//Load event registration model

const Event = require('../model/regForm');

// @route GET 
// @description tests event route
// @access Public 

router.get('/test', (req,res)=> res.send('Event route testing!'));


router.post('/createEvent', (req,res)=> {
    Event.create(req.body)
        .then(body => res.json({ msg: 'Event created successfully' }))
        .catch(err => res.status(400).json({ error: 'Unable to create an event'}))
});

module.exports = router;