const mongoose = require("mongoose")


const RoomSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    RoomNumber: { type: Number, unique: true }
})

module.exports = mongoose.model("Room", RoomSchema)