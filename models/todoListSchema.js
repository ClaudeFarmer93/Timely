const mongoose = require("mongoose");

const todoListSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports=mongoose.model("TodoList", todoListSchema);