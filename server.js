const express = require('express');
const app = express();
const zod = require('zod');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const mongoose = require('mongoose');
const AdminMiddleware = require('./app/Middlewares/AdminMiddleware');
const Order = require('./app/Models/oderModel');

const Room = require('../models/Room');

const port = 4000;
app.use(express.json());
app.use(cors());

const AdminSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(5),
  name: zod.string(),
});

const AdminSigninSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(5),
});

const AddNewItemSchema = zod.object({
  price: zod.number().positive(),
  itemPrice: zod.string(),
  itemType: zod.string(),
  itemCategory: zod.string(),
});

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
});

const UserModel = mongoose.model('User', UserSchema);

const FooditemsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String },
    price: { type: Number },
    itemType: { type: String },
  },
  { timestamps: true }
);

const Food = mongoose.model('FoodItems', FoodItemsSchema);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

mongoose
  .connect(
    'mongodb+srv://akhil23:akhil00$%40@cluster0.6ft1lt8.mongodb.net/blingandbliss',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/addnewitem', AdminMiddleware, async (req, res) => {
  const newItemBody = req.body;
  console.log(newItemBody);
});

app.post('/signin', async (req, res) => {
  const userBody = req.body;
  const response = AdminSigninSchema.safeParse(userBody);
  if (response.success) {
    try {
      const user = await UserModel.findOne({ email: userBody.email });
      if (!user) {
        return res.status(401).send({ msg: 'Invalid email or password' });
      }
      const passwordMatch = await bcrypt.compare(
        userBody.password,
        user.password
      );
      if (!passwordMatch) {
        return res.status(401).send({ msg: 'Invalid email or password' });
      }
      const token = jwt.sign({ email: user.email }, 'admin_dashboard_bling');
      res.send({ token });
    } catch (error) {
      console.error('Error signing in:', error);
      res.status(500).send({ msg: 'Error signing in' });
    }
  } else {
    res.status(401).send({ msg: 'Validation error' });
  }
});

app.post('/signup', async (req, res) => {
  const userBody = req.body;
  const response = AdminSchema.safeParse(userBody);
  console.log(response);
  if (response.success) {
    try {
      const existingUser = await UserModel.findOne({ email: userBody.email });
      if (existingUser) {
        return res
          .status(400)
          .send({ msg: 'User with this email already exists' });
      }

      const hashedPassword = await bcrypt.hash(userBody.password, 10);

      const newUser = new UserModel({
        email: userBody.email,
        password: hashedPassword,
        name: userBody.name,
      });

      await newUser.save();
      const token = jwt.sign(
        { email: userBody.email },
        'admin_dashboard_bling'
      );
      res.send({ token });
    } catch (error) {
      console.error('Error saving user:', error);
      res.status(500).send({ msg: 'Error saving user' });
    }
  } else {
    res.status(401).send({ msg: response.error.issues });
  }
});

////////super_admin routes
//get all fooditems // done with user use that part
//edit foodItems
//delete fooditems
//add categories in food
//edit categories  in food
//del catgo // no needed if cat needed to update it can be done if it need to delete whole food Item need to to deleted
//get orderItems
//del order
//add rooms
//update rooms
// del rooms

// Edit a food item
// Edit a category in food

app.put('/foodItems/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    // const { name, category, image, price, itemType } = req.body;
    const check = await Food.findById(id);
    if (!check) {
      res.status(401).json({ error: 'Food with this Id not found!' });
      return;
    }

    // {
    //   updated: 'field';
    // }
    //added body because super_admin can only update one part
    const updatedFoodItem = await Food.findByIdAndUpdate(id, body, {
      new: true,
    });

    res.status(200).json(updatedFoodItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get order items
//middelware need to be added
app.get('/orderItems', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ allOrders: orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an order
app.delete('/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const check = await Order.findById(id);
    if (!check) {
      res.status(401).json({ error: 'Order with this Id not found!' });
      return;
    }

    // we can add second validation while deleting
    await Order.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a room
app.post('/rooms', async (req, res) => {
  try {
    const { name, RoomNumber } = req.body;
    const room = await Room.create({ name, RoomNumber });
    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a room
app.put('/rooms/:id', async (req, res) => {
  try {
    const { id } = req.params;
    //const { name, RoomNumber } = req.body;
    const body = req.body;
    const check = await Room.findById(id);
    if (!check) {
      res.status(401).json({ error: 'Room with this Id not found!' });
      return;
    }
    const updatedRoom = await Room.findByIdAndUpdate(id, body, { new: true });
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a room
app.delete('/rooms/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const check = await Room.findById(id);
    if (!check) {
      res.status(401).json({ error: 'Room with this Id not found!' });
      return;
    }
    await Room.findByIdAndDelete(id);
    res.status(204).josn({ mesg: 'deleted Room...' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///un_authorized routes all user routes / user can only acess
//get all food items
//no-middelware needed

app.get('/foodItems', async (req, res) => {
  try {
    const allFoodData = await Food.find({});

    res.status(200).json({ allFoodData });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// get foodItem by Id

app.get('/foodItem/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const check = await Food.findById(id);
    if (!check) {
      res.status(401).json({ error: 'Food with this Id not found!' });
      return;
    }

    res.status(200).json(check);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//placing Order by user

app.post('/orderPlaced/', async (req, res) => {
  try {
    const { room, foodItems, totalPrice } = req.body;

    const createdOrder = await Order.create({
      room,
      foodItems,
      totalPrice,
    });
    res.status(201).json(createdOrder); //after checking this change it to mesg /order createed
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
