const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRoutes = require('./app/Routes/AdminRoutes');
const UserRoutes = require('./app/Routes/UserRoutes.js');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello Bliss');
});

app.use('/admin', adminRoutes);
app.use('/user', UserRoutes);

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
