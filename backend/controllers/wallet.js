const {UsersModel} = require("../models/UsersModel");
const {ExpressError} = require("../ExpressError")

const balance = async (req, res, next) => {
    try {
        res.status(200).json({
            wallet: req.user.wallet
        })
    } catch (err) {
        next(err);
    }
}


const addBalance = async (req, res, next) => {
    try {
        let amount = Math.floor(Number(req.body.add));
        if (!amount || amount <= 0) {
            return next(new ExpressError("Enter valid amount", 400))
        }

        let user = await UsersModel.findByIdAndUpdate(req.user._id, { $inc: { wallet: amount } }, { runValidators: true, new: true });

        res.status(200).json({
            message: "Money added successfully",
            wallet: user.wallet
        });

    } catch (err) {
        next(err);
    }
}


module.exports = {balance, addBalance};

