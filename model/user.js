//require mongoose package
const mongoose = require('mongoose');
//require passport local mongoose package
const passportLocalMongoose = require("passport-local-mongoose");

//user schema 
const UserSchema = new mongoose.Schema({
    name :{
        type:String,
        required:true
    },
    
    dob : {
        type : Date,
        required : true
    },
    email : {
        required : true,
        type : String
    },
    mobile : {
        type : String,
        required:true
    }
    
}, {timestamps: true });

UserSchema.plugin(passportLocalMongoose);

//export 
module.exports =  mongoose.model('User', UserSchema);

