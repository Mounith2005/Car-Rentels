import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const vehicles = [
  {
    name: "Alto K10",
    Rent: "₹700/day",
    topSpeed: "150 km/h",
    mileage: "24 km/l",
    Seater: "5 Seater",
    image: "/image/alto-k10-exterior-right-front-three-quarter-62.avif",
  },
  {
    name: "Baleno",
    Rent: "₹800/day",
    topSpeed: "140 km/h",
    mileage: "23 km/l",
    Seater: "5 Seater",
    image: "/image/baleno-exterior-right-front-three-quarter-71.avif",
  },
  {
    name: "Thar",
    Rent: "₹1000/day",
    topSpeed: "120 km/h",
    mileage: "13 km/l",
    Seater: "5 Seater",
    image: "/image/thar-exterior-right-front-three-quarter-37.avif",
  },
  {
    name: "Sonet",
    Rent: "₹800/day",
    topSpeed: "120 km/h",
    mileage: "21 km/l",
    Seater: "5 Seater",
    image: "/image/sonet-exterior-right-front-three-quarter-11.avif",
  },
  {
    name: "Scorpio N",
    Rent: "₹1100/day",
    topSpeed: "150 km/h",
    mileage: "15 km/l",
    Seater: "7 Seater",
    image: "/image/scorpio-n-exterior-right-front-three-quarter-77.avif",
  },
  {
    name: "Innova Crysta",
    Rent: "₹1300/day",
    topSpeed: "160 km/h",
    mileage: "12 km/l",
    Seater: "7 Seater",
    image: "/image/innova-crysta-exterior-right-front-three-quarter-2.avif",
  },
  {
    name: "Ertiga",
    Rent: "₹950/day",
    topSpeed: "155 km/h",
    mileage: "19 km/l",
    Seater: "7 Seater",
    image: "/image/ertiga-exterior-right-front-three-quarter-5.avif",
  },
  {
    name: "Dzire",
    Rent: "₹750/day",
    topSpeed: "145 km/h",
    mileage: "22 km/l",
    Seater: "5 Seater",
    image: "/image/dzire-exterior-right-front-three-quarter-27.avif",
  },
  {
    name: "Creta",
    Rent: "₹1000/day",
    topSpeed: "165 km/h",
    mileage: "17 km/l",
    Seater: "5 Seater",
    image: "/image/creta-exterior-right-front-three-quarter-5.avif",
  },
  {
    name: "Venue",
    Rent: "₹850/day",
    topSpeed: "160 km/h",
    mileage: "18 km/l",
    Seater: "5 Seater",
    image: "/image/venue-exterior-right-front-three-quarter-16.avif",
  },
  {
    name: "Seltos",
    Rent: "₹950/day",
    topSpeed: "170 km/h",
    mileage: "16 km/l",
    Seater: "5 Seater",
    image: "/image/seltos-exterior-right-front-three-quarter-3.avif",
  },
  {
    name: "Carens",
    Rent: "₹1150/day",
    topSpeed: "165 km/h",
    mileage: "15 km/l",
    Seater: "7 Seater",
    image: "/image/carens-exterior-right-front-three-quarter-6.avif",
  },
  {
    name: "XUV700",
    Rent: "₹1400/day",
    topSpeed: "180 km/h",
    mileage: "14 km/l",
    Seater: "7 Seater",
    image: "/image/xuv700-exterior-right-front-three-quarter-4.avif",
  },
  {
    name: "Safari",
    Rent: "₹1200/day",
    topSpeed: "165 km/h",
    mileage: "14 km/l",
    Seater: "7 Seater",
    image: "/image/safari-facelift-exterior-right-front-three-quarter-39.avif",
  },
  {
    name: "Harrier",
    Rent: "₹1100/day",
    topSpeed: "170 km/h",
    mileage: "15 km/l",
    Seater: "5 Seater",
    image: "/image/harrier-exterior-right-front-three-quarter-6.avif",
  },
  {
    name: "Triber",
    Rent: "₹750/day",
    topSpeed: "150 km/h",
    mileage: "20 km/l",
    Seater: "7 Seater",
    image: "/image/triber-exterior-right-front-three-quarter-10.avif",
  },
  {
    name: "Kwid",
    Rent: "₹600/day",
    topSpeed: "130 km/h",
    mileage: "22 km/l",
    Seater: "5 Seater",
    image: "/image/kwid-exterior-right-front-three-quarter-37.webp",
  },
  {
    name: "City",
    Rent: "₹950/day",
    topSpeed: "170 km/h",
    mileage: "18 km/l",
    Seater: "5 Seater",
    image: "/image/city-exterior-right-front-three-quarter-78.webp",
  },
  {
    name: "Amaze",
    Rent: "₹800/day",
    topSpeed: "160 km/h",
    mileage: "19 km/l",
    Seater: "5 Seater",
    image: "/image/amaze-exterior-right-front-three-quarter-4.webp",
  },
  {
    name: "Fortuner",
    Rent: "₹1800/day",
    topSpeed: "190 km/h",
    mileage: "12 km/l",
    Seater: "7 Seater",
    image: "/image/fortuner-exterior-right-front-three-quarter-21.avif",
  },
  {
    name: "Ciaz",
    Rent: "₹850/day",
    topSpeed: "165 km/h",
    mileage: "20 km/l",
    Seater: "5 Seater",
    image: "/image/ciaz-exterior-right-front-three-quarter-3.avif",
  },
  {
    name: "i20",
    Rent: "₹800/day",
    topSpeed: "160 km/h",
    mileage: "21 km/l",
    Seater: "5 Seater",
    image: "/image/i20-exterior-right-front-three-quarter-7.avif",
  },
];

function LoginHome({ username, onLogout }) {
  const scrollRef = useRef();
  const navigate = useNavigate();

  const scroll = (scrollOffset) => {
    if (scrollRef.current) scrollRef.current.scrollLeft += scrollOffset;
  };

  const handleLogout = () => {
    if (onLogout) onLogout();
    navigate("/");
  };

  const handleBookNow = (vehicle) => {
    // Go to booking form with vehicle pre-selected
    navigate("/Booking", { state: { vehicle } });
  };

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2>Welcome, {username}!</h2>
        <button
          onClick={handleLogout}
          style={{
            padding: "8px 15px",
            background: "#f00",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      <div className="container">
        <h1>Popular Cars</h1>
        <div className="carousel-wrapper">
          <button className="arrow left" onClick={() => scroll(-300)}>
            ❮
          </button>
          <div className="carousel" ref={scrollRef}>
            {vehicles.map((v, i) => (
              <div className="card" key={i}>
                <div className="popular-badge">Popular</div>
                <img src={v.image} alt={v.name} />
                <h3>{v.name}</h3>
                <p className="price">
                  {v.Rent} <span>Onwards</span>
                </p>
                <div className="specs">
                  <div>
                    <strong>{v.topSpeed}</strong>
                    <span>Top Speed</span>
                  </div>
                  <div>
                    <strong>{v.mileage}</strong>
                    <span>Mileage</span>
                  </div>
                  <div>
                    <strong>{v.Seater}</strong>
                  </div>
                </div>
                <br />
                <button
                  className="btn"
                  onClick={() => handleBookNow(v)}
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
          <button className="arrow right" onClick={() => scroll(300)}>
            ❯
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginHome;
