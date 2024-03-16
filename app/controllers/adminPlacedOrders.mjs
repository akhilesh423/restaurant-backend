import OrderModel from "../models/orderModel.mjs";

const adminPlacedOrders = async (req, res) => {
    try {
        // Fetch all orders and sort them by createdAt field in descending order
        const allItems = await OrderModel.find().sort({ createdAt: -1 });

        res.status(200).send(allItems);
    } catch (err) {
        console.error('Error fetching items:', err);
        res.status(500).send({ msg: "Internal server error." });
    }
}

export default adminPlacedOrders;
