const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRoutes = require('./app/routes/adminRoutes.js');
const userRoutes = require('./app/routes/userRoutes.js');
require('dotenv').config();



const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }))



app.get('/', (req, res) => {
  res.send('Hello Bliss');
});

app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

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
