const foodModel = require('../models/foodModel.js');

const userGetItems = async (req, res) => {
    try {
        const allItems = await foodModel.find();
        res.status(200).send(allItems);
    } catch (err) {
        console.error('Error fetching items:', err);
        res.status(500).send({ msg: "Internal server error." });
    }
};

module.exports = userGetItems; 
