const MicroServiceResponse = require('../../handler/ResponseModels/MicroServiceResponse');
var HospitalRegistration = require('../../handler/DataBaseModel/HospitalSchema');
const mongodbutil = require('../../config/database');
// var mongoUtil = require('mongoUtil');
var UserRegistration = require('../../handler/DataBaseModel/UserSchema');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const config = require('../../config/auth.config')
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
                            return res.status(203).send({
                                accessToken: null,
                                message: "Invalid Password! try again"
                            });
                        } else {
                            var token = jwt.sign({ id: docs[0].id }, config.secret, {
                                expiresIn: 86400 // 24 hours
                            });
                            res.status(200).send({
                                id: docs[0].id,
                                fullName: docs[0].fullName,
                                mobileno: docs[0].mobileno,
                                email: docs[0].email,
                                roles: 'users',
                                accessToken: token
                            });
                        }

                    } else {
                        res.status(203).send({ message: "Invalid Email Id" });
                    }
                    // console.log("Hello");

                });
            } else if (collection === 'Hospitals') {
                HospitalRegistration.find({ email: req.body.email }, function (err, docs) {
                    if (err) throw err;
                    if (docs.length > 0) {
                        var passwordIsValid = bcrypt.compareSync(
                            req.body.password,
                            docs[0].password
                        );
                        if (!passwordIsValid) {
                            return res.status(203).send({
                                accessToken: null,
                                message: "Invalid Password! try again"
                            });
                        } else {
                            var token = jwt.sign({ id: docs[0].id }, config.secret, {
                                expiresIn: 864000000
                            });
                            res.status(200).send({
                                id: docs.id,
                                fullName: docs.fullName,
                                mobileno: docs.mobileno,
                                email: docs.email,
                                roles: 'Hospitals',
                                accessToken: token
                            });
                        }

                    } else {
                        console.log(docs)
                        res.status(203).send({ message: "Invalid Email or Password", err: err });
                    }
                    // console.log("Hello");
                });
            } else {
                if (collection === 'Admin') {
                    UserRegistration.find({ email: req.body.email }, function (err, docs) {
                        if (err) throw err;
                        if (docs.length > 0) {
                            var passwordIsValid = bcrypt.compareSync(
                                req.body.password,
                                docs[0].password
                            );
                            if (!passwordIsValid) {
                                return res.status(203).send({
                                    accessToken: null,
                                    message: "Invalid Password! try again"
                                });
                            } else {
                                var token = jwt.sign({ id: docs[0].id }, config.secret, {
                                    expiresIn: 864000000
                                });
                                res.status(200).json({
                                    id: docs[0].id,
                                    fullName: docs[0].fullName,
                                    mobileno: docs[0].mobileno,
                                    email: docs[0].email,
                                    isAdmin:docs[0].isAdmin,
                                    roles: 'Admin',
                                    accessToken: token,
                                });
                            }

                        } else {
                            console.log(docs)
                            res.status(203).send({ message: "Invalid Email ", err: err });
                        }
                        // console.log("Hello");
                    });
                } else {
                    res.status(205).send({ message: "Invalid Role " });
                }

            }
        } catch (err) {
            console.log('Error catched in login: ' + err.name + " : " + err.message);

            // microServiceResponse.MicroserviceErrorResponseListForUI.push(err.message);
            // microServiceResponse.MicroserviceErrorResponseList.push(err);

            // resolve(microServiceResponse);
            res.status(500).send({ message: "This error is from our side" });
        }
    })
}

module.exports.login = login;