const mongoose = require("mongoose")


const foodModel = new mongoose.Schema({
    itemName: { type: String, required: true },
    itemCategory: { type: String, required: true },
    itemImage: { type: String, required: true },
    itemPrice: { type: Number, required: true },
    itemDescription: { type: String, required: true },
    itemType: { type: String, required: false }
}, { timestamps: true })


module.exports = mongoose.model("foodItems", foodModel);
