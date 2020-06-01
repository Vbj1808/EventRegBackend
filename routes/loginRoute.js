const express = require('express'),
      loginRouter = express.Router(),
      bcrypt = require("bcryptjs");

// Load admin login model

const Admin = require("../model/admin");



// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public


module.exports = loginRouter;
