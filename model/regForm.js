const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true 
    },
    mobile: {
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    idimg: {
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    count:{
        type: Number,
        required: true
    }, 

}, {timestamps: true});

module.exports = Event = mongoose.model('event', EventSchema);