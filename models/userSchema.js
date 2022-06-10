const mongoose = require("mongoose");

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
        minglength: [5, "Your passowrd length should be greater than 5"]
    }
});
module.exports=mongoose.model("User", userSchema);