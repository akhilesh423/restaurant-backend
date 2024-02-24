const mongoose = require("mongoose")


const RoomModel = new mongoose.Schema({
    name: { type: String, unique: true },
})

module.exports = mongoose.model("Room", RoomModel)