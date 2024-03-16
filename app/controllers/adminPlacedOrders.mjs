import OrderModel from "../models/orderModel.mjs";

const adminPlacedOrders = async (req, res) => {
    try {
        const allItems = await OrderModel.find();
        res.status(200).send(allItems);
    } catch (err) {
        console.error('Error fetching items:', err);
        res.status(500).send({ msg: "Internal server error." });
    }
}

export default adminPlacedOrders;
