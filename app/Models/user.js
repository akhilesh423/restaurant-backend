const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    userName:{type:String , unique:[true, "user is not registered!"], required:true},
    password:{type:String, required:true},
}, {timestamps:true})


module.exports = mongoose.model("User", UserSchema)