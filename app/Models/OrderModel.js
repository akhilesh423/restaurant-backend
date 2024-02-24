const mongoose = require("mongoose")

const OrderModel = new mongoose.Schema({
  room: { type: String, required: true },
  foodItems: [
    {
      foodItem: { type: mongoose.Types.ObjectId, ref: "FoodItems", required: "true" },
      quantity: { type: Number, required: "true" },
    }
  ],
  totalPrice: { type: Number },
  placedAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },

}, { timestamps: true })

module.exports = mongoose.model("OrderItems", OrderModel)