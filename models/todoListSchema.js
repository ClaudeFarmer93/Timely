const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoListSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    updated_at: {
        type: Date,
    },
    created_at: {
        type: Date,
    },
    owner: {
        type: String
    },
    colaborators: [{ type: Schema.Types.ObjectId, ref: "userSchema" }]
});

module.exports = mongoose.model("TodoList", todoListSchema);