const mongoose = require("mongoose");

const connectDB = async () => {
  return mongoose.connect("mongodb+srv://user:root1234@cluster0.oqq1mdt.mongodb.net/LIBRARY?retryWrites=true&w=majority&appName=Cluster0")
}

module.exports = connectDB;
