class ExpressError extends Error{
    constructor(message, status = 500){
        super();
        this.status = status;
        this.message = message;
    }
}


module.exports = {ExpressError};