
import { Routes, Route, Link, useParams } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Doctors from "./Pages/Doctors";
import MyProfile from "./Pages/MyProfile";
import Appointment from "./Pages/Appointment";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Banner from "./components/Banner";
import Footer from "./components/Footer";



// -----------firebase login check---------------
// import { useEffect, useState } from "react";
// import { auth } from "./firebase";
// import { onAuthStateChanged } from "firebase/auth";




// ----------end-------------








function App() {
 




  return (
   <div className="mx-4 sm:mx-[10%]">
  <Navbar />
  
  <Routes>
    
    <Route path="/" element={<Home/>} />
    <Route path="/about" element={<About/>} />
    <Route path="/contact" element={<Contact/>} />
    <Route path="/doctors/:speciality" element={<Doctors/>} />
    <Route path="/doctors" element={<Doctors/>} />
    {/* <Route path="/login" element={<Login/>} />
    <Route path="/signup" element={<Signup/>} /> */}
    <Route path="/appointment/:docId" element={<Appointment/>} />
    <Route path="/my-profile" element={<MyProfile/>} />
    {/* <Route path="/my-appointments" element={<MyAppointments/>} /> */}
    
  </Routes>
  <Footer/>
   </div>
  );
}

export default App;
