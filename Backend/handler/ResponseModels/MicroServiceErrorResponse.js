const InnerError = require('./InnerError');

class MicroServiceErrorResponse{

    constructor(ErrorCode, ErrorMessage, Target){
        this.ErrorCode = ErrorCode;
        this.ErrorMessage = ErrorMessage;
        this.Target = Target;
        this.InnerError = new InnerError();
    }
}

module.exports = MicroServiceErrorResponse;