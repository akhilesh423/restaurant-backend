const mongoose = require("mongoose")


const RoomSchema =new mongoose.Schema({
    name:{type:String, unique:true},
    RoomNumber:{type:Number, ubique:true}
})

module.exports = mongoose.model("Room", RoomSchema)