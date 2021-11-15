const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const mongoose = require('mongoose');
// var mongoUtil = require('mongoUtil');
const dotenv = require('dotenv');
const cors = require('cors');
const mongodbutil = require('./config/database');

app.use(express.json());
app.use(cors());
dotenv.config();
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

mongodbutil.connectToServer(function (err, client) {
  if (err) console.log(err);
  // start the rest of your app here
  console.log("Database connected!");
});
// mongoose.connect(process.env.DATABASE_ACCESS, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => console.log("Database connected!"))
// .catch(err => console.log(err));


const HospitalRegistration = require('./routes/HospitalRegistration/controller');
const UserRegistration = require('./routes/UserRegistration/controller');
const login = require('./routes/Login/controller');

app.use('/hr', HospitalRegistration);
app.use('/ur', UserRegistration);
app.use('/login', login);

app.listen(4000, () => console.log("Server is up and running"));