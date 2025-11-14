import React from 'react'
import { specialityData } from '../assets/assets'
import { Link, useParams} from 'react-router-dom'

import '../index.css'




function SpecialityMenu() {
 
  const { speciality } = useParams(); // You can use this in a Doctors page later

  return (
    <div id='speciality' className='flex flex-col items-center gap-4 py-16 text-gray-800'>
      <h1 className='text-4xl font-medium'>Find by Speciality</h1>
       
      <p className='sm:w-1/3 text-center text-sm'>
        Simply browse through our extensive list of trusted doctors, schedule your appointments
      </p>

      <div className='flex sm:justify-center gap-4 overflow-scroll w-full pt-5'>
        {specialityData.map((item, index) => (
          <Link
            key={index}
            to={`/doctors/${item.speciality}`} // <-- use backticks if needed for complex paths
            className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-400'
          >
            <img src={item.image} alt={item.speciality} className='w-16 sm:w-24 mb-2' />
            <p>{item.speciality}</p>
           
          </Link>
          
        ))}
      </div>
    </div>
  )
}

export default SpecialityMenu
