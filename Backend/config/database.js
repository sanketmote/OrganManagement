const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const uri = process.env.DATABASE_ACCESS;

let _db
module.exports = {
  connectToServer: async function (callback) {
    try {
      console.log("Connecting to DataBase...");
      await mongoose.connect(process.env.DATABASE_ACCESS, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }, (err, client) => {
        console.log("Almost Connected to DataBase");
        // _db = client.db("organmanagement")
        return callback(err)
      })
    } catch (e) {
      throw e
    }
  },
  getDB: function () {
    return _db;
  }
}
// let _db;

// module.exports = {

//   connectToServer: function( callback ) {
//     MongoClient.connect(process.env.DATABASE_ACCESS, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     } , (err, client) => {
//         _db = client.db("organmanagement")
//         return callback(err)
//     });
//   },

//   getDb: function() {
//     return _db;
//   }
// };