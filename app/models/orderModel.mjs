import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  roomName: { type: String, required: true },
  instructions: { type: String, required: false },
  orders: [],
  totalPrice: { type: Number, required: true },
  phoneNumber: { type: Number, required: true },
  placedAt: {
    type: Date,
    default: new Date(),
    immutable: true,
  },
}, { timestamps: true });

const OrderItem = mongoose.model("orderItems", orderSchema);

export default OrderItem;
