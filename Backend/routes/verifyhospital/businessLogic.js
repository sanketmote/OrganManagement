const MicroServiceResponse = require('../../handler/ResponseModels/MicroServiceResponse');
const hospitalrequest = require('../../handler/DataBaseModel/Hospitalsrequest');
const HospitalRegistration = require('../../handler/DataBaseModel/HospitalSchema');

const getRequest = async function (req, res) {
    return await new Promise(async (resolve, reject) => {
        // var MicroServiceResponse = new MicroServiceResponse();
        try {
            // var setdata = [];
            var hid = req.query.hid;
            reqdata = await HospitalRegistration.find({metamaskid:hid})
                .then(data => {
                    // return data;
                    res.send(data);
                }).catch(err => {
                    console.log(err);
                    res.status(203).send({ message: "Problem occured in database" });
                });
            // for (var i = 0; i < reqdata.length; i++) {
            //     await HospitalRegistration.find({ _id: reqdata[i].hid })
            //         .then(result => {
            //             if(!reqdata[i].verified)
            //                 setdata.push(result[0]);

            //             console.log(setdata);

            //         }).catch(err => {
            //             console.log(err);
            //             res.status(203).send({ message: "Problem occured in database" });
            //         })
            // }
            // res.send(setdata);


        } catch (err) {
            console.log('Error catched in Finding Hospitals in Database : ' + err.name + " : " + err.message);

            // microServiceResponse.MicroserviceErrorResponseListForUI.push(err.message);
            // microServiceResponse.MicroserviceErrorResponseList.push(err);

            // resolve(microServiceResponse);
            res.status(500).send({ message: "This error is from our side" });
        }
    })
}

module.exports.getRequest = getRequest;