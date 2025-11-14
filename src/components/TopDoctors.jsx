import React from "react";
import { doctorsData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import Appointments from "../Pages/Appointments";

function TopDoctors() {
  const navigate = useNavigate();

  return (
    <div className="justify-center items-center flex flex-col gap-4 my-16 text-gray-600 md:mx-10">
      <h1 className="text-4xl font-medium">Top Doctor to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Browse Simply through our experienced doctors.
      </p>

      <div className="grid grid-cols-auto w-full gap-4 gap-y-6 pt-5  px-3 sm:px-0">
        {doctorsData.slice(0, 10).map((item, index) => (
          <div onClick={() => navigate(`/appointments/${item.id}`)}
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
        ))}
      </div>

      <button onClick={()=> navigate('/doctors')}  className="text-gray-600 bg-blue-50 px-12 py-3 rounded-full cursor-pointer mt-10 mb-2">
        see more
      </button>
    </div>
  );
}

export default TopDoctors;
