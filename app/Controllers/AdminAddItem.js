const FoodModel = require('../Models/FoodModel.js');
const { AddNewItemSchema } = require("../Validations/Validation.js");
const Cloudinary = require("../Config/CloudinaryConfig.js");

const AdminAddItem = async (req, res) => {
    try {
        const { itemName, itemCategory, itemPrice, itemDescription, itemType } = req.body;
        const price = parseFloat(itemPrice);

        const { path } = req.file;
        const uploadResult = await Cloudinary.uploader.upload(path);
        const imageURL = uploadResult.secure_url;

        const body = { itemName, itemCategory, itemPrice: price, itemDescription, itemType, itemImage: imageURL };
        const response = AddNewItemSchema.safeParse(body);
        if (!response.success) {
            return res.status(400).send({ error: response.error.issues });
        }
        const newItem = new FoodModel(body);
        await newItem.save();
        res.send("Item added successfully");
    } catch (error) {
        console.error('Error adding item:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
};

module.exports = AdminAddItem;
