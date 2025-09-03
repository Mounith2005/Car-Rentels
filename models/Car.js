const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  name: String,
  rent: String,
  topSpeed: String,
  mileage: String,
  seater: String,
  image: String,
});

module.exports = mongoose.model("Car", carSchema);
