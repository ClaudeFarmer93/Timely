const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "Fullname is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [5, "Your password length should be greater than 5"]
    },
    updated_at: {
        type: Date,
    },
    created_at: {
        type: Date,
    }
});
/* userSchema.pre("save", function (next) {
    let user = this;
    if (!user.apiToken) user.apiToken = randToken.generate(16);
    next();
}); */
/* userSchema.plugin(passportLocalMongoose, {
    usernameField: "email"
   }); */
userSchema.pre("save", function (next) {
    let user = this;
    bcrypt.hash(user.password, 10).then(hash => {
        user.password = hash;
        next();
    })
        .catch(error => {
            console.log(`Error in hashing password: ${error.message}`);
            next(error);
        });
});
userSchema.methods.passwordComparison = function (inputPassword) {
    let user = this;
    return bcrypt.compare(inputPassword, user.password);
};

module.exports = mongoose.model("User", userSchema);