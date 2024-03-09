import FoodModel from '../models/foodModel.mjs';

const adminGetItems = async (req, res) => {
  try {
    // Get the page number from the query parameters
    const pageNumber = parseInt(req.query.page) || 1;
    const pageSize = 15; // Define the number of items per page

    // Calculate the skip value to determine the starting index of items to retrieve
    const skip = (pageNumber - 1) * pageSize;

    // Fetch items from the database with pagination
    const allItems = await FoodModel.find().skip(skip).limit(pageSize);

    // Send the paginated items back to the client
    res.status(200).send(allItems);
  } catch (err) {
    console.error('Error fetching items:', err);
    res.status(500).send({ msg: "Internal server error." });
  }
};

export default adminGetItems;

