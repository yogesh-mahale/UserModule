class BaseResponse extends Error {
    constructor(message, errorType){
        super(message)
        this.name = errorType
    }
}


class SuccessResponse {
    constructor(message, statusCode, data, paginationData = null){
        this.success = true
        this.message = message;
        this.statusCode = statusCode;
        this.data = data;
        if (paginationData != null) {
            this.paginationData = paginationData;
        }
    }
}

class ErrorResponse extends BaseResponse {
    constructor(message, errorType, errorCode, errors){
        super(message)
        this.success = false
        this.name = errorType
        this.errors = errors
        this.statusCode = errorCode
        this.message = message
    }

    getErrorBody(){
        return {
            message : this.message,
            name    : this.name,
            statusCode : this.statusCode,
            success   : this.success,
            errors : this.errors
        }
    }
}

exports.ErrorResponse = ErrorResponse;
exports.SuccessResponse = SuccessResponse

