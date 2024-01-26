const mongoose = require("mongoose")



const OrderSchema =new mongoose.Schema({
    room:{type:mongoose.Types.ObjectId , required:true, ref:"Room"},
    foodItems:[
        {
          foodItem:{type:mongoose.Types.ObjectId , ref:"FoodItems", required:"true"},
          quantity:{type:Number ,  required:"true"},
        }
    ],
    totalPrice:{type:Number},
    placedAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
      },

},{timestamps: true})

module.exports = mongoose.model("Order", OrderSchema)