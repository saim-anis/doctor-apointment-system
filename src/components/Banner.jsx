import React from 'react'
import BannerImg from "../assets/BannerImg.png";
import { useNavigate } from 'react-router-dom';

function Banner() {

  const navigate = useNavigate()
  return (
    <div className='flex bg-blue-500 rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 
    my-20 md:mx-10 border-2 border-blue-900'>
{/* -------left side----------- */}

<div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5' >
<div className='text-xl sm-text-2xl md-text-3xl lg:text-4xl font-semibold  text-white'>
<p>Book Appointment</p>
<p className='mt-4'>With No#1 Expert Doctors </p>

</div>
<button onClick={()=>navigate('/login')}  className='bg-white text-sm sm-text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all'>Create Account</button>
</div>




{/* ----Right side----------- */}
<div className='  md:block hidden md:w-1/2 lg:w-[320px] relative '>
    <img className='w-full absolute bottom-0 right-0 max-w-md ' src={BannerImg} alt="" />
</div>
    </div>
  )
}

export default Banner