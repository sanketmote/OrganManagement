const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    uid: {
        type: Number,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
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
        allowNull: false,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        allowNull: false,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }



})


module.exports = mongoose.model('users', UserSchema);