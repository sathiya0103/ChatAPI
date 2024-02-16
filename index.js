const express = require("express")
const cors = require("cors")
const path = require('path');
const mongoose = require("mongoose")
const userRoute = require("./Routes/UserRoute")
const chatRoute = require("./Routes/chatRoute")
const messageRoute = require("./Routes/messageRoute")
const roomRoute = require("./Routes/roomRoute")
const roomMsgRoute = require("./Routes/roomMsgRoute")
const teamRoomRoute = require("./Routes/teamroomRoute")
const app = express()
require("dotenv").config()
app.use(express.json())
app.use(cors())
app.use("/api/users", userRoute)
app.use("/api/chats", chatRoute)
app.use("/api/messages", messageRoute)
app.use("/api/room", roomRoute)
app.use("/api/roomMessage", roomMsgRoute)
app.use("/api/teamRoom", teamRoomRoute)
app.use('/images', express.static(path.join(__dirname, 'public', 'Images')));
const port = process.env.PORT || 5000;
const url = process.env.DB_URL;

app.listen(port, (req, res) => {
	console.log("********Server is running on:", `${port}`, "********");
})

app.get("/", (req, res) => {
	res.send("Backend is Runnning")
});

mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then(() => console.log("********Mongo DB connected********"))
	.catch((error) => console.log("MongoDb connection failed", error.message))

