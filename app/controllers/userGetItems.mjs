import FoodModel from '../models/foodModel.mjs';

const userGetItems = async (req, res) => {
    try {
        const allItems = await FoodModel.find();
        res.status(200).send(allItems);
    } catch (err) {
        console.error('Error fetching items:', err);
        res.status(500).send({ msg: "Internal server error." });
    }
};

export default userGetItems;
