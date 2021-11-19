const MicroServiceResponse = require('../../handler/ResponseModels/MicroServiceResponse');
var request = require('../../handler/DataBaseModel/Donarrequest')

const getRequest = async function (req, res) {
    return await new Promise((resolve, reject) => {
        // var MicroServiceResponse = new MicroServiceResponse();
        try {
            whichHospital = req.query.hid;

            request.find({hid:whichHospital}, function(err,data){
                if(err) {
                    res.status(203).send({message:"Problem occured in database"});
                    throw err;
                } else {
                    console.log(data);
                    // for(var i = 0; i < data.length; i++) {
                    //     res.send(data)
                    // }
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

module.exports.getRequest = getRequest;