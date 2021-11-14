const MicroserviceErrorResponse = require('./MicroServiceErrorResponse');
const MicroserviceSuccessResponse = require('./MicroServiceSuccessResponse');
const ErrorResponse = require('./ErrorResponse');

class MicroServiceResponse {
    constructor() {
        this.MicroserviceErrorResponseList = [];
        this.MicroserviceSuccessReponse = new MicroserviceSuccessResponse();
        this.MicroserviceErrorResponseListForUI = [];
        this.ErrorResponse = new ErrorResponse();
        
    }
}

module.exports = MicroServiceResponse;