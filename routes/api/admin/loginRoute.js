const express = require('express'),
      router = express.Router(),
      bcrypt = require("bcryptjs"),
      jwt = require("jsonwebtoken");

const keys = require('../../../config/keys');

// Load admin login model

const Admin = require("../../model/admin");

//Load input validation

const validateLogin = require("../../validation/adminLogin");

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/adminlogin", (req,res)=>{
    //form validation
    const { errors, isValid } = validateLogin(req.body);

    //check validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    const username = req.body.username;
    const password = req.body.password;

    //Find user by username
    Admin.findOne({ username })
        .then(user => {
            //check if user exists
            if(!user){
                return res.status(404).json({ emailnotfound: "Email not found "});
            }
            
            //check password 
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        //user matched
                        //create JWT Payload
                        const payload = {
                            id: user.id,
                            name: user.name
                        };

                        //Sign Token
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            {
                                expiresIn: 1200 //20 mins in seconds 

                            },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: "Beaker " + token
                                });
                            }
                        );

                    }else{
                        return res 
                            .status(400)
                            .json({ passwordincorrect: "Password incorrect "});
                    }
                });

        });
});

