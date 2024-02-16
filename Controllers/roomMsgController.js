const roomMsgModel = require("../Models/roomMsgModel")

const createRoomMsg = async (req, res) => {
    const { roomId, senderId, roomMessage } = req.body;
    const roomMsg = new roomMsgModel({ roomId, senderId, roomMessage });

    // Handle image uploads
    if (req.files) {
        let path = ''
        req.files.forEach(function (files, index, arr) {
            path = path + files.path + ','
        })
        path = path.substring(0, path.lastIndexOf(","))
        roomMsg.image = path
    }


    //Hnadle file uploads
    // if (req.files) {
    //     let path = ''
    //     req.files.forEach(function (files, index, arr) {
    //         path = path + files.path + ','
    //     })
    //     filepath = path.substring(0, path.lastIndexOf(','))
    //     roomMsg.docs = filepath
    // }


    // Handle video uploads
    // if (req.files && req.files.videos) {
    //     let videoPath = '';
    //     req.files.videos.forEach(function (file, index, arr) {
    //         videoPath = videoPath + file.path + ',';
    //     });
    //     videoPath = videoPath.substring(0, videoPath.lastIndexOf(","));
    //     roomMsg.videos = videoPath;
    // }

    try {
        const response = await roomMsg.save();
        res.status(200).json(response);
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json(error);
    }
}

// const createRoomMsg = async (req, res) => {
//     const { roomId, senderId, roomMessage } = req.body
//     const roomMsg = new roomMsgModel({ roomId, senderId, roomMessage })
//     if (req.files) {
//         let path = ''
//         req.files.forEach(function (files, index, arr) {
//             path = path + files.path + ','
//         })
//         path = path.substring(0, path.lastIndexOf(","))
//         roomMsg.image = path
//     }
//     try {
//         const response = await roomMsg.save();
//         res.status(200).json(response);
//     } catch (error) {
//         console.error('Error saving message:', error);
//         res.status(500).json(error);
//     }
// }

// module.exports = { createRoomMsg }


// get all room messages

const getRoomMessages = async (req, res) => {
    const { roomId } = req.params

    try {
        const roomMessages = await roomMsgModel.find(({ roomId }))
        res.status(200).json(roomMessages)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }

}


const getUserMessage = async (req, res) => {
    const { userId } = req.body;

    try {
        const userMessages = await roomMsgModel.find({ senderId: userId });

        console.log('Found messages:', userMessages); // Log the messages for debugging

        res.status(200).json(userMessages);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};

module.exports = { createRoomMsg, getRoomMessages, getUserMessage }
