const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");

const UserRegSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true,
        unique: true
    },

    

    password: {
        type: String,
        required: true 
    },

    dob: {
        type: Date,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    mobile: {
        type: String,
        required: true
    },


},{timestamps: true});

UserRegSchema.plugin(passportLocalMongoose);

module.exports = User = mongoose.model('user', UserRegSchema);