import React, { useState, useEffect } from "react";
import axios from "axios";

function Booking({ username }) { // email passed as prop
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [email, setEmail] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [message, setMessage] = useState("");

  // Fetch cars and bookings
  useEffect(() => {
    axios.get("http://localhost:5000/api/cars").then(res => setCars(res.data));
    axios.get("http://localhost:5000/api/bookings").then(res => setBookings(res.data));
  }, []);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!selectedCar || !fromDate || !toDate) {
      setMessage("Please select a car and dates");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/bookings", {
        carId: selectedCar._id,
        carName: selectedCar.name,
        user: username,
        userEmail: email, // send email to backend
        fromDate,
        toDate,
      });
      setMessage(res.data.message);
      setSelectedCar(null);
      setFromDate("");
      setToDate("");

      // Refresh bookings
      const bookingsRes = await axios.get("http://localhost:5000/api/bookings");
      setBookings(bookingsRes.data);
    } catch (err) {
      setMessage(err.response?.data?.message || "Booking failed");
    }
  };

  const handleCancel = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/bookings/${id}`);
      setMessage(res.data.message);

      const bookingsRes = await axios.get("http://localhost:5000/api/bookings");
      setBookings(bookingsRes.data);
    } catch (err) {
      setMessage("Failed to cancel booking");
    }
  };

  const isBooked = (car) => {
    const today = new Date();
    return bookings.find(
      (b) => b.carId === car._id && new Date(b.toDate) >= today
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Book a Car</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginBottom: "20px" }}>
        {cars.map((car) => {
          const booked = isBooked(car);
          return (
            <div
              key={car._id}
              style={{
                border: selectedCar?._id === car._id ? "3px solid green" : "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                width: "200px",
                cursor: booked ? "not-allowed" : "pointer",
                opacity: booked ? 0.5 : 1,
              }}
              onClick={() => !booked && setSelectedCar(car)}
            >
              <img src={car.image} alt={car.name} style={{ width: "100%", borderRadius: "5px" }} />
              <h4>{car.name}</h4>
              <p>{car.seater} | {car.rent}</p>
              <p>Top Speed: {car.topSpeed}</p>
              <p>Mileage: {car.mileage}</p>
              {booked ? (
                <p>Booked from {new Date(booked.fromDate).toLocaleDateString()} to {new Date(booked.toDate).toLocaleDateString()}</p>
              ) : (
                <p>Available</p>
              )}
            </div>
          );
        })}
      </div>

      {selectedCar && (
        <form onSubmit={handleBooking} style={styles.form}>
          <h3 style={styles.heading}>Booking: {selectedCar.name}</h3>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email: </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>From Date: </label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>To Date: </label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Confirm Booking</button>
        </form>
      )}

      <h3>Your Bookings</h3>
      <ul>
        {bookings.filter(b => b.user === username).map(b => (
          <li key={b._id}>
            {b.carName} from {new Date(b.fromDate).toLocaleDateString()} to {new Date(b.toDate).toLocaleDateString()}
            <button onClick={() => handleCancel(b._id)}>Cancel</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  form: {
    maxWidth: "400px",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    backgroundColor: "#f9f9f9",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  formGroup: {
    marginBottom: "15px",
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#555",
  },
  input: {
    padding: "8px 10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
};


export default Booking;
