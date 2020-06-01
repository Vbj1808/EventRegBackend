//ADMIN SCHEMA
const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");

const AdminSchema = new mongoose.Schema({
    
}, {timestamps: true });

AdminSchema.plugin(passportLocalMongoose);

module.exports =  mongoose.model('Admin', AdminSchema);