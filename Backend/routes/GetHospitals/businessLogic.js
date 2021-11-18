const MicroServiceResponse = require('../../handler/ResponseModels/MicroServiceResponse');
var gethospitals = require('../../handler/DataBaseModel/HospitalSchema')
// const mongodbutil = require('../../config/database');

const getHospital = async function (req, res) {
    return await new Promise((resolve, reject) => {
        // var MicroServiceResponse = new MicroServiceResponse();
        try {
            findhosfilter = {}
            if(req.query.state && req.query.state.length > 0){
                findhosfilter.state = req.query.state
            }
            if(req.query.district  && req.query.district.length > 0){
                findhosfilter.state = req.query.district
            }

            if(req.query.city && req.query.city.length > 0){
                findhosfilter.state = req.query.city
            }

            gethospitals.find(findhosfilter,{hid:1,hosname:1}, function(err,data){
                if(err) {
                    res.status(203).send({message:"Problem occured in database"});
                    throw err;
                } else {
                    res.send(data)
                }
            })

        } catch (err) {
            console.log('Error catched in Finding Hospitals in Database : ' + err.name + " : " + err.message);

            // microServiceResponse.MicroserviceErrorResponseListForUI.push(err.message);
            // microServiceResponse.MicroserviceErrorResponseList.push(err);

            // resolve(microServiceResponse);
            res.status(500).send({ message:"This error is from our side"});
        }
    })
}

module.exports.getHospital = getHospital;