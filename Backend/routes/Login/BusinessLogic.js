const MicroServiceResponse = require('../../handler/ResponseModels/MicroServiceResponse');
var HospitalRegistration = require('../../handler/DataBaseModel/HospitalSchema');
const mongodbutil = require('../../config/database');
var mongoUtil = require( 'mongoUtil' );
var UserRegistration = require('../../handler/DataBaseModel/UserSchema');

// var db = mongodbutil.getDb();

const login = async function (req,res) {
    return await new Promise((resolve, reject) => {
        // var MicroServiceResponse = new MicroServiceResponse();
        // var db = mongodbutil.getDb();
        let data;
        try {
            var collection = req.body.role;
            if(collection === 'users'){
                UserRegistration.find({email:req.body.email,password:req.body.password},function(err,docs){
                    if(err) throw err;
                    if(docs.length > 0){
                        res.json(docs);
                    } else{
                        res.json({error:"Invalid Email or Password"});
                    }
                    // console.log("Hello");
                    
                });
            } else if(collection === 'Hospitals'){
                HospitalRegistration.find({email:req.body.email,password:req.body.password},function(err,docs){
                    if(err) throw err;
                    if(docs.length > 0){
                        res.json(docs);
                    } else{
                        res.json({error:"Invalid Email or Password"});
                    }
                    // console.log("Hello");
                });
            } else {
                res.send("Invalid Role ");
            }
            
            
        } catch (err) {
            console.log('Error catched in login: ' + err.name + " : " + err.message);

            // microServiceResponse.MicroserviceErrorResponseListForUI.push(err.message);
            // microServiceResponse.MicroserviceErrorResponseList.push(err);

            // resolve(microServiceResponse);
            res.send(err);
        }
    })
}

module.exports.login = login;