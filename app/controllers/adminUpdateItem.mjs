import FoodItem from "../models/foodModel.mjs";
import cloudinary from "../config/cloudinaryConfig.mjs"; // Assuming you're using Cloudinary for image uploading

const adminUpdateItem = async (req, res) => {
    try {
        const itemId = req.params.id; // Get the item ID from route parameters
        const { itemName, itemCategory, itemPrice, itemDescription, itemType } = req.body;

        // Check if all required fields are provided
        if (!itemId || !itemName || !itemCategory || !itemPrice || !itemDescription || !itemType) {
            return res.status(400).json({ message: "Item ID, name, category, price, description, and type are required" });
        }

        // Convert itemPrice to a floating point number
        const parsedPrice = parseFloat(itemPrice);

        // Upload itemImage to Cloudinary (assuming you have configured Cloudinary)
        const { path } = req.file;
        const uploadResult = await cloudinary.uploader.upload(path);
        const itemImage = uploadResult.secure_url;


        const updatedItem = await FoodItem.findByIdAndUpdate(itemId, {
            itemName,
            itemCategory,
            itemPrice: parsedPrice,
            itemDescription,
            itemType,
            itemImage
        }, { new: true });

        // Check if the item was found and updated successfully
        if (!updatedItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        // Return the updated item
        res.status(200).json({ message: "Item updated successfully", item: updatedItem });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

export default adminUpdateItem;
