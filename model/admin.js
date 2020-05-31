//ADMIN SCHEMA
const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true 
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true });

module.exports = Admin = mongoose.model('admin', AdminSchema);