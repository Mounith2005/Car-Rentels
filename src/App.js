import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Signup from "./signup";
import Home from "./home";
import Login from "./login";
import LoginHome from "./loginhome";
import Booking from "./booking";
import Contact from "./contact";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("username");
    if (savedUser) setUser(savedUser);
  }, []);

  const handleLogin = (username) => {
    setUser(username);
    localStorage.setItem("username", username);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("username");
  };

  return (
    <>
      {/* Navbar */}
      <nav
        className="navbar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 20px",
          background: "#333",
          color: "#fff",
        }}
      >
        <div className="logo">🚗 Car Rentals...</div>
        <ul
          className="nav-links"
          style={{ listStyle: "none", display: "flex", gap: "15px" }}
        >
          <li>
            <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
              Home
            </Link>
          </li>
          {!user && (
            <>
              <li>
                <Link to="/login" style={{ color: "#fff", textDecoration: "none" }}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" style={{ color: "#fff", textDecoration: "none" }}>
                  Signup
                </Link>
              </li>
            </>
          )}
          
          <li>
            <Link to="/contact" style={{ color: "#fff", textDecoration: "none" }}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      {/* Routes */}
      <Routes>
        <Route
          path="/"
          element={user ? <LoginHome username={user} onLogout={handleLogout} /> : <Home />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/loginhome" element={<LoginHome username={user} onLogout={handleLogout} />} />
        <Route path="/Booking" element={<Booking username={user} />} />

        <Route path="/contact" element={<Contact />} />
       
      </Routes>

      {/* Footer */}
      <footer
        style={{
          padding: "20px",
          textAlign: "center",
          background: "#333",
          color: "#fff",
        }}
      >
        <p>© {new Date().getFullYear()} Car Rentals. All rights reserved.</p>
        <div>
          <a href="/privacy" style={{ color: "#fff", margin: "0 10px" }}>
            Privacy
          </a>
          <a href="/terms" style={{ color: "#fff", margin: "0 10px" }}>
            Terms
          </a>
          <a href="/contact" style={{ color: "#fff", margin: "0 10px" }}>
            Contact
          </a>
        </div>
      </footer>
    </>
  );
}

export default App;
