const MicroServiceResponse = require('../../handler/ResponseModels/MicroServiceResponse');
var addonoristration = require('../../handler/DataBaseModel/DonorSchema');
var addrequest = require('../../handler/DataBaseModel/request');
// const mongodbutil = require('../../config/database');

const addonor = async function (req, res) {
    return await new Promise((resolve, reject) => {
        // var MicroServiceResponse = new MicroServiceResponse();
        // var db = mongodbutil.getDb();
        try {
            // console.log("Ok 1");
            const SignedUpUser = new addonoristration({
                uid: req.body.uid,
                selecthospital: req.body.selecthospital,
                bloodgroup: req.body.bloodgroup,
                orgname: req.body.orgname,
                city: req.body.city,
                state: req.body.state,
                district: req.body.district,
                // selectedFile: req.body.selectedFile,
                metamaskid: req.body.metamaskid,
            });

            SignedUpUser.save()
                .then(data => {
                    // microServiceResponse.data = data;
                    // resolve(microServiceResponse);
                    const addreq = new addrequest({
                        did: data._id,
                        uid: req.body.uid,
                        hid:req.body.hid,
                    })
                    addreq.save()
                    .then(response => {
                        res.status(200).json(data)
                    }).catch(err =>{
                        res.status(203).send({ message:"Your Data has been Added but request failed to sent contact to admin"})
                    })
                })
                .catch(err => {
                    console.log(err);
                    // microServiceResponse.
                    // resolve(microServiceResponse);
                    res.status(203).send({ message:"Problem occured in saving data ...."});
                })
        } catch (err) {
            console.log('Error catched in Adding Donation in Database : ' + err.name + " : " + err.message);

            // microServiceResponse.MicroserviceErrorResponseListForUI.push(err.message);
            // microServiceResponse.MicroserviceErrorResponseList.push(err);

            // resolve(microServiceResponse);
            res.status(500).send({ message:"This error is from our side"});
        }
    })
}

module.exports.addonor = addonor;