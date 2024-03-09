import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  room: { type: String, required: true },
  foodItems: [
    {
      foodItem: { type: mongoose.Types.ObjectId, ref: "foodItems", required: true },
      quantity: { type: Number, required: true },
    }
  ],
  totalPrice: { type: Number },
  phoneNumber: { type: Number, required: true },
  placedAt: {
    type: Date,
    default: new Date(),
    immutable: true,
  },
}, { timestamps: true });

const OrderItem = mongoose.model("orderItems", orderSchema);

export default OrderItem;
