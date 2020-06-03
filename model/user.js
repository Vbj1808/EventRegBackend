const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
    name :{
        type:String,
        required:true
    },
    mobile : {
        type : String,
        required:true
    },
    dob : {
        type : Date,
        required : true
    },
    
}, {timestamps: true });

UserSchema.plugin(passportLocalMongoose);

module.exports =  mongoose.model('User', UserSchema);