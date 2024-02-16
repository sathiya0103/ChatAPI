const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
    {
        createdBy: String,
        roomName: String,
        desc: String,
        members: Array,
        ticketNo: String
    },
    {
        timestamps: true
    })

const roomModal = mongoose.model("roomchat", roomSchema);
module.exports = roomModal;
