const express = require("express");
const router = express.Router();
const Car = require("../models/Car");

// Get all cars
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch cars" });
  }
});

module.exports = router;
