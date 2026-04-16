const express = require("express");
const router = express.Router();
const userController = require("../controllers/positions")
const wrapAsync = require("../wrapAsync");
const {isLoggedIn} = require("../middleware");





router
    .route("/")
    .get(isLoggedIn, wrapAsync(userController.totalPositions));


module.exports = router;




























