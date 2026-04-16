const express = require("express");
const router = express.Router();
const userController = require("../controllers/orders");
const {isLoggedIn, validateOrder} = require("../middleware");


router 
    .route("/")
    .get(isLoggedIn, userController.totalOrders)
    .post(isLoggedIn, validateOrder, userController.placeOrder);



module.exports = router;



































