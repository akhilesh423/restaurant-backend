const mongoose = require("mongoose")


const FooditemsSchema =new mongoose.Schema({
    name:{type:String, required:true},
    category:{type:String, required:true},
    image:{type:String},
    price:{type:Number},
    offerPrice:{type:Number},
    isVeg:{type:Boolean, default:false}
},{timestamps: true})

module.exports = mongoose.model("FoodItems", FooditemsSchema)