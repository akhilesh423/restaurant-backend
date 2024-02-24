const FoodModel = require('../Models/FoodModel.js');

const UserGetItems = async (req, res) => {
    try {
        const allItems = await FoodModel.find();
        res.status(200).send(allItems);
    } catch (err) {
        console.error('Error fetching items:', err);
        res.status(500).send({ msg: "Internal server error." });
    }
};

module.exports = UserGetItems; 
