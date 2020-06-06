//require mongoose package
const mongoose = require('mongoose');

//event registration schema to register for an event
const EventRegSchema = new mongoose.Schema({
    //unique registration id for an user
    uniqueid: {
        type: Number,
        required: true,
        unique: true,
        sparse: true
        
    },
    
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
    image: {
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    noofticket:{
        type: Number,
        required: true
    }, 

}, {timestamps: true});

//create event schema to create an event
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
    eventfee: {
        type: String,
        required: true
    },
    //contains an array of registered users for a particular event
    eventreg: [EventRegSchema]

}, {timestamps: true});

//export
module.exports = Event = mongoose.model('event', CreateEventSchema);