const express = require('express');
const router = express.Router();

//Load event registration model

const Event = require('../../model/regForm');

// @route GET api/events/test
// @description tests event route
// @access Public 

router.get('/test', (req,res)=> res.send('Event route testing!'));

// @route GET api/