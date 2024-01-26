const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const dbConnection = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "ROM",
    });
    console.log(
      `MongoDB Connection name ${db.connection.name}, Connected at ${db.connection.host}, Mongo_URI = ${process.env.MONGODB_URI}`
    );
  } catch (er) {
    console.log(
      `MongoDb Connection Error, Mongo_URI = ${process.env.MONGODB_URI}, Error = ${er.message}`
    );
  }
};