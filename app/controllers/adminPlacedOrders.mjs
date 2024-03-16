import OrderModel from "../models/orderModel.mjs";

const adminPlacedOrders = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.limit) || 10;

    try {
        const totalCount = await OrderModel.countDocuments();
        const totalPages = Math.ceil(totalCount / perPage);

        const orders = await OrderModel.find()
            .sort({ createdAt: -1 })
            .skip((page - 1) * perPage)
            .limit(perPage);

        res.status(200).json({
            orders,
            totalPages,
            currentPage: page
        });
    } catch (err) {
        console.error('Error fetching items:', err);
        res.status(500).send({ msg: "Internal server error." });
    }
}

export default adminPlacedOrders;
