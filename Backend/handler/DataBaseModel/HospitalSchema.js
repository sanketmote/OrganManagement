const mongoose = require('mongoose');

const HospitalSchema = new mongoose.Schema({
    hid:{
        type: Number,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    HosName: {
        type: String,
        allowNull: false,
        required: true
    },
    mobileno: {
        type: Number,
        allowNull: false,
        primaryKey: true,
        required: true,
        unique: true
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
    role:{
        type: String,
        default: 'Hospitals'
    },
    date: {
        type: Date,
        default: Date.now
    }



})


module.exports = mongoose.model('Hospitals', HospitalSchema);