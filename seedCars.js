const mongoose = require("mongoose");
const Car = require("./models/Car");

mongoose.connect("mongodb://127.0.0.1:27017/car_rental");

const cars = [
  {name:"Alto K10", rent:"₹700/day", topSpeed:"150 km/h", mileage:"24 km/l", seater:"5 Seater", image:"/image/alto-k10-exterior-right-front-three-quarter-62.avif"},
  {name:"Baleno", rent:"₹800/day", topSpeed:"140 km/h", mileage:"23 km/l", seater:"5 Seater", image:"/image/baleno-exterior-right-front-three-quarter-71.avif"},
  {name:"Thar", rent:"₹1000/day", topSpeed:"120 km/h", mileage:"13 km/l", seater:"5 Seater", image:"/image/thar-exterior-right-front-three-quarter-37.avif"},
  {name:"Sonet", rent:"₹800/day", topSpeed:"120 km/h", mileage:"21 km/l", seater:"5 Seater", image:"/image/sonet-exterior-right-front-three-quarter-11.avif"},
  {name:"Scorpio N", rent:"₹1100/day", topSpeed:"150 km/h", mileage:"15 km/l", seater:"7 Seater", image:"/image/scorpio-n-exterior-right-front-three-quarter-77.avif"},
  {name:"Innova Crysta", rent:"₹1300/day", topSpeed:"160 km/h", mileage:"12 km/l", seater:"7 Seater", image:"/image/innova-crysta-exterior-right-front-three-quarter-2.avif"},
  {name:"Ertiga", rent:"₹950/day", topSpeed:"155 km/h", mileage:"19 km/l", seater:"7 Seater", image:"/image/ertiga-exterior-right-front-three-quarter-5.avif"},
  {name:"Dzire", rent:"₹750/day", topSpeed:"145 km/h", mileage:"22 km/l", seater:"5 Seater", image:"/image/dzire-exterior-right-front-three-quarter-27.avif"},
  {name:"Creta", rent:"₹1000/day", topSpeed:"165 km/h", mileage:"17 km/l", seater:"5 Seater", image:"/image/creta-exterior-right-front-three-quarter-5.avif"},
  {name:"Venue", rent:"₹850/day", topSpeed:"160 km/h", mileage:"18 km/l", seater:"5 Seater", image:"/image/venue-exterior-right-front-three-quarter-16.avif"},
  {name:"Seltos", rent:"₹950/day", topSpeed:"170 km/h", mileage:"16 km/l", seater:"5 Seater", image:"/image/seltos-exterior-right-front-three-quarter-3.avif"},
  {name:"Carens", rent:"₹1150/day", topSpeed:"165 km/h", mileage:"15 km/l", seater:"7 Seater", image:"/image/carens-exterior-right-front-three-quarter-6.avif"},
  {name:"XUV700", rent:"₹1400/day", topSpeed:"180 km/h", mileage:"14 km/l", seater:"7 Seater", image:"/image/xuv700-exterior-right-front-three-quarter-4.avif"},
  {name:"Safari", rent:"₹1200/day", topSpeed:"165 km/h", mileage:"14 km/l", seater:"7 Seater", image:"/image/safari-facelift-exterior-right-front-three-quarter-39.avif"},
  {name:"Harrier", rent:"₹1100/day", topSpeed:"170 km/h", mileage:"15 km/l", seater:"5 Seater", image:"/image/harrier-exterior-right-front-three-quarter-6.avif"},
  {name:"Triber", rent:"₹750/day", topSpeed:"150 km/h", mileage:"20 km/l", seater:"7 Seater", image:"/image/triber-exterior-right-front-three-quarter-10.avif"},
  {name:"Kwid", rent:"₹600/day", topSpeed:"130 km/h", mileage:"22 km/l", seater:"5 Seater", image:"/image/kwid-exterior-right-front-three-quarter-37.webp"},
  {name:"City", rent:"₹950/day", topSpeed:"170 km/h", mileage:"18 km/l", seater:"5 Seater", image:"/image/city-exterior-right-front-three-quarter-78.webp"},
  {name:"Amaze", rent:"₹800/day", topSpeed:"160 km/h", mileage:"19 km/l", seater:"5 Seater", image:"/image/amaze-exterior-right-front-three-quarter-4.webp"},
  {name:"Fortuner", rent:"₹1800/day", topSpeed:"190 km/h", mileage:"12 km/l", seater:"7 Seater", image:"/image/fortuner-exterior-right-front-three-quarter-21.avif"},
  {name:"Ciaz", rent:"₹850/day", topSpeed:"165 km/h", mileage:"20 km/l", seater:"5 Seater", image:"/image/ciaz-exterior-right-front-three-quarter-3.avif"},
  {name:"i20", rent:"₹800/day", topSpeed:"160 km/h", mileage:"21 km/l", seater:"5 Seater", image:"/image/i20-exterior-right-front-three-quarter-7.avif"}
];

const seed = async () => {
  try {
    await Car.deleteMany({});
    await Car.insertMany(cars);
    console.log("✅ Cars seeded successfully!");
  } catch (err) {
    console.error("❌ Error seeding cars:", err);
  } finally {
    mongoose.connection.close();
  }
};

seed();
