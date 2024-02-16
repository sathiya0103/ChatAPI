const counterModal = require("../Models/counterModel");
const roomModal = require("../Models/roomModel")

// Create Room 
const createRoom = async (req, res) => {
    try {
        const { createdByUser, roomName, desc } = req.body;
        const developerIds = ['659ccbe43531a73aa8a36cb9', '659ccbdb3531a73aa8a36cb6', '659ccbd13531a73aa8a36cb3'];
        const existingRoom = await roomModal.findOne({ createdBy: createdByUser, roomName: roomName });

        if (existingRoom) {
            return res.status(200).json(existingRoom);
        }

        // Using async/await with findOneAndUpdate
        let seqId;
        const cd = await counterModal.findOneAndUpdate(
            { id: "autoval" },
            { "$inc": { "seq": 1 } },
            { new: true }
        );

        if (cd == null) {
            const newVal = new counterModal({ id: "autoval", seq: 1 });
            await newVal.save();
            seqId = 1;
        } else {
            seqId = cd.seq;
        }
        const paddedSeqId = seqId.toString().padStart(4, '0');
        const newRoom = new roomModal({
            createdBy: createdByUser,
            roomName: roomName,
            desc: desc,
            members: [createdByUser, ...developerIds],
            ticketNo: `Ticket#${paddedSeqId}`
        });

        // If the room doesn't exist, create a new one
        const response = await newRoom.save();
        res.status(200).json(response);
        console.log(newRoom.ticketNo);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};

// Find a particulat user Rooms
const findUserRoom = async (req, res) => {
    const userId = req.params.userId

    try {
        const rooms = await roomModal.find({ members: userId })
        if (rooms.length === 0) {
            return res.status(404).json({ message: 'No rooms found for the user.' });
        }
        res.status(200).json(rooms)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

// Get the particular Room Details by passing room_id
const getRoomDetails = async (req, res) => {
    const roomId = req.params.roomId

    try {
        const roomDetail = await roomModal.findOne({ _id: roomId });

        if (!roomDetail) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.status(200).json(roomDetail)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

// Joining in a room
const joinRoom = async (req, res) => {
    const { userId, roomId } = req.body
    try {
        const room = await roomModal.findById(roomId)
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        // Check if the user is already a member of the room
        if (room.members.includes(userId)) {
            return res.status(400).json({ message: 'User is already a member of the room' });
        }

        room.members.push(userId)

        res.status(200).json({ message: 'User joined the room successfully' });
        await room.save()
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

// Remove from Room
const leftRoom = async (req, res) => {
    const { userId, roomId } = req.body
    try {

        // Find the room by its ID
        const room = await roomModal.findById(roomId);

        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        // Check if the user is a member of the room
        if (!room.members.includes(userId)) {
            return res.status(400).json({ message: 'User is not a member of the room' });
        }

        // Remove the user from the members array and save the updated room
        room.members = room.members.filter(memberId => memberId !== userId);
        await room.save();

        res.status(200).json({ message: 'User left the room successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

const getAllRooms = async (req, res) => {
    try {
        const rooms = await roomModal.find();

        if (!rooms || rooms.length === 0) {
            return res.status(404).json({ message: 'No rooms found for the user.' });
        }
        res.status(200).json(rooms);
    } catch (error) {
        console.error('Error fetching rooms:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
const getAllRoom = async (req, res) => {

    try {
        const rooms = await roomModal.find()
        if (rooms.length === 0) {
            return res.status(404).json({ message: 'No rooms found for the user.' });
        }
        res.status(200).json(rooms)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}
module.exports = { createRoom, findUserRoom, getRoomDetails, joinRoom, leftRoom, getAllRoom }