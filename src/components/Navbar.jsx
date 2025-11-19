import { faAngleDown, faArrowDownShortWide, faBars, faHouseMedical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import NavbarUser from '../assets/Testimonial-person-1.webp'



function Navbar() {
  const navigate = useNavigate();
  const [showMenu,setShowMenu] = useState(false)
const [token, setToken] = useState(true)
const [menu,setMenu] = useState(false)




  return (
    <div className="flex items-center justify-between  py-4 mb-5 border-b border-b-blue-500 ">
<NavLink to="/">
      <div className="flex gap-2 cursor-pointer">

        <FontAwesomeIcon icon={faHouseMedical
        } className="mt-3 bg-blue-500 p-2 rounded text-white" />
        <h1 className="italic text-2xl font-bold mt-3">Lifeline</h1>
      </div></NavLink>





      <ul className="flex-row gap-9 text-1xl font-medium lg:flex  hidden" >

        <NavLink to="/">
          <li  py-1>Home</li>
          <hr className="border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li py-1>Doctors</li>
          <hr className="border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/appointment">
          <li py-1>Appointment</li>
          <hr className="border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li py-1>About</li>
          <hr className="border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden" />
        </NavLink>
        
        <NavLink to="/contact">
          <li py-1>Contact</li>
          <hr className="border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden"  />
        </NavLink>

      </ul>
<div className='flex items-center gap-4'>
  {
    token?
    <div className="flex items-center gap-2 cursor-pointer group relative">
      <img className="w-10 rounded-full" src={NavbarUser} alt="" />
       <FontAwesomeIcon icon={faAngleDown
        } className="mt-3 " />
        <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
          <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 ">
            <p onClick={()=>navigate('my-profile')} className="hover:text-black cursor-pointer">My Profile</p>
           
           
            <p  onClick={() => {
    setToken(false)
   
  }} className="hover:text-black cursor-pointer">Logout</p>




          </div>
          
        </div>
    </div>:
     <button onClick={()=>navigate('./login')} className="bg-blue-500 p-3 rounded-3xl  text-[#fff] hover:bg-blue-700">Create Account</button>
  }
 <span onClick={() => setMenu(true)}>
 <FontAwesomeIcon icon={faBars 
        } className="mt-3 block sm:flex  lg:hidden" />
        </span>
 



 {/* -------Mobile sidebar menu-------- */}
        {menu ? 
          
          <div className="fixed top-0 bottom-0 left-0 w-[100vw] h-[100vh] bg-white shadow shadow-black/100 bg-opacity-100 z-50 flex flex-col text-center">
         <ul className=" flex flex-col  gap-9  font-medium mt-36 text-3xl" onClick={() => setMenu(false)} >
 <span onClick={() => setMenu(false)}>
 <FontAwesomeIcon icon={faBars 
        }  />
        </span>
        <NavLink to="/">
          <li  py-1>Home</li>
          <hr className="border-none outline-none h-0.5 bg-blue-500 w-8 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li py-1>Doctors</li>
          <hr className="border-none outline-none h-0.5 bg-blue-500 w-8 m-auto hidden" />
        </NavLink>
        <NavLink to="/appointment">
          <li py-1>Appointment</li>
           <hr className="border-none outline-none h-0.5 bg-blue-500 w-8 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li py-1>About</li>
           <hr className="border-none outline-none h-0.5 bg-blue-500 w-8 m-auto hidden" />
        </NavLink>
        
        <NavLink to="/contact">
          <li py-1>Contact</li>
          <hr className="border-none outline-none h-0.5 bg-blue-500 w-8 m-auto hidden" />
        </NavLink>

      </ul>
      </div>
      : null}

      {/* -------Mobile sidebar menu end-------- */}
</div>

     


    </div>
  );
}

export default Navbar;
