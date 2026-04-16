const express = require("express");
const router = express.Router();
const userController = require("../controllers/holdings");
const wrapAsync = require("../wrapAsync");
const {isLoggedIn} = require("../middleware");



router
    .route("/")
    .get(isLoggedIn, wrapAsync(userController.totalHoldings));


module.exports = router;