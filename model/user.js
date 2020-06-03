const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");

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

module.exports =  mongoose.model('User', UserSchema);

// const UserRegSchema = new mongoose.Schema({
//     fullname: {
//         type: String,
//         required: true
//     },

//     username: {
//         type: String,
//         required: true,
//         unique: true
//     },

//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },

//     password: {
//         type: String,
//         required: true 
//     },

//     mobile: {
//         type: String,
//         required: true
//     },


// },{timestamps: true});

// module.exports = User = mongoose.model('user', UserRegSchema);
