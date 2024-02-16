const express = require("express")
const router = express.Router()

const { createTeamRoom } = require("../Controllers/teamRoomController")


router.post("/", createTeamRoom);
module.exports = router