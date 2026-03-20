import { faAngleDown, faBars, faHouseMedical, faXmark, faFileCircleQuestion, faBlog, faStethoscope, faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import NavbarUser from '../assets/Testimonial-person-1.webp'
import { auth } from "../firebase";
import { logout } from '../auth'

function Navbar() {
  const navigate = useNavigate();
  const [token, setToken] = useState(true);
  const [menu, setMenu] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setPagesOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const pagesDropdown = [
    { icon: faBlog,                label: "Blog",     path: "/blog"     },
    { icon: faStethoscope,         label: "Services", path: "/services" },
    { icon: faFileCircleQuestion,  label: "404",      path: "/404"      },
    { icon: faMoneyBill,  label: "Pricing",      path: "/pricing"      }
  ];
  

  const navLinks = [
    { label: "Home",        path: "/"           },
    { label: "Doctors",     path: "/doctors"    },
    { label: "About",       path: "/about"      },
    { label: "Contact",     path: "/contact"    },
  ];

  return (
    <div className="flex items-center justify-between py-4 mb-5 border-b border-b-blue-500 relative z-50">

      {/* Logo */}
      <NavLink to="/">
        <div className="flex gap-2 cursor-pointer items-center">
          <FontAwesomeIcon icon={faHouseMedical} className="bg-blue-500 p-2 rounded text-white text-lg" />
          <h1 className="italic text-2xl font-bold">Lifeline</h1>
        </div>
      </NavLink>

      {/* Desktop Nav */}
      <ul className="flex-row gap-8 text-sm font-semibold lg:flex hidden items-center">
        {navLinks.map((link) => (
          <NavLink key={link.path} to={link.path}
            className={({ isActive }) => isActive ? "text-blue-600 border-b-2 border-blue-500 pb-0.5" : "text-gray-700 hover:text-blue-600 transition duration-200"}>
            <li>{link.label}</li>
          </NavLink>
        ))}

        {/* Pages Dropdown */}
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setPagesOpen(!pagesOpen)}
            className={`flex items-center gap-1.5 font-semibold transition duration-200 ${pagesOpen ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}
          >
            Pages
            <FontAwesomeIcon
              icon={faAngleDown}
              className={`text-xs transition-transform duration-300 ${pagesOpen ? "rotate-180" : "rotate-0"}`}
            />
          </button>

          {/* Dropdown Menu */}
          <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-44 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 ${pagesOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}>
            <div className="py-2">
              {pagesDropdown.map((item) => (
                <NavLink key={item.path} to={item.path} onClick={() => setPagesOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 text-sm font-semibold transition duration-150 ${isActive ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"}`
                  }>
                  <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon icon={item.icon} className="text-blue-600 text-xs" />
                  </div>
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </ul>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-9 h-9 rounded-full object-cover border-2 border-blue-200" src={NavbarUser} alt="" />
            <FontAwesomeIcon icon={faAngleDown} className="text-gray-500 text-xs" />
            <div className="absolute top-0 right-0 pt-12 z-20 hidden group-hover:block">
              <div className="min-w-44 bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col py-2">
                <p onClick={() => navigate('my-profile')}
                  className="px-4 py-2.5 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition duration-150 font-semibold">
                  My Profile
                </p>
                <hr className="border-gray-100 mx-3" />
                <p onClick={() => { logout(auth); setToken(false); navigate('/login'); }}
                  className="px-4 py-2.5 text-sm text-gray-600 hover:bg-red-50 hover:text-red-500 cursor-pointer transition duration-150 font-semibold">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button onClick={() => navigate('./signup')}
            className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold px-5 py-2.5 rounded-3xl transition duration-200">
            Create Account
          </button>
        )}

        {/* Mobile Hamburger */}
        <span onClick={() => setMenu(true)} className="lg:hidden cursor-pointer">
          <FontAwesomeIcon icon={faBars} className="text-gray-700 text-xl" />
        </span>
      </div>

      {/* Mobile Sidebar */}
      {menu && (
        <div className="fixed top-0 left-0 w-full h-full bg-white z-50 flex flex-col overflow-y-auto"
          style={{ animation: "slideIn 0.3s ease both" }}>

          {/* Mobile Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faHouseMedical} className="bg-blue-500 p-2 rounded text-white" />
              <h1 className="italic text-xl font-bold">Lifeline</h1>
            </div>
            <button onClick={() => setMenu(false)}
              className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition">
              <FontAwesomeIcon icon={faXmark} className="text-gray-600" />
            </button>
          </div>

          {/* Mobile Links */}
          <ul className="flex flex-col px-6 py-6 gap-1 text-base font-semibold">
            {navLinks.map((link, i) => (
              <NavLink key={link.path} to={link.path} onClick={() => setMenu(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition duration-150 ${isActive ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"}`
                }
                style={{ animationDelay: `${i * 0.05}s` }}>
                {link.label}
              </NavLink>
            ))}

            {/* Pages Section in Mobile */}
            <div className="mt-4">
              <div className="px-4 py-2 text-xs font-extrabold text-gray-400 uppercase tracking-widest">Pages</div>
              {pagesDropdown.map((item, i) => (
                <NavLink key={item.path} to={item.path} onClick={() => setMenu(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition duration-150 ${isActive ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"}`
                  }>
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon icon={item.icon} className="text-blue-600 text-xs" />
                  </div>
                  {item.label}
                </NavLink>
              ))}
            </div>
          </ul>
        </div>
      )}

      <style>{`
        @keyframes slideIn { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>
    </div>
  );
}

export default Navbar;