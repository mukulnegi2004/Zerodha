const express = require("express");
const router = express.Router();
const usersController = require("../controllers/wallet");
const wrapAsync = require("../wrapAsync");
const { isLoggedIn, validateWallet } = require("../middleware");



router
    .route("/")
    .get(isLoggedIn, wrapAsync(usersController.balance))
    .post(isLoggedIn, validateWallet, wrapAsync(usersController.addBalance))





module.exports = router;







