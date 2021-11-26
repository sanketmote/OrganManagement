const MicroServiceResponse = require('../../handler/ResponseModels/MicroServiceResponse');
var Donarrequest = require('../../handler/DataBaseModel/DonorSchema')
var SeekerRequest = require('../../handler/DataBaseModel/Seeker')
const getRequest = async function (req, res) {
    return await new Promise((resolve, reject) => {
        // var MicroServiceResponse = new MicroServiceResponse();
        try {
            whichHospital = req.query.hid;
            whichuserrole = req.query.userrole;
            if(whichuserrole === 'Donar'){
                Donarrequest.find({hid:whichHospital}, function(err,data){
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
            } else if(whichuserrole === 'Seeker'){
                SeekerRequest.find({hid:whichHospital}, function(err,data){
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
            } else {
                res.status(203).send({ message: "User Not Found" });
            }

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