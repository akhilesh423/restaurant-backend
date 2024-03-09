import FoodModel from '../models/foodModel.mjs';

const adminGetItems = async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.page) || 1;
    const pageSize = 15;
    const skip = (pageNumber - 1) * pageSize;
    const allItems = await FoodModel.find().skip(skip).limit(pageSize);
    res.status(200).send(allItems);
  } catch (err) {
    console.error('Error fetching items:', err);
    res.status(500).send({ msg: "Internal server error." });
  }
};

export default adminGetItems;

