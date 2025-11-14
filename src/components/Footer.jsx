import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseMedical } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
    <div >
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm mt-40'>


      {/* ------left side---- */}
      <div >   
        <span className='flex gap-4 pb-2'>
<FontAwesomeIcon icon={faHouseMedical
        } className=" bg-blue-500 p-2 rounded text-white " />
        <h1 className="italic text-2xl font-bold ">Lifeline</h1>
</span>
        <p className='w-full md:w-2/3 text-gray-600 leading-6'>We care about you and your family health every step of the way.
Our doctors and staff work together to offer the best possible medical support.
Visit us today and experience healthcare that truly cares.</p>
      </div>
      {/* ------center side---- */}
      <div>
        <p className='text-xl font-medium mb-5'>COMPANY</p>
        <ul className='flex flex-col gap-2 text-gray-600'>
          <li className='hover:translate-x-2 transition-all duration-500 cursor-pointer'>Home</li>
          <li className='hover:translate-x-2 transition-all duration-500 cursor-pointer'>About</li>
          <li className='hover:translate-x-2 transition-all duration-500 cursor-pointer'>Contact us</li>
          <li className='hover:translate-x-2 transition-all duration-500 cursor-pointer'>Privacy Policy</li>
        </ul>
      </div>
{/* -----right side----- */}

<div>
  <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
  <ul className='flex flex-col gap-2 text-gray-600 '>
    <li>+92 3323543871</li>
    <li >Lifelinecare@gmail.com</li>
  </ul>
</div>






</div>

<div >
  <hr className='border-blue-400' />
  <p className='text-sm text-gray-600 text-center py-5 font-bold'>Copyright {new Date().getFullYear()}@ Lifeline - All Right Reserved</p>
</div>

    </div>
  )
}

export default Footer