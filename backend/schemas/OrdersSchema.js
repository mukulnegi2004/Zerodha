const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name: String,
    qty: Number,
    price: Number,
    mode: String
}, { timestamps: true })                                          //automatically adds createdAt: Date,  updatedAt: Date

// for sorting orders
OrderSchema.index({user: 1, createdAt: -1});            // Compound index: first sorts by user (ascending), and for the same user, sorts by createdAt (descending)


// for duplicate check
OrderSchema.index({ user: 1, name: 1, qty: 1, price: 1, mode: 1, createdAt: -1 });

module.exports = {OrderSchema};











