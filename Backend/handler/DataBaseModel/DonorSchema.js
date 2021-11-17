const mongoose = require('mongoose');

const DonorSchema = new mongoose.Schema({
    did: {
        type: Number,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    uid: {
        type: Number,
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
        type: File,
        allowNull: false,
        required: true
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
        // required: true,
        // unique: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('Donors', DonorSchema);