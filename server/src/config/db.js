const { DB_NAME } = require("./constants");
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log("Successfully connected to Database");
  } catch (error) {
    console.log("Error occured while connecting to Database");
  }
};

module.exports = connectDB;
