const mongoose = require('mongoose');

const EventRegSchema = new mongoose.Schema({
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


const CreateEventSchema = new mongoose.Schema({
    imageUrl: {
        type : String,
        required:true
    },
    name:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true 
    },
    lastdate: {
        type: Date,
        required: true 
    },
    events: [EventRegSchema]

}, {timestamps: true});

module.exports = Event = mongoose.model('event', CreateEventSchema);