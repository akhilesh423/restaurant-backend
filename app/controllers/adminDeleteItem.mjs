import FoodItem from "../models/foodModel.mjs";

const adminDeleteItem = async (req, res) => {
    try {
        const itemId = req.params.id;

        if (!itemId) {
            return res.status(400).json({ message: "Item ID is required" });
        }

        const deletedItem = await FoodItem.findByIdAndDelete(itemId);

        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.status(200).json({ message: "Item deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

export default adminDeleteItem;
