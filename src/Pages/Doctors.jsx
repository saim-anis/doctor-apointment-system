import React, { useContext, useState , useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'


function Doctors() {
  
  const { doctorsData} = useContext(AppContext)
  const {speciality} = useParams();
const [filterDoc,setFilter]= useState([doctorsData])
const navigate = useNavigate();

const applyFilter = () => {
  if (speciality) {
    setFilter(
      doctorsData.filter(doc =>
        doc.speciality.toLowerCase().replaceAll(" ", "-") === speciality.toLowerCase()
      )
    );
  } else {
    setFilter(doctorsData);
  }
};
useEffect(() => {
 applyFilter()

}, [doctorsData,speciality])
 
  return (
  <div className='flex flex-row gap-7 '>
   <div className='flex flex-col '>
<p className='text-sm '>Browse through your required doctor</p>
<div className='flex flex-col sm:flex-col items-start gap-5 mt-5 text-start '>
  <div className='flex flex-col gap-4 text-sm text-gray-600  '>
  <p className='cursor-pointer' onClick={() => navigate("/doctors/general-physician")}>General Physician</p>
  <p className='cursor-pointer' onClick={() => navigate("/doctors/neurologist")}>Neurologist</p>
  <p className='cursor-pointer' onClick={() => navigate("/doctors/cardiologist")}>Cardiologist</p>
  <p className='cursor-pointer' onClick={() => navigate("/doctors/gasterologist")}>Gasterologist</p>
  <p className='cursor-pointer' onClick={() => navigate("/doctors/orthopedic")}>Orthopedic</p>
  <p className='cursor-pointer' onClick={() => navigate("/doctors/gynaecologist")}>Gynaecologist</p>
   <p className='cursor-pointer font-bold' onClick={() => navigate("/doctors")}>All Doctors</p>
  </div>
  </div>
</div>
<div className='w-full grid grid-cols-auto gap-4 gap-y-6 '>
  {
    filterDoc.map((item, index) => (
          <div onClick={() => navigate(`/appointment/${item.id}`)}
            className=" bg-blue-50 border border-blue-200 rounded-xl cursor-pointer hover:rotate-1 transition-all duration-400 shadow-blue-900"
            key={index}
          >
            <img
              src={item.image}
              alt=""
              className="bg-blue-500 rounded-tl-xl rounded-tr-xl  z-[1] w-full"/>
            <div className="py-4 px-3">
              <p className="text-gray-900 font-medium text-lg">{item.name}</p>
              <p className="text-gray-600  text-sm">{item.speciality}</p>
            </div>
          </div>
    ))
  }
</div>

  </div>
  )
}

export default Doctors

