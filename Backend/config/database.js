const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.DATABASE_ACCESS;

let _db

const connectDB = async (callback) => {
    try {
        MongoClient.connect(uri, (err, db) => {
            _db = db
            return callback(err)
        })
    } catch (e) {
        throw e
    }
}

const getDB = () => _db

const disconnectDB = () => _db.close()

module.exports = { connectDB, getDB, disconnectDB }