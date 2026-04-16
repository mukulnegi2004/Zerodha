const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose").default;


const UsersSchema = new mongoose.Schema({
    name: {                                                                      //for username
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    wallet: {
        type: Number,
        default: 0
    }
})

UsersSchema.plugin(passportLocalMongoose, {         //email becomes the login identifier, plugin uses email instead of username for authentication,it adds hash and salt fields to store password securely
    usernameField: "email",
    usernameLowerCase: true                              // converts email to lowercase during login/authentication 
});

// UsersSchema.index({email: 1}, {unique: true});        //indexing, Not needed because passport-local-mongoose automatically creates a unique index on the username field (here, email)

module.exports = UsersSchema;