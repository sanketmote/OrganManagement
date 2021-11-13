const express = require('express');
const app = express();
const mongoose = require('mongoose');
var mongoUtil = require( 'mongoUtil' );
const dotenv = require('dotenv');
const cors = require('cors');
const mongodbutil  = require('./config/database');

app.use(express.json());
app.use(cors());
dotenv.config();


mongoose.connect(process.env.DATABASE_ACCESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Database connected!"))
.catch(err => console.log(err));


const HospitalRegistration = require('./routes/HospitalRegistration/controller');
const UserRegistration = require('./routes/UserRegistration/controller');

app.use('/hr', HospitalRegistration);
app.use('/ur', UserRegistration);

app.listen(4000, () => console.log("Server is up and running"));