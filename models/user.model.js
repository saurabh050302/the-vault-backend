const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userAddress: {
        type: String,
        required: true
    },
    key: {
        type: Buffer,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;