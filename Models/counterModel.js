const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema(
    {
        id: String,
        seq: Number

    },
    {
        timestamps: true
    })

const counterModal = mongoose.model("counter", counterSchema);
module.exports = counterModal;
