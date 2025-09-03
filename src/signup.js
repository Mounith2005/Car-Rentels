import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 


function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/signup", formData);
      alert(res.data.message);
      navigate("/login");// Reset form
    } catch (err) {
      if (err.response && err.response.data) {
        alert(err.response.data.message);
      } else {
        alert("Server not responding or network error");
      }
    }
  };

  return (
    <div className="form-container" style={{ maxWidth: "400px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px" }}>
      <h2 style={{ textAlign: "center" }}>Signup</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} pattern="[0-9]{10}" title="Enter 10 digit phone number" required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit" style={{ padding: "10px", background: "#007bff", color: "#fff", border: "none", borderRadius: "5px" }}>Signup</button>
      </form>
    </div>
  );
}

export default Signup;
