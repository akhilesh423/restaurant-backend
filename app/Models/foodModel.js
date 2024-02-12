const mongoose = require("mongoose")


const FooditemsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String },
    price: { type: Number },
    itemType: { type: String }
}, { timestamps: true })

const FoodItems = mongoose.model("FoodItems", FoodItemsSchema);

module.exports = FoodItems;