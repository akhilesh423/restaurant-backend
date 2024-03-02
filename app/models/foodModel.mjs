import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    itemCategory: { type: String, required: true },
    itemImage: { type: String, required: true },
    itemPrice: { type: Number, required: true },
    itemDescription: { type: String, required: true },
    itemType: { type: String, required: false }
}, { timestamps: true });

const FoodItem = mongoose.model("foodItems", foodSchema);

export default FoodItem;

