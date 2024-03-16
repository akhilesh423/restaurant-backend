import OrderModel from "../models/orderModel.mjs";

const adminAcknowledge = async (req, res) => {
    const orderId = req.params.id;

    try {
        const updatedOrder = await OrderModel.findByIdAndUpdate(
            orderId,
            { isNew: false },
            { new: true }
        );

        res.status(200).json({ msg: "Order acknowledged successfully", order: updatedOrder });
    } catch (error) {
        console.error('Error acknowledging order:', error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export default adminAcknowledge;
