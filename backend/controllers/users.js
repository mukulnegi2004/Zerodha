const { UsersModel } = require("../models/UsersModel");
const passport = require("passport");
const {ExpressError} = require("../ExpressError")

const signup = async (req, res, next) => {
    let { name, email, password } = req.body;
    let newUser = new UsersModel({
        name: name,
        email: email
    })

    const existingUser = await UsersModel.findOne({ email: email });
    if (existingUser) {
        return next(new ExpressError("Email already Exists", 400));
    }

    let registerUser = await UsersModel.register(newUser, password);

    req.login(registerUser, (err) => {
        if (err) {
            return next(new ExpressError("Login after signup failed", 500));
        }
        res.json({
            Signup: "success",
            user: req.user
        });
    })
}

const login = async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err)
        }
        if (!user) {
            let msg = info?.message === "Missing credentials" ? "Please enter email and password" : "Invalid email or password";
            return next(new ExpressError(msg, 401));
        }

        req.login(user, (err) => {
            if (err) {
                return next(new ExpressError("Login failed", 500));
            }
            res.json({
                login: "successFull Login",
                user: req.user
            });
        });

    })(req, res, next);
}


const logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.clearCookie("connect.sid");
        res.json({ logout: "logout successfull" })
    })
};



module.exports = { signup, login, logout };