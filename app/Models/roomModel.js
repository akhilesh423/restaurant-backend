const mongoose = require("mongoose")


const roomModel = new mongoose.Schema({
    name: { type: String, unique: true },
})

module.exports = mongoose.model("room", roomModel)