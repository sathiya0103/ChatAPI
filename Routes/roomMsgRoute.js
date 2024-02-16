const express = require("express")
const router = express.Router();
const { createRoomMsg, getRoomMessages, getUserMessage } = require("../Controllers/roomMsgController")
const upload = require('../middleware/upload')
const uploads = require('../middleware/videoupload')


router.post("/", upload.array('image[]'), createRoomMsg)
router.get("/:roomId", getRoomMessages)
router.get("/getUserMessages", getUserMessage)

router.post('/upload', uploads.single('video'), function (req, res) {
    const video = req.file;

    video.save('./uploads/' + video.originalname);

    res.send('Video uploaded successfully!');
});

module.exports = router