import OrderItem from '../models/orderModel.mjs';

const userPlacedOrders = async (req, res) => {
    try {
        const placedOrders = req.body
        const savedOrders = await OrderItem.create(placedOrders);
        res.status(200).send({ msg: "order placed successfully" });
    } catch (err) {
        console.error('Error fetching items:', err);
        res.status(500).send({ msg: "There is something wrong with order items" });
    }
};

export default userPlacedOrders;