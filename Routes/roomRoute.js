const express = require("express")
const router = express.Router()

const { createRoom, findUserRoom, getRoomDetails, joinRoom, leftRoom, getAllRoom } = require("../Controllers/roomController")

router.post("/", createRoom);
router.get("/find", findUserRoom)
router.get("/details/:roomId", getRoomDetails)
router.post("/join", joinRoom)
router.post("/left", leftRoom)
router.get("/rooms", getAllRoom)


module.exports = router;

