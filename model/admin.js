//require mongoose package
const mongoose = require('mongoose');
//require passport local mongoose package
const passportLocalMongoose = require("passport-local-mongoose");


//admin schema
const AdminSchema = new mongoose.Schema({
    
}, {timestamps: true });

AdminSchema.plugin(passportLocalMongoose);

//export
module.exports =  mongoose.model('Admin', AdminSchema);