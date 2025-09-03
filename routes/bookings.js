const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Car = require("../models/Car");


// Configure SendGrid


router.post("/", async (req, res) => {
  try {
    const { carId, user, userEmail, fromDate, toDate } = req.body;

    const car = await Car.findById(carId);
    if (!car) return res.status(404).json({ message: "Car not found" });

    // Check overlapping bookings
    const existingBookings = await Booking.find({ carId });
    const overlap = existingBookings.some((b) => {
      const bookedFrom = new Date(b.fromDate);
      const bookedTo = new Date(b.toDate);
      return new Date(fromDate) <= bookedTo && new Date(toDate) >= bookedFrom;
    });

    if (overlap) return res.status(400).json({ message: "Car is already booked in this date range." });

    const booking = new Booking({
      carId,
      carName: car.name,
      user,
      userEmail, // store email
      fromDate,
      toDate,
    });

    await booking.save();

    // Send confirmation email
    const msg = {
      to: userEmail,
      from: "mounithd.23it@kongu.edu",
      subject: "Car Booking Confirmation",
      text: `Hello ${user},\n\nYou have successfully booked ${car.name} from ${new Date(fromDate).toLocaleDateString()} to ${new Date(toDate).toLocaleDateString()}.\n\nThank you!`,
    };

    sgMail.send(msg).catch(err => console.error("SendGrid error:", err));

    res.json({ message: "Booking saved successfully!", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    await Booking.findByIdAndDelete(req.params.id);

    // Send cancellation email
    const msg = {
      to: booking.userEmail, // ✅ use 'booking' not 'bookings'
      from: "mounithd.23it@kongu.edu",
      subject: "Car Booking Cancelled",
      text: `Hello ${booking.user},\n\nYour booking for ${booking.carName} from ${new Date(booking.fromDate).toLocaleDateString()} to ${new Date(booking.toDate).toLocaleDateString()} has been cancelled.\n\nThank you!`,
    };

    sgMail.send(msg).catch(err => console.error("SendGrid error:", err));

    res.json({ message: "Booking cancelled successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
