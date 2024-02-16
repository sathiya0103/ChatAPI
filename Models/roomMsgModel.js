const mongoose = require("mongoose")

const roomMsgSchema = new mongoose.Schema({
    roomId: String,
    senderId: String,
    roomMessage: {
        type: String,
        required: false
    },
    desc: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    docs: {
        type: String,
        required: false
    }
}, { timestamps: true })

const roomMsgModel = mongoose.model("RoomMessage", roomMsgSchema)
module.exports = roomMsgModel