const MicroServiceResponse = require('../../handler/ResponseModels/MicroServiceResponse');
var HospitalRegistration = require('../../handler/DataBaseModel/HospitalSchema');
const mongodbutil = require('../../config/database');
var mongoUtil = require('mongoUtil');
var UserRegistration = require('../../handler/DataBaseModel/UserSchema');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const config  = require('../../config/auth.config')
// var db = mongodbutil.getDb();

const login = async function (req, res) {
    return await new Promise((resolve, reject) => {
        // var MicroServiceResponse = new MicroServiceResponse();
        // var db = mongodbutil.getDb();
        let data;
        try {
            var collection = req.body.role;
            if (collection === 'users') {
                UserRegistration.find({ email: req.body.email }, function (err, docs) {
                    if (err) throw err;
                    if (docs.length > 0) {  
                        console.log(docs);
                        var passwordIsValid = bcrypt.compareSync(
                            req.body.password,
                            docs[0].password
                        );
                        if (!passwordIsValid) {
                            return res.status(401).send({
                                accessToken: null,
                                message: "Invalid Password! try again"
                            });
                        } else {
                            var token = jwt.sign({ id: docs[0].id }, config.secret, {
                                expiresIn: 86400 // 24 hours
                            });
                            res.status(200).send({
                                id: docs[0].id,
                                fullName:docs[0].fullName,
                                mobileno: docs[0].mobileno,
                                email: docs[0].email,
                                roles: 'users',
                                accessToken: token
                              });
                        }
                        
                    } else {
                        res.status(404).send({ message: "Invalid Email Id" });
                    }
                    // console.log("Hello");

                });
            } else if (collection === 'Hospitals') {
                HospitalRegistration.find({ email: req.body.email, password: req.body.password }, function (err, docs) {
                    if (err) throw err;
                    if (docs.length > 0) {
                        var passwordIsValid = bcrypt.compareSync(
                            req.body.password,
                            docs[0].password
                        );
                        if (!passwordIsValid) {
                            return res.status(401).send({
                                accessToken: null,
                                message: "Invalid Password! try again"
                            });
                        } else {
                            var token = jwt.sign({ id: user.id }, config.secret, {
                                expiresIn: 864000000
                            });
                            res.status(200).send({
                                id: docs.id,
                                fullName:docs.fullName,
                                mobileno: docs.mobileno,
                                email: docs.email,
                                roles: 'Hospitals',
                                accessToken: token
                              });
                        }
                        
                    } else {
                        res.status(404).send({ message: "Invalid Email or Password" });
                    }
                    // console.log("Hello");
                });
            } else {
                res.status(404).send({ message: "Invalid Role "});
            }


        } catch (err) {
            console.log('Error catched in login: ' + err.name + " : " + err.message);

            // microServiceResponse.MicroserviceErrorResponseListForUI.push(err.message);
            // microServiceResponse.MicroserviceErrorResponseList.push(err);

            // resolve(microServiceResponse);
            res.send(err);
        }
    })
}

module.exports.login = login;