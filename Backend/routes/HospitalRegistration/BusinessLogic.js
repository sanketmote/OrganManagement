const MicroServiceResponse = require('../../handler/ResponseModels/MicroServiceResponse');
var HospitalRegistration = require('../../handler/DataBaseModel/HospitalSchema');
// const mongodbutil = require('../../config/database');
var bcrypt = require("bcryptjs");

const HospitalReg = async function (req, res) {
    return await new Promise((resolve, reject) => {
        // var MicroServiceResponse = new MicroServiceResponse();
        // var db = mongodbutil.getDb();
        try {
            // console.log("Ok 1");
            const SignedUpUser = new HospitalRegistration({
                hosname: req.body.hosname,
                mobileno: req.body.mobileno,
                email: req.body.email,
                city: req.body.city,
                state: req.body.state,
                district: req.body.district,
                country: req.body.country,
                address: req.body.address,
                metamaskid: req.body.metamaskid,
                password: bcrypt.hashSync(req.body.password, 8)
            });

            // console.log("Ok 2");
            SignedUpUser.save()
                .then(data => {
                    // microServiceResponse.data = data;
                    // resolve(microServiceResponse);
                    res.send(200).json(data)
                })
                .catch(err => {
                    console.log(err);
                    // microServiceResponse.
                    // resolve(microServiceResponse);
                    res.status(203).send({ message:"Problem occured in saving data ...."});
                })
        } catch (err) {
            console.log('Error catched in Hpspital Registration : ' + err.name + " : " + err.message);

            // microServiceResponse.MicroserviceErrorResponseListForUI.push(err.message);
            // microServiceResponse.MicroserviceErrorResponseList.push(err);

            // resolve(microServiceResponse);
            res.status(500).send({ message:"This error is from our side"});
        }
    })
}

module.exports.HospitalReg = HospitalReg;