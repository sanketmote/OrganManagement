const mongoose = require('mongoose');

const requestschema = new mongoose.Schema({
    rid: {
        type: Number,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    did: {
        type: Number,
        allowNull: false,
        foreignKey: true,
    },
    uid: {
        type: Number,
        allowNull: false,
        foreignKey: true,
    },
    hid:{
        type: Number,
        allowNull: false,
        foreignKey: true,
    },
    verified:{
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('request', requestschema);