import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faInfoCircle, faCalendarDays, faClock, faArrowRight, faArrowLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import RelatedDoctors from "../components/RelatedDoctors";

function Appointment() {
  const { docId } = useParams();
  const { doctorsData } = useContext(AppContext);
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlot, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", age: "", phone: "", email: "", gender: "", reason: "" });
  const [confirmed, setConfirmed] = useState(false);

  const handleFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
      let timeSlots = [];
      while (currentDate < endTime) {
        timeSlots.push({
          datetime: new Date(currentDate),
          time: currentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }),
        });
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      slots.push(timeSlots);
    }
    setDocSlots(slots);
  };

  useEffect(() => {
    if (!doctorsData) return;
    const info = doctorsData.find((doc) => doc.id === parseInt(docId));
    setDocInfo(info);
  }, [doctorsData, docId]);

  useEffect(() => { getAvailableSlots(); }, [docInfo]);

  const selectedDateObj = docSlot[slotIndex]?.[0]?.datetime;

  const steps = [
    { n: 1, label: "Doctor" },
    { n: 2, label: "Schedule" },
    { n: 3, label: "Details" },
    { n: 4, label: "Confirm" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Step Indicator */}
        {!confirmed && (
          <div className="flex items-center justify-center mb-10">
            {steps.map((s, i) => (
              <div key={s.n} className="flex items-center">
                <div className="flex flex-col items-center gap-1.5">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-sm transition-all duration-300
                    ${step > s.n ? "bg-green-500 text-white" : step === s.n ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-400"}`}>
                    {step > s.n ? <FontAwesomeIcon icon={faCheck} className="text-xs" /> : s.n}
                  </div>
                  <span className={`text-xs font-bold ${step >= s.n ? "text-blue-600" : "text-gray-400"}`}>{s.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-1 mb-5 rounded transition-all duration-300 ${step > s.n ? "bg-green-400" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* STEP 1: Doctor Info */}
        {step === 1 && (
          <div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 mb-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <img
                  src={docInfo?.image}
                  alt={docInfo?.name}
                  className="w-48 h-52 object-cover rounded-xl bg-blue-100 flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-2xl font-extrabold text-gray-900">{docInfo?.name}</h2>
                    <FontAwesomeIcon icon={faCircleCheck} className="text-blue-600 text-lg" />
                  </div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-sm text-gray-500 font-semibold">{docInfo?.degree}</span>
                    <span className="text-xs font-bold text-gray-500 border-2 border-gray-200 rounded-full px-3 py-0.5">{docInfo?.experience}</span>
                  </div>
                  <div className="mb-5">
                    <div className="flex items-center gap-2 mb-2">
                      <FontAwesomeIcon icon={faInfoCircle} className="text-blue-600 text-sm" />
                      <span className="font-extrabold text-sm text-gray-900">About</span>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed max-w-xl">{docInfo?.about}</p>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2.5 rounded-xl">
                    <span className="text-sm text-gray-500 font-bold">Appointment Fee:</span>
                    <span className="text-base text-blue-600 font-extrabold">{docInfo?.fees}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button onClick={() => setStep(2)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition duration-200 text-sm">
                Next: Choose Schedule <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Booking Slots */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Pick a Date & Time</h2>
            <p className="text-sm text-gray-400 font-semibold mb-6">
              Appointment with <span className="text-blue-600 font-bold">{docInfo?.name}</span>
            </p>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <FontAwesomeIcon icon={faCalendarDays} className="text-blue-600" />
                <span className="font-extrabold text-gray-900 text-sm">Select Day</span>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 mb-7">
                {docSlot.map((item, index) => (
                  <div key={index} onClick={() => { setSlotIndex(index); setSlotTime(""); }}
                    className={`min-w-[64px] py-4 px-3 text-center rounded-full cursor-pointer transition-all duration-200 border-2 font-bold text-sm flex-shrink-0
                      ${slotIndex === index ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-500 border-gray-200 hover:border-blue-400 hover:text-blue-600"}`}>
                    <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                    <p className="text-lg mt-1">{item[0] && item[0].datetime.getDate()}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 mb-4">
                <FontAwesomeIcon icon={faClock} className="text-blue-600" />
                <span className="font-extrabold text-gray-900 text-sm">Select Time</span>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 flex-wrap">
                {docSlot[slotIndex]?.map((item, index) => (
                  <div key={index} onClick={() => setSlotTime(item.time)}
                    className={`px-4 py-2 rounded-full cursor-pointer text-xs font-bold border-2 whitespace-nowrap transition-all duration-200
                      ${item.time === slotTime ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-500 border-gray-200 hover:border-blue-400 hover:text-blue-600"}`}>
                    {item.time.toLowerCase()}
                  </div>
                ))}
              </div>
              {slotTime && (
                <div className="mt-5 inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-bold px-4 py-2.5 rounded-xl">
                  <FontAwesomeIcon icon={faCheck} />
                  {selectedDateObj && daysOfWeek[selectedDateObj.getDay()]}, {selectedDateObj?.getDate()} — {slotTime}
                </div>
              )}
            </div>
            <div className="flex justify-between">
              <button onClick={() => setStep(1)} className="flex items-center gap-2 bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 font-bold px-6 py-3 rounded-xl transition duration-200 text-sm">
                <FontAwesomeIcon icon={faArrowLeft} className="text-xs" /> Back
              </button>
              <button disabled={!slotTime} onClick={() => setStep(3)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-xl transition duration-200 text-sm">
                Next: Your Details <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Patient Form */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Patient Details</h2>
            <p className="text-sm text-gray-400 font-semibold mb-6">Fill in your information to complete the booking</p>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Full Name *</label>
                  <input name="name" placeholder="John Doe" value={form.name} onChange={handleFormChange}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition duration-200" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Age *</label>
                  <input name="age" type="number" placeholder="25" value={form.age} onChange={handleFormChange}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition duration-200" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Phone Number *</label>
                  <input name="phone" placeholder="+92 300 1234567" value={form.phone} onChange={handleFormChange}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition duration-200" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Email Address *</label>
                  <input name="email" type="email" placeholder="john@email.com" value={form.email} onChange={handleFormChange}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition duration-200" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Gender *</label>
                  <select name="gender" value={form.gender} onChange={handleFormChange}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition duration-200 bg-white">
                    <option value="">Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Reason for Visit</label>
                  <textarea name="reason" rows={3} placeholder="Describe your symptoms or reason for appointment..." value={form.reason} onChange={handleFormChange}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition duration-200 resize-none" />
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <button onClick={() => setStep(2)} className="flex items-center gap-2 bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 font-bold px-6 py-3 rounded-xl transition duration-200 text-sm">
                <FontAwesomeIcon icon={faArrowLeft} className="text-xs" /> Back
              </button>
              <button disabled={!form.name || !form.phone || !form.email || !form.gender} onClick={() => setStep(4)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-xl transition duration-200 text-sm">
                Next: Confirm <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Confirm */}
        {step === 4 && !confirmed && (
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Confirm Appointment</h2>
            <p className="text-sm text-gray-400 font-semibold mb-6">Please review your appointment details</p>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 mb-6">
              <div className="flex items-center gap-4 pb-5 border-b border-gray-100 mb-5">
                <img src={docInfo?.image} alt="" className="w-16 h-16 rounded-xl object-cover bg-blue-100" />
                <div>
                  <div className="font-extrabold text-lg text-gray-900">{docInfo?.name}</div>
                  <div className="text-blue-600 font-bold text-sm">{docInfo?.degree}</div>
                  <div className="text-gray-400 text-xs font-semibold mt-0.5">Fee: {docInfo?.fees} · {docInfo?.experience}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pb-5 border-b border-gray-100 mb-5">
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="text-xs text-gray-400 font-bold uppercase tracking-wide mb-1">Date</div>
                  <div className="font-extrabold text-gray-900 text-sm flex items-center gap-1.5">
                    <FontAwesomeIcon icon={faCalendarDays} className="text-blue-500 text-xs" />
                    {selectedDateObj && `${daysOfWeek[selectedDateObj.getDay()]}, ${selectedDateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
                  </div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="text-xs text-gray-400 font-bold uppercase tracking-wide mb-1">Time</div>
                  <div className="font-extrabold text-gray-900 text-sm flex items-center gap-1.5">
                    <FontAwesomeIcon icon={faClock} className="text-blue-500 text-xs" />
                    {slotTime}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[["Patient", form.name], ["Age", form.age + " years"], ["Phone", form.phone], ["Email", form.email], ["Gender", form.gender]].map(([k, v]) => (
                  <div key={k}>
                    <span className="text-xs text-gray-400 font-bold uppercase">{k}: </span>
                    <span className="text-sm font-bold text-gray-800">{v}</span>
                  </div>
                ))}
                {form.reason && (
                  <div className="col-span-2">
                    <span className="text-xs text-gray-400 font-bold uppercase">Reason: </span>
                    <span className="text-sm font-bold text-gray-800">{form.reason}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-between">
              <button onClick={() => setStep(3)} className="flex items-center gap-2 bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 font-bold px-6 py-3 rounded-xl transition duration-200 text-sm">
                <FontAwesomeIcon icon={faArrowLeft} className="text-xs" /> Back
              </button>
              <button onClick={() => setConfirmed(true)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition duration-200 text-sm">
                <FontAwesomeIcon icon={faCheck} /> Confirm Appointment
              </button>
            </div>
          </div>
        )}

        {/* SUCCESS */}
        {confirmed && (
          <div className="text-center py-16 px-6">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon icon={faCheck} className="text-white text-4xl" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Appointment Confirmed!</h2>
            <p className="text-gray-400 font-semibold text-sm mb-10">
              Confirmation will be sent to <span className="text-blue-600 font-bold">{form.email}</span>
            </p>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 max-w-md mx-auto text-left">
              <div className="flex gap-4 items-center mb-5 pb-5 border-b border-gray-100">
                <img src={docInfo?.image} alt="" className="w-14 h-14 rounded-xl object-cover bg-blue-100" />
                <div>
                  <div className="font-extrabold text-gray-900">{docInfo?.name}</div>
                  <div className="text-blue-600 text-sm font-bold">{docInfo?.degree}</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-blue-50 rounded-xl p-3 text-center">
                  <div className="text-xs text-gray-400 font-bold mb-1">DATE</div>
                  <div className="font-extrabold text-gray-900 text-xs">
                    {selectedDateObj && `${daysOfWeek[selectedDateObj.getDay()]}, ${selectedDateObj.getDate()}`}
                  </div>
                </div>
                <div className="bg-blue-50 rounded-xl p-3 text-center">
                  <div className="text-xs text-gray-400 font-bold mb-1">TIME</div>
                  <div className="font-extrabold text-gray-900 text-xs">{slotTime}</div>
                </div>
                <div className="bg-blue-50 rounded-xl p-3 text-center">
                  <div className="text-xs text-gray-400 font-bold mb-1">FEE</div>
                  <div className="font-extrabold text-blue-600 text-xs">{docInfo?.fees}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Related Doctors */}
        {!confirmed && (
          <div className="mt-14">
            <RelatedDoctors docId={docId} speciality={docInfo?.speciality} />
          </div>
        )}

      </div>
    </div>
  );
}

export default Appointment;