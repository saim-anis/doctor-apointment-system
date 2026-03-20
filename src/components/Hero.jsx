import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCalendarCheck, faUserDoctor } from '@fortawesome/free-solid-svg-icons';
import HeroImage from "../assets/Hero-image.avif";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative flex flex-col lg:flex-row  py-12 bg-white overflow-hidden">
      
      {/* LEFT CONTENT */}
      <div className="mr-3 flex-1 space-y-6 text-center lg:text-start z-10">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-blue-500">
          Your Health,
          <span className="block text-gray-900">Our Priority</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0">
          Experience world-class healthcare with expert doctors. Book your appointment today and take the first step towards better health.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
          <button
            onClick={() => navigate('/doctors/general')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-semibold text-lg shadow-md transition flex items-center gap-2 group"
          >
            <FontAwesomeIcon icon={faCalendarCheck} />
            Book Appointment
            <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition" />
          </button>

          <button
            onClick={() => navigate('/doctors')}
            className="bg-white hover:bg-gray-50 text-blue-500 border-2 border-blue-500 px-6 py-3 rounded-full font-semibold text-lg transition flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faUserDoctor} />
            Find Doctors
          </button>
        </div>

        {/* Stats */}
        <div className="flex gap-8 justify-center lg:justify-start pt-6">
          <StatBox count="500+" label="Expert Doctors" />
          <StatBox count="50K+" label="Happy Patients" />
          <StatBox count="24/7" label="Support Available" />
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="flex-1 flex justify-center relative mt-10 lg:mt-0">
        <div className="w-full max-w-md lg:max-w-lg h-[500px] rounded-2xl overflow-hidden shadow-lg">
          <img
            src={HeroImage}
            alt="Healthcare professionals"
            className="w-full h-full object-cover hover:scale-125 transition-all duration-500 ease-in hover:rotate-3"
          />
        </div>

        {/* Floating Card */}
        <div className="absolute bottom-[-20px] left-[-10px] bg-white rounded-xl shadow-lg p-4 flex items-center gap-3">
          <div className="bg-blue-100 p-3 rounded-full">
            <FontAwesomeIcon icon={faUserDoctor} className="text-blue-500 text-xl" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">Expert Care</p>
            <p className="text-sm text-gray-600">Certified Professionals</p>
          </div>
        </div>
      </div>

      {/* Background Blurs */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100/30 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl -z-10"></div>
     
    </section>
  );
}

const StatBox = ({ count, label }) => (
  <div>
    <p className="text-3xl font-bold text-blue-500">{count}</p>
    <p className="text-gray-600">{label}</p>
  </div>
);

export default Hero;
