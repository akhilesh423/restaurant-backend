import OrderModel from "../models/orderModel.mjs";

const adminAnalytics = async (req, res) => {
    try {
        const allOrders = await OrderModel.find();

        let totalOrders = allOrders.length;
        let totalRevenue = allOrders.reduce((acc, order) => acc + order.totalPrice, 0);

        const today = new Date();
        const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);



        const todayOrders = allOrders.filter(order => {
            const orderDate = new Date(order.createdAt);
            return orderDate >= startOfToday && orderDate < endOfToday;
        });


        const todayRevenue = todayOrders.reduce((acc, order) => acc + order.totalPrice, 0);
        const todayTotalOrders = todayOrders.length;


        return res.json({
            totalRevenue,
            totalOrders,
            todayRevenue,
            todayTotalOrders
        });
    } catch (error) {
        // Handle errors
        console.error("Error in admin analytics:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export default adminAnalytics;
