const chatModal = require("../Models/chatModel")

const createChat = async (req, res) => {
    const { firstId, secondId } = req.body

    try {
        const chat = await chatModal.findOne({ members: { $all: [firstId, secondId] } });
        if (chat) {
            return res.status(200).json(chat);
        }

        const newChat = new chatModal({
            members: [firstId, secondId]
        })
        const response = await newChat.save();
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}
const findUserChat = async (req, res) => {
    const userId = req.params.userId
    try {
        const chats = await chatModal.find({
            // members: { $in: [userId] }
            members: userId
        })
        res.status(200).json(chats)

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }

}

const findChat = async (req, res) => {
    const { firstId, secondId } = req.params
    try {
        const chat = await chatModal.find({
            members: { $all: [firstId, secondId] },
        })
        res.status(200).json(chat)

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }

}

module.exports = { createChat, findUserChat, findChat }
