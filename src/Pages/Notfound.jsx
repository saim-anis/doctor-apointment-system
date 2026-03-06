import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseMedical, faArrowLeft, faHome,
  faUserDoctor, faCalendarCheck, faPhone
} from "@fortawesome/free-solid-svg-icons";

const quickLinks = [
  { icon: faHome,          label: "Home",            path: "/"           },
  { icon: faUserDoctor,    label: "Our Doctors",     path: "/doctors"    },
  { icon: faCalendarCheck, label: "Book Appointment",path: "/appointment"},
  { icon: faPhone,         label: "Contact Us",      path: "/contact"    },
];

export default function NotFound() {
  const navigate = useNavigate();
  const [count, setCount] = useState(10);

  // Auto redirect countdown
  useEffect(() => {
    if (count === 0) { navigate("/"); return; }
    const t = setTimeout(() => setCount(count - 1), 1000);
    return () => clearTimeout(t);
  }, [count, navigate]);

  return (
    <div className="font-sans min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex flex-col items-center justify-center px-6 py-16 text-center relative overflow-hidden">

      {/* Background blobs */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-60 pointer-events-none" />


      {/* 404 Big Text */}
      <div className="relative mb-6" style={{ animation: "fadeUp 0.6s ease 0.1s both" }}>
        <div className="text-[140px] md:text-[200px] font-extrabold leading-none select-none"
          style={{ WebkitTextStroke: "3px #dbeafe", color: "transparent" }}>
          404
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl"
            style={{ animation: "pulse 2s ease-in-out infinite" }}>
            <FontAwesomeIcon icon={faHouseMedical} className="text-white text-3xl" />
          </div>
        </div>
      </div>

      {/* Message */}
      <div style={{ animation: "fadeUp 0.6s ease 0.2s both" }}>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
          Page Not Found
        </h1>
        <p className="text-gray-500 text-base max-w-md mx-auto leading-relaxed mb-2">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <p className="text-sm text-blue-500 font-semibold mb-8">
          Redirecting to home in <span className="font-extrabold text-blue-700">{count}s</span>
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mb-14"
        style={{ animation: "fadeUp 0.6s ease 0.3s both" }}>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-6 py-3 rounded-xl transition duration-200 text-sm">
          <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
          Go Back
        </button>
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition duration-200 text-sm shadow-lg">
          <FontAwesomeIcon icon={faHome} className="text-xs" />
          Back to Home
        </button>
      </div>

      {/* Quick Links */}
      <div style={{ animation: "fadeUp 0.6s ease 0.4s both" }}>
        <p className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-4">
          Or visit one of these pages
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto">
          {quickLinks.map((link, i) => (
            <button
              key={i}
              onClick={() => navigate(link.path)}
              className="flex flex-col items-center gap-2 bg-white border-2 border-gray-100 hover:border-blue-300 hover:shadow-md rounded-2xl p-4 transition duration-200 group"
            >
              <div className="w-9 h-9 bg-blue-50 group-hover:bg-blue-600 rounded-xl flex items-center justify-center transition duration-200">
                <FontAwesomeIcon icon={link.icon} className="text-blue-600 group-hover:text-white text-sm transition duration-200" />
              </div>
              <span className="text-xs font-bold text-gray-600 group-hover:text-blue-600 transition duration-200">{link.label}</span>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeDown { from { opacity:0; transform:translateY(-16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeUp   { from { opacity:0; transform:translateY(20px);  } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse    { 0%,100% { transform:scale(1); box-shadow: 0 0 0 0 rgba(37,99,235,0.3); } 50% { transform:scale(1.08); box-shadow: 0 0 0 14px rgba(37,99,235,0); } }
      `}</style>
    </div>
  );
}