const mongoose = require('mongoose');

const HospitalSchema = new mongoose.Schema({
    hosname: {
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
        allowNull: true,
        required: true,
        unique: true,
    },
    address:{
        type: String,
        allowNull: true,
        required: true,
    },
    city:{
        type: String,
        allowNull: false,
        required: true,
    },
    district:{
        type: String,
        allowNull: false,
        required: true,
    },
    state:{
        type: String,
        allowNull: false,
        required: true,
    },
    country:{
        type: String,
        allowNull: false,
        required: true,
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