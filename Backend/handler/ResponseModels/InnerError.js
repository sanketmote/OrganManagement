class InnerError {
    constructor(Target, Code, Message) {
        this.Target = Target;
        this.Code = Code;
        this.Message = Message;
    }
}

module.exports = InnerError;
