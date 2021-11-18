const express = require('express');
const router = express.Router();

const BusinessLogic = require('./businessLogic');


router.get('/', async (req, res, next) => {
    var controllerSuccess = true;
    try {
        var businessLogicResponse = await BusinessLogic.getHospital(req,res);
        print(businessLogicResponse);
        if (businessLogicResponse.ErrorResponse && businessLogicResponse.ErrorResponse.Errors.length > 0) {
            controllerSuccess = false;
            res.statusCode = 500;
            res.json(businessLogicResponse.ErrorResponse);
        } else {
            console.log("Data feteched");
        }

    } catch (e) {
        console.log('Exception catched at Controller: ' + e);
        res.StatusCode = 500;
        res.json(e.message + ' ' + e.stackTrace);
    }
});

module.exports = router;
