import React from 'react'
import { useParams } from 'react-router-dom'


function Doctors() {
  const {speciality} = useParams();

  return (
    <div  className='text-9xl text-center  items-center justify-center flex w-full pt-52 mt-auto'>
      <h1 className='  '>{speciality} Doctor</h1>
    </div>
  )
}

export default Doctors