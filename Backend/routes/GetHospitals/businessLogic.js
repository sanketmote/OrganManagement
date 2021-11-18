const MicroServiceResponse = require('../../handler/ResponseModels/MicroServiceResponse');
var gethospitals = require('../../handler/DataBaseModel/HospitalSchema')
// const mongodbutil = require('../../config/database');

const getHospital = async function (req, res) {
    return await new Promise((resolve, reject) => {
        // var MicroServiceResponse = new MicroServiceResponse();
        try {
            findhosfilter = {}
            hospitaldata = [];
            console.log(req.query)
            if(req.query.state && req.query.state.length > 0){
                findhosfilter.state = req.query.state
            }
            if(req.query.district  && req.query.district.length > 0){
                findhosfilter.district = req.query.district
            }

            if(req.query.city && req.query.city.length > 0){
                findhosfilter.city = req.query.city
            }
            console.log(findhosfilter)
            gethospitals.find(findhosfilter,{_id:0,hosname:1}, function(err,data){
                if(err) {
                    res.status(203).send({message:"Problem occured in database"});
                    throw err;
                } else {
                    console.log(data);
                    if(data.length > 0){
                        for(var i=0;i<data.length;i++){
                            hospitaldata[i] = data[i].hosname;
                        }
                    } else {
                        hospitaldata = []
                    }
                    res.send(Object.values(hospitaldata));
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