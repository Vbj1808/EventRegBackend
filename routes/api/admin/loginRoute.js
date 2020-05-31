const express = require('express'),
      router = express.Router(),
      bcrypt = require("bcryptjs"),
      jwt = require("jsonwebtoken");

// Load admin login model

const Admin = require("../../model/admin");

//Load input validation

const validateLogin = require("../../validation/adminLogin");

