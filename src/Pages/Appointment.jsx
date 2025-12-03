import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import RelatedDoctors from "../components/RelatedDoctors";

function Appointment() {
  const { docId } = useParams();
  const { doctorsData } = useContext(AppContext);
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [docInfo, setDocInfo] = useState(null);
  const [docSlot, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");


  // -------- SLOT GENERATION 

  const getAvailableSlots = async () => {
    if (!docInfo) return;

    const slots = [];
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(today);
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      // ---- Time adjusting ----
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(
          currentDate.getMinutes() > 30 ? 30 : 0
        );
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      slots.push(timeSlots);
    }

    setDocSlots(slots);
  };

  // ---- Doctor data load ---

  useEffect(() => {
    if (!doctorsData) return;

    const info = doctorsData.find((doc) => doc.id === parseInt(docId));
    setDocInfo(info);
  }, [doctorsData, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  return (
    <div>
      {/* Doctor Section */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img
            className="bg-blue-600 w-full sm:max-w-72 rounded-lg"
            src={docInfo?.image}
            alt=""
          />
        </div>

        <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 mx-2 sm:mx-0 bg-white mt-[-80px] sm:mt-0">
          <p className="flex items-center gap-2 text-gray-900 text-2xl font-medium">
            {docInfo?.name}{" "}
            <FontAwesomeIcon icon={faCircleCheck} className="text-blue-800" />
          </p>

          <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
            <p>{docInfo?.degree}</p>
            <button className="text-xs rounded-full py-0.5 border px-2">
              {docInfo?.experience}
            </button>
          </div>

          <div>
            <p className="flex items-center gap-1 font-medium text-sm text-gray-900 mt-3">
              About <FontAwesomeIcon icon={faInfoCircle} />
            </p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1">
              {docInfo?.about}
            </p>
          </div>

          <p className="font-medium text-gray-500 mt-4">
            Appointment Fee: <span>{docInfo?.fees}</span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
        <p>Booking Slots</p>

        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
          {docSlot.length &&
            docSlot.map((item, index) => (
              <div onClick={() => setSlotIndex(index)} key={index} className={`mt-3 p-4  text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-blue-600 text-white' : 'text-gray-400 border'}`}>
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))}
        </div>
        {/*---------------- Timing selection */}
        <div className="flex items-center gap-3 w-full overflow-x-scroll select-none mt-4 ">
          {docSlot.length && docSlot[slotIndex].map((item, index) => (
            <p onClick={() => setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-blue-600 text-white' : 'text-gray-400 border border-gray-300'}`} key={index}>{item.time.toLowerCase()}</p>
          ))}
        </div>
          {/*---------------- Timing selection  end*/}
        <button className="bg-blue-600 text-white text-sm font-light py-3 px-14 rounded-full my-6">Book an appointment</button>
      </div>


      {/* //---------Related Doctors---------// */}
<RelatedDoctors docId={docId} speciality={doctorsData.speciality}/>
{/* <RelatedDoctors docId={docId} speciality={doctorsData.speciality}/> */}
    </div>
  );
}

export default Appointment;
