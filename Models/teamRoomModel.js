const mongoose = require("mongoose");

const teamroomSchema = new mongoose.Schema(
    {
        createdBy: String,
        // roomName: { type: String, required: false }, // Fix syntax error here
        members: Array
    },
    {
        timestamps: true
    })

const teamroomModal = mongoose.model("teamroomchat", teamroomSchema);
module.exports = teamroomModal;
