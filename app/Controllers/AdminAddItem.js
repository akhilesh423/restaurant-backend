const FoodModel = require('../Models/FoodModel.js');
const { AddNewItemSchema } = require("../Validations/Validation.js");

const AdminAddItem = async (req, res) => {
    try {
        const { itemName, itemCategory, itemImage, itemPrice, itemDescription, itemType } = req.body;
        const body = req.body;
        const response = AddNewItemSchema.safeParse(body);
        if (!response.success) {
            return res.status(400).send({ error: response.error.issues });
        }
        const newItem = new FoodModel({
            itemName: itemName,
            itemCategory: itemCategory,
            itemImage: itemImage,
            itemPrice: itemPrice,
            itemDescription: itemDescription,
            itemType: itemType
        });
        await newItem.save();
        res.send("Item added successfully");
    } catch (error) {
        console.error('Error adding item:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
};

module.exports = AdminAddItem;
