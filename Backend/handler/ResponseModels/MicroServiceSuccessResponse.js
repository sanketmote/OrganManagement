class MicroServiceSuccessResponse {
    constructor(StatusCode, message, innerMessage) {
        this.StatusCode = StatusCode;
        this.Message = message;
        this.InnerMessage = innerMessage;
    }
}

module.exports = MicroServiceSuccessResponse;
