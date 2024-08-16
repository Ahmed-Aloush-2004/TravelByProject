const mongoose = require("mongoose")
const dotenv = require("dotenv")
const path = require("path")



const connectToDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    const connect = await mongoose.connect("mongodb+srv://ahmed:1234@mydatabase.oo3bi.mongodb.net/travelbay");

    console.log(`MongoDB Connected: ${connect.connection.host}`);
  } catch (error) {
    console.log(`Error:${error.message}`);
  }
};
module.exports= connectToDB;
