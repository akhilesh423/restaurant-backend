import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userGetItems from './app/controllers/userGetItems.mjs';
import dotenv from 'dotenv';
import multer from 'multer';
import adminSignup from './app/controllers/adminSignup.mjs';
import adminLogin from './app/controllers/adminLogin.mjs'
import adminAddItem from './app/controllers/adminAddItem.mjs';
import adminGetItems from './app/controllers/adminGetItems.mjs';
import adminMiddleware from './app/middlewares/adminMiddleware.mjs';
import userPlacedOrders from "./app/controllers/userPlacedOrders.mjs"
import adminDeleteItem from './app/controllers/adminDeleteItem.mjs';
import adminUpdateItem from './app/controllers/adminUpdateItem.mjs';
dotenv.config();

const upload = multer({ dest: "uploads/" });



const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }))



app.get('/', (req, res) => {
  res.send('Hello Bliss');
});


app.get('/user/items', (req, res) => {
  userGetItems(req, res)
});

app.post('/user/placedOrders', (req, res) => {
  userPlacedOrders(req, res)
})

app.post('/admin/signup', (req, res) => {
  adminSignup(req, res)
});

app.post('/admin/signin', (req, res) => {
  adminLogin(req, res)
});

app.post('/admin/additem', adminMiddleware, upload.single("itemImage"), adminAddItem);
app.get('/admin/getItems', adminMiddleware, adminGetItems)
app.delete('/admin/deleteItem/:id', adminMiddleware, adminDeleteItem);
app.put("/admin/updateItem/:id", adminMiddleware, adminUpdateItem)



mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });
