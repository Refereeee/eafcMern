module.exports = class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorisedError(){
        return new ApiError(401,'Пользователь не авторизован')
    }

    static BadRequest(message,errors = []){
        console.log('badrequest')
        return new ApiError(400,  message, errors)
    }

}
