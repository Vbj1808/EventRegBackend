const mongoose = require('mongoose');

const EventRegSchema = new mongoose.Schema({
    
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
    eventreg: [EventRegSchema]

}, {timestamps: true});

module.exports = Event = mongoose.model('event', CreateEventSchema);