const teamroomModel = require("../Models/teamRoomModel")

// create room along with static room members

const createTeamRoom = async (req, res) => {

    try {
        const { userId } = req.body
        const existingRoom = await teamroomModel.findOne({ createdBy: userId })
        if (existingRoom) {
            return res.status(200).json(existingRoom)
        }
        const staticMembers = ['659ccbd13531a73aa8a36cb3', '659ccbdb3531a73aa8a36cb6', '659ccbe43531a73aa8a36cb9'];

        const addUserIdToStaticMembers = (staticMembers, userId) => {
            return [...staticMembers, userId];
        };
        const teamMembers = addUserIdToStaticMembers(staticMembers, userId);
        const newTeamRoom = new teamroomModel({
            createdBy: userId,
            members: teamMembers
        })

        const response = await newTeamRoom.save();
        res.status(200).json(response)

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}
module.exports = { createTeamRoom }