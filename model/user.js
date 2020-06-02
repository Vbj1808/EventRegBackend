const mongoose = require('mongoose');

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

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true 
    },

    mobile: {
        type: String,
        required: true
    },


},{timestamps: true});

module.exports = User = mongoose.model('user', UserRegSchema);