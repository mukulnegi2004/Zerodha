const { ExpressError } = require("./ExpressError");
const {ordersSchema, signupSchema, loginSchema, walletSchema} = require("./joiSchema");

const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({
            message: "You must be logged in",
            user: null
        });
    }

    next();
}



// // Joi schema validations


const validateOrder = (req, res, next) => {
    let {error, value} = ordersSchema.validate(req.body);

    if(error){
        let errorMsg = error.details.map((el) => el.message).join(", ");
        
        return next(new ExpressError(errorMsg, 400))
    }
    req.body = value;
    next();
}

const validateSignup = (req, res, next) => {
    let {error, value} = signupSchema.validate(req.body);

    if(error){
        let errorMsg = error.details.map((el) => el.message).join(", ");
        
        return next(new ExpressError(errorMsg, 400))
    }
    req.body = value;
    next();
}

const validateLogin = (req, res, next) => {
    let {error, value} = loginSchema.validate(req.body);

    if(error){
        let errorMsg = error.details.map((el) => el.message).join(", ");
        
        return next(new ExpressError(errorMsg, 400))
    }
    req.body = value;
    next();
}

const validateWallet = (req, res, next) => {
    let {error, value} = walletSchema.validate(req.body);

    if(error){
        let errorMsg = error.details.map((el) => el.message).join(", ");
        
        return next(new ExpressError(errorMsg, 400))
    }
    req.body = value;
    next();
}









module.exports = { isLoggedIn, validateOrder, validateLogin, validateSignup, validateWallet };






















