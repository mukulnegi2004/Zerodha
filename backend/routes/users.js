const express = require("express");
const router = express.Router();
const { validateLogin, validateSignup } = require("../middleware");
const wrapAsync = require("../wrapAsync")
const userController = require("../controllers/users")




router
    .route("/signup")
    .post(validateSignup, wrapAsync(userController.signup));



router
    .route("/login")
    .post(validateLogin, userController.login);


router
    .route("/logout")
    .post(userController.logout);

module.exports = router;















