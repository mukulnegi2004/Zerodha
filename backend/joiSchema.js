const Joi = require("joi");

const ordersSchema = Joi.object({
    name: Joi.string().trim().required(),
    qty: Joi.number().integer().min(1).required(),
    price: Joi.number().min(0.1).required(),
    mode: Joi.string().valid("BUY", "SELL").required()
});



const signupSchema = Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required()
});



const loginSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required()
})



const walletSchema = Joi.object({
    add: Joi.number().integer().min(1).required()
})






module.exports = {ordersSchema, signupSchema, loginSchema, walletSchema};






