const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    fullName: {
        type: String,
        allowNull: false,
        required: true
    },
    mobileno: {
        type: Number,
        allowNull: false,
        primaryKey: true,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        allowNull: false,
        primaryKey: true,
        required: true,
        unique: true,
    },
    metamaskid:{
        type: String,
        unique: true,
    },
    password: {
        type: String,
        allowNull: false,
        required: true
    },
    isadmin: {
        type: Boolean,
        default: false
    },
    role:{
        type: String,
        default: 'users'
    },
    firstTime:{
        type: Boolean,
        default: true
    },
    date: {
        type: Date,
        default: Date.now
    }



})


module.exports = mongoose.model('users', UserSchema);