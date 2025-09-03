const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


// Models
const Car = require("./models/Car");
const Booking = require("./models/Booking");

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/cars", require("./routes/cars"));
app.use("/api/bookings", require("./routes/bookings"));

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/car_rental", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  fullName: String,
  username: String,
  email: { type: String, unique: true },
  phone: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

// Configure SendGrid


// Signup
app.post("/signup", async (req, res) => {
  try {
    const { fullName, username, email, phone, password } = req.body;
    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: "User already exists" });

    const user = new User({ fullName, username, email, phone, password });
    await user.save();
    res.json({ message: "Signup successful!" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.password !== password)
      return res.status(400).json({ message: "Invalid password" });

    // Send login email
    const msg = {
      to: user.email,
      from: "mounithd.23it@kongu.edu",
      subject: "Login Notification",
      text: `Hello ${user.username},\n\nYou logged in successfully on ${new Date().toLocaleString()}.`,
    };

    sgMail.send(msg)
      .then(() => console.log("Login email sent"))
      .catch(err => console.error("SendGrid error:", err));

    res.json({ message: "Login successful!", username: user.username });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Start server
app.listen(5000, () => console.log("Server running on http://localhost:5000"));
