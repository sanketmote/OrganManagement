const mongoose = require('mongoose');

const requestschema = new mongoose.Schema({
    did: {
        type: String,
        allowNull: false,
        foreignKey: true,
    },
    uid: {
        type: String,
        allowNull: false,
        foreignKey: true,
    },
    hid:{
        type: String,
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


module.exports = mongoose.model('donarrequest', requestschema);