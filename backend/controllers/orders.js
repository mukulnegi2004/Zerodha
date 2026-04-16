const { OrdersModel } = require("../models/OrdersModel");
const {UsersModel} = require("../models/UsersModel");
const {ExpressError} = require("../ExpressError")

const placeOrder = async (req, res, next) => {
    try {
        let { name, qty, price, mode } = req.body;

        const existing = await OrdersModel.findOne({                                    //to avoid duplicate orders placement
            user: req.user._id,
            name,
            qty,
            price,
            mode,
            createdAt: { $gte: new Date(Date.now() - 2000) }                 //Check if THIS SAME order was placed in last 2 seconds from same user, Date.now() => Gives current time in milliseconds, new Date(...) => Converts timestamp into proper Date object
        });

        if (existing) {
            return next(new ExpressError("Duplicate order detected", 400));
        }

        const purchase = qty * price;

        const user = await UsersModel.findOneAndUpdate(                 //reduce the wallet before purchasing order, remove race condition
            { _id: req.user._id, wallet: { $gte: purchase } },
            { $inc: { wallet: -purchase } },
            { new: true }
        );

        if(!user){
            return next(new ExpressError("insufficient balance", 400));
        }

        let newOrder = new OrdersModel({                                  //order placed after complete payment
            user: req.user._id, 
            name,
            qty,
            price,
            mode,
        })
        await newOrder.save();


        res.status(201).json({
            message: "order placed successfully",
            order: newOrder
        })

    } catch (err) {
        next(err);
    }
}

const totalOrders = async (req, res, next) => {
    try {
        const orders = await OrdersModel.find({ user: req.user._id }).sort({createdAt : -1});
        res.status(200).json(orders);
    } catch (err) {
        next(err);
    }
}


module.exports = {placeOrder, totalOrders};