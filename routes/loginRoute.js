//requrie packages and authenticate file
const express = require('express'),
    router = express.Router(),
    authenticate = require("../authenticate"),
    passport = require("passport");

//Load admin model
var Admin = require("../model/admin");

// @route POST 
// @description login admin route
router.post("/login", passport.authenticate("admin"), (req, res) => {
    const token = authenticate.getToken({ _id: req.user._id });
    res.cookie('token', token, { httpOnly: true });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ success: true, status: 'Login Successful!', token: token, userId: req.user._id });
});
// @route POST 
// @description create admin route
router.post("/signup",(req,res,next)=>{
    console.log(req.body);
  Admin.register(new Admin({ username: req.body.username }), req.body.password, (err, admin) => {
    if (err) {
      res.status = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({ err: err });
    } else {
      passport.authenticate("admin")(req, res, () => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: true, status: 'Registration Successful!' });
      });
    }
  });
});
//export
module.exports = router ;