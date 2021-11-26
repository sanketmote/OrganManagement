const MicroServiceResponse = require('../../handler/ResponseModels/MicroServiceResponse');
var getDonar = require('../../handler/DataBaseModel/DonorSchema')
var getSeeker = require('../../handler/DataBaseModel/Seeker')

// const mongodbutil = require('../../config/database');

const getUserDetails = async function (req, res) {
    return await new Promise((resolve, reject) => {
        // var MicroServiceResponse = new MicroServiceResponse();
        try {

            console.log(req.query)

            if (req.query.id) {
                if (req.query.role === 'Donar') {
                    getDonar.find({ uid: req.query.id })
                        .then(data => {
                            res.status(200).send(data);
                        })
                        .catch(err => {
                            res.status(203).send({ message: err });
                        })
                } else {
                    if (req.query.role === 'Seeker') {
                        getSeeker.find({ uid: req.query.id })
                            .then(data => {
                                res.status(200).send(data);
                            })
                            .catch(err => {
                                res.status(203).send({ message: err });
                            })
                    } else{
                        res.status(500).send({ message: "User Not found" });
                    }
                }
            }  else {
                if (req.query.role === 'Donar') {
                    getDonar.find({})
                        .then(data => {
                            res.status(200).send(data);
                        })
                        .catch(err => {
                            res.status(203).send({ message: err });
                        })
                } else {
                    if (req.query.role === 'Seeker') {
                        getSeeker.find({})
                            .then(data => {
                                res.status(200).send(data);
                            })
                            .catch(err => {
                                res.status(203).send({ message: err });
                            })
                    } else{
                        res.status(500).send({ message: "User Not found" });
                    }
                }
            }         

        } catch (err) {
            console.log('Error catched in Finding Hospitals in Database : ' + err.name + " : " + err.message);

            // microServiceResponse.MicroserviceErrorResponseListForUI.push(err.message);
            // microServiceResponse.MicroserviceErrorResponseList.push(err);

            // resolve(microServiceResponse);
            res.status(500).send({ message: "This error is from our side" });
        }
    })
}

module.exports.getUserDetails = getUserDetails;