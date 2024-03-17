import OrderModel from "../models/orderModel.mjs";

const adminAnalytics = async (req, res) => {
    try {
        const allOrders = await OrderModel.find();

        let totalOrders = allOrders.length;
        let totalRevenue = allOrders.reduce((acc, order) => acc + order.totalPrice, 0);

        // Get current Indian Date and Time
        const today = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
        const todayIST = new Date(today);

        // Get start and end of today in Indian time
        const startOfTodayIST = new Date(todayIST.getFullYear(), todayIST.getMonth(), todayIST.getDate(), 0, 0, 0);
        const endOfTodayIST = new Date(todayIST.getFullYear(), todayIST.getMonth(), todayIST.getDate() + 1, 0, 0, 0);

        // Filter orders for today in Indian time
        const todayOrdersIST = allOrders.filter(order => {
            const orderDate = new Date(order.createdAt).toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
            const orderDateIST = new Date(orderDate);
            return orderDateIST >= startOfTodayIST && orderDateIST < endOfTodayIST;
        });

        const todayRevenue = todayOrdersIST.reduce((acc, order) => acc + order.totalPrice, 0);
        const todayTotalOrders = todayOrdersIST.length;


        return res.json({
            totalRevenue,
            totalOrders,
            todayRevenue,
            todayTotalOrders
        });
    } catch (error) {
        console.error("Error in admin analytics:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export default adminAnalytics;
