const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRoutes = require('./Routes/AdminRoutes');
const UserRoutes = require('./Routes/UserRoutes.js')

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
  res.send('Hello Bliss');
});

app.use('/admin', adminRoutes);
app.use('/user', UserRoutes);

mongoose.connect(
  'mongodb+srv://akhil23:akhil00$%40@cluster0.6ft1lt8.mongodb.net/blingandbliss',
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
