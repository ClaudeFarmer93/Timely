const mongoose = require("mongoose");

const todoListSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
    },
    created_at: {
        type: Date,
    },
    users: [{ type: Schema.Types.ObjectId, ref: "userSchema" }]
});

module.exports = mongoose.model("TodoList", todoListSchema);