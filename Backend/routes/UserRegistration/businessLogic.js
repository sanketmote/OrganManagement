const MicroServiceResponse = require('../../handler/ResponseModels/MicroServiceResponse');
var UserRegistration = require('../../handler/DataBaseModel/UserSchema');
// const mongodbutil = require('../../config/database');

const UserReg = async function (req,res) {
    return await new Promise((resolve, reject) => {
        // var MicroServiceResponse = new MicroServiceResponse();
        // var db = mongodbutil.getDb();
        try {
            // console.log("Ok 1");
            const SignedUpUser = new UserRegistration({
                fullName: req.body.fullName,
                mobileno: req.body.mobileno,
                email: req.body.email,
                metamaskid:req.body.metamaskid,
                password: req.body.password,
            });

            // console.log("Ok 2");
            SignedUpUser.save()
                .then(data => {
                    // microServiceResponse.data = data;
                    // resolve(microServiceResponse);
                    res.json(data)
                })
                .catch(err => {
                    console.log(err);
                    // microServiceResponse.
                    // resolve(microServiceResponse);
                    res.send(err);
                })
        } catch (err) {
            console.log('Error catched in Get Payments: ' + err.name + " : " + err.message);

            // microServiceResponse.MicroserviceErrorResponseListForUI.push(err.message);
            // microServiceResponse.MicroserviceErrorResponseList.push(err);

            // resolve(microServiceResponse);
            res.send(err);
        }
    })
}

module.exports.UserReg = UserReg;