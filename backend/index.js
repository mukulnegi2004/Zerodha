require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { UsersModel } = require("./models/UsersModel");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const passport = require("passport");
const localStrategy = require("passport-local");
const { isLoggedIn } = require("./middleware");
const holdingsRouter = require("./routes/holdings");
const positionsRouter = require("./routes/positions");
const ordersRouter = require("./routes/orders");
const usersRouter = require("./routes/users");
const walletRouter = require("./routes/wallet");



const app = express();

app.use(cors({
    origin: [process.env.CLIENT_URL, process.env.ADMIN_URL],
    credentials: true
}));
app.use(express.json());                                            //parses incoming JSON request data and makes it available in req.body


async function main() {
    try {
        let url = process.env.MONGO_URL;
        await mongoose.connect(url);
        console.log("connection successful");

    } catch (err) {
        console.log(err);
    }
}
main();





//authentication and session creation
const store = MongoStore.create({
    mongoUrl: process.env.MONGO_URL,                               //Sessions will be saved in MongoDB instead of memory
    crypto: {
        secret: process.env.SECRET                                 // Used to encrypt session data in DB
    },
    touchAfter: 24 * 3600                                          //If session is unchanged → don’t update DB for 24 hours
})

store.on("error", (err) => {
    console.log("error in mongo session store", err);
})


const sessionOptions = {
    store: store,                                       // Use MongoDB store for session persistence 
    secret: process.env.SECRET,                        //Used to sign the session ID cookie
    resave: false,                                    //Don’t save session again if nothing changed
    saveUninitialized: false,                         //Session is created only when something is stored
    proxy: true,
    cookie: {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),                     //Exact date when cookie will expire
        maxAge: 7 * 24 * 60 * 60 * 1000,                                   //  How long cookie lives (in ms)
        httpOnly: true,                                                  //JavaScript (frontend) cannot access cookie
        secure: false,                                                   //for localHost
        sameSite: "lax"
        // secure: true,
        // sameSite: "none"
    }
}
app.set("trust proxy", 1);
app.use(session(sessionOptions));



app.use(passport.initialize());                                                        //Starts Passport in your app
app.use(passport.session());                                           //Connects Passport with sessions, Lets Passport store user login state
passport.use(new localStrategy({ usernameField: "email" }, UsersModel.authenticate()));         //Defines how login works, Uses email + password (because you configured it)
passport.serializeUser(UsersModel.serializeUser());                         //Stores user ID in session
passport.deserializeUser(UsersModel.deserializeUser());                    //to get full user details from stored user ID in session data

app.get("/", (req, res) => {
    res.send("Backend is LIVE 🚀");
});

app.use("/", usersRouter);

app.use("/holdings", holdingsRouter);                                       //prefix with /holdings

app.use("/positions", positionsRouter);

app.use("/orders", ordersRouter);

app.use("/wallet", walletRouter);



//check route, if user is logged in before rendering any dashboard component
app.get("/users/me", isLoggedIn, (req, res) => {
    res.json({ user: req.user });
})







app.use((err, req, res, next) => {
    let { status = 500, message = "Internal Server Error" } = err;
    res.status(status).json({ message: message });
})






let port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`app is listening at port: ${port}`)
})