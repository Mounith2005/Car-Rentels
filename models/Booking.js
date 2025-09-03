const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
    carName: { type: String, required: true },
    user: { type: String, required: true },
    userEmail: { type: String, required: true }, // ✅ store user email
    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
