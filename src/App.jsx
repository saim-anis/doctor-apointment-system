
import { Routes, Route, Link, useParams } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Doctors from "./Pages/Doctors";
import Login from "./Pages/Login";
import MyProfile from "./Pages/MyProfile";
import Appointments from "./Pages/Appointments";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Banner from "./components/Banner";
import Footer from "./components/Footer";


function App() {
 
  return (
   <div className="mx-4 sm:mx-[10%]">
  <Navbar />
  
  <Routes>
    
    <Route path="/" element={<Home/>} />
    <Route path="/about" element={<About/>} />
    <Route path="/contact" element={<Contact/>} />
    <Route path="/doctors/:speciality" element={<Doctors/>} />
    <Route path="/login" element={<Login/>} />
    {/* <Route path="/my-appointments" element={<MyAppointments/>} /> */}
    <Route path="/appointments/docId" element={<Appointments/>} />
    <Route path="/my-profile" element={<MyProfile/>} />
    
  </Routes>
  <Footer/>
   </div>
  );
}

export default App;
