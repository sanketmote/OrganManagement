const mongoose = require('mongoose');

const SeekerSchema = new mongoose.Schema({
    uid: {
        type: String,
        allowNull: false,
        foreignKey: true,
    },
    bloodgroup: {
        type: String,
        allowNull: false,
        required: true
    },
    selecthospital: {
        type: String,
        allowNull: false,
        required: true
    },

    orgname: {
        type: String,
        allowNull: false,
        required: true
    },
    selectedFile: {
        type: Buffer,
        allowNull: false,
        // required: true
    },
    city: {
        type: String,
        allowNull: false,
        required: true
    },
    district: {
        type: String,
        allowNull: false,
        required: true
    },
    state: {
        type: String,
        allowNull: false,
        required: true
    },
    metamaskid: {
        type: String,
        allowNull: true,
        required: true,
    },
    hid: {
        type: String,
        allowNull: true,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('Seeker', SeekerSchema);