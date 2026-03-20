import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser, faEnvelope, faPhone, faCalendarDays, faVenusMars,
  faMapLocationDot, faPen, faLock, faEye, faEyeSlash,
  faCircleCheck, faClockRotateLeft, faFileMedical,
  faArrowRight, faArrowRightFromBracket, faCamera,
  faShieldHeart, faHeartPulse, faStar, faTriangleExclamation,
  faXmark, faChevronRight, faHouseMedical
} from "@fortawesome/free-solid-svg-icons";
import { auth } from "../firebase";
import { updatePassword, updateEmail, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { logout } from "../auth";

// ── animation hook ────────────────────────────────────────
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeUp({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

// ── mock data ─────────────────────────────────────────────
const mockAppointments = [
  { id: 1, doctor: "Dr. Sara Khan",   speciality: "Cardiologist",  date: "Mar 10, 2025", time: "10:30 AM", status: "upcoming",   fee: "Rs. 2,500" },
  { id: 2, doctor: "Dr. Usman Ali",   speciality: "Neurologist",   date: "Feb 22, 2025", time: "02:00 PM", status: "completed",  fee: "Rs. 3,500" },
  { id: 3, doctor: "Dr. Ayesha Malik",speciality: "Pediatrician",  date: "Feb 05, 2025", time: "11:00 AM", status: "completed",  fee: "Rs. 1,200" },
  { id: 4, doctor: "Dr. Ahmad Raza",  speciality: "General GP",    date: "Jan 18, 2025", time: "09:00 AM", status: "cancelled",  fee: "Rs. 800"   },
];

const mockRecords = [
  { id: 1, title: "Blood Test Report",      date: "Feb 22, 2025", type: "Lab",      icon: faFileMedical,  color: "text-blue-600 bg-blue-50"   },
  { id: 2, title: "Chest X-Ray",            date: "Jan 10, 2025", type: "Radiology",icon: faShieldHeart,  color: "text-purple-600 bg-purple-50"},
  { id: 3, title: "Cardiology ECG Report",  date: "Dec 05, 2024", type: "Cardiology",icon: faHeartPulse,  color: "text-red-600 bg-red-50"     },
];

const statusStyle = {
  upcoming:  "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-600",
};

// ── component ─────────────────────────────────────────────
export default function MyProfile() {
  const navigate    = useNavigate();
  const user        = auth.currentUser;
  const fileRef     = useRef(null);

  const [activeTab, setActiveTab]   = useState("profile");
  const [editMode, setEditMode]     = useState(false);
  const [toast, setToast]           = useState(null);
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  const [profile, setProfile] = useState({
    name:    user?.displayName || "John Doe",
    email:   user?.email       || "john@example.com",
    phone:   "+92 300 1234567",
    dob:     "1995-06-15",
    gender:  "Male",
    address: "Karachi, Pakistan",
    blood:   "O+",
  });

  const [passForm, setPassForm]   = useState({ current: "", newPass: "", confirm: "" });
  const [passError, setPassError] = useState("");
  const [focused, setFocused]     = useState("");

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSaveProfile = () => {
    setEditMode(false);
    showToast("Profile updated successfully!");
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPassError("");
    if (passForm.newPass.length < 6) return setPassError("New password must be at least 6 characters.");
    if (passForm.newPass !== passForm.confirm) return setPassError("Passwords do not match.");
    try {
      const cred = EmailAuthProvider.credential(user.email, passForm.current);
      await reauthenticateWithCredential(user, cred);
      await updatePassword(user, passForm.newPass);
      setPassForm({ current: "", newPass: "", confirm: "" });
      showToast("Password changed successfully!");
    } catch {
      setPassError("Current password is incorrect.");
    }
  };

  const inputClass = (field) =>
    `w-full border-2 rounded-xl px-4 py-3 text-sm font-semibold outline-none transition duration-200 ${
      focused === field ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"
    } disabled:bg-gray-50 disabled:text-gray-500`;

  const tabs = [
    { id: "profile",      label: "Personal Info",      icon: faUser           },
    { id: "appointments", label: "Appointments",        icon: faCalendarDays   },
    { id: "records",      label: "Medical Records",     icon: faFileMedical    },
    { id: "password",     label: "Change Password",     icon: faLock           },
  ];

  return (
    <div className="font-sans bg-gray-50 min-h-screen">

      {/* ── TOAST ─────────────────────────────────────────── */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-sm font-bold transition-all duration-300 ${
          toast.type === "success" ? "bg-green-600 text-white" : "bg-red-500 text-white"
        }`} style={{ animation: "slideInRight 0.3s ease both" }}>
          <FontAwesomeIcon icon={toast.type === "success" ? faCircleCheck : faTriangleExclamation} />
          {toast.msg}
        </div>
      )}

      {/* ── HEADER BANNER ─────────────────────────────────── */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 pt-10 pb-24 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <FontAwesomeIcon icon={faHouseMedical} className="text-white bg-white bg-opacity-20 p-2 rounded-lg" />
            <span className="italic text-white font-extrabold text-lg">Lifeline</span>
          </div>
          <button
            onClick={() => { logout(auth); navigate("/login"); }}
            className="flex items-center gap-2 bg-white bg-opacity-15 hover:bg-opacity-25 text-white text-xs font-bold px-4 py-2 rounded-xl transition duration-200"
          >
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
            Logout
          </button>
        </div>
      </div>

      {/* ── PROFILE CARD (overlaps banner) ────────────────── */}
      <div className="max-w-5xl mx-auto px-6 -mt-16 mb-8 relative z-10">
        <FadeUp>
          <div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">

            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center text-white text-4xl font-extrabold shadow-md">
                {profile.name.charAt(0)}
              </div>
              <button
                onClick={() => fileRef.current?.click()}
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center hover:border-blue-400 transition shadow-sm"
              >
                <FontAwesomeIcon icon={faCamera} className="text-gray-500 text-xs" />
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" />
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-extrabold text-gray-900">{profile.name}</h1>
              <p className="text-gray-500 text-sm mb-3">{profile.email}</p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <FontAwesomeIcon icon={faShieldHeart} className="text-xs" /> Patient
                </span>
                <span className="bg-green-50 text-green-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <FontAwesomeIcon icon={faCircleCheck} className="text-xs" /> Verified
                </span>
                <span className="bg-red-50 text-red-600 text-xs font-bold px-3 py-1 rounded-full">
                  Blood: {profile.blood}
                </span>
              </div>
            </div>

            {/* Quick stats */}
            <div className="hidden md:flex gap-6 text-center">
              {[
                { val: mockAppointments.filter(a => a.status === "completed").length, label: "Visits"     },
                { val: mockAppointments.filter(a => a.status === "upcoming").length,  label: "Upcoming"   },
                { val: mockRecords.length,                                            label: "Records"    },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-2xl font-extrabold text-gray-900">{s.val}</div>
                  <div className="text-xs text-gray-400 font-semibold">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>

      {/* ── MAIN CONTENT ──────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* Sidebar Tabs */}
          <FadeUp delay={0.05}>
            <div className="bg-white rounded-2xl shadow-sm p-3 h-fit">
              {tabs.map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition duration-200 mb-1 last:mb-0 ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}>
                  <FontAwesomeIcon icon={tab.icon} className="text-sm flex-shrink-0" />
                  <span>{tab.label}</span>
                  {activeTab !== tab.id && <FontAwesomeIcon icon={faChevronRight} className="ml-auto text-gray-300 text-xs" />}
                </button>
              ))}

              <hr className="border-gray-100 my-3" />

              <button
                onClick={() => { logout(auth); navigate("/login"); }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition duration-200"
              >
                <FontAwesomeIcon icon={faArrowRightFromBracket} className="text-sm" />
                Logout
              </button>
            </div>
          </FadeUp>

          {/* Content Panel */}
          <div className="lg:col-span-3">

            {/* ── PERSONAL INFO ───────────────────────────── */}
            {activeTab === "profile" && (
              <FadeUp>
                <div className="bg-white rounded-2xl shadow-sm p-7">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-extrabold text-gray-900">Personal Information</h2>
                      <p className="text-sm text-gray-500 mt-0.5">Manage your personal details</p>
                    </div>
                    <button
                      onClick={() => editMode ? handleSaveProfile() : setEditMode(true)}
                      className={`flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-xl transition duration-200 ${
                        editMode
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}>
                      <FontAwesomeIcon icon={editMode ? faCircleCheck : faPen} className="text-xs" />
                      {editMode ? "Save Changes" : "Edit Profile"}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[
                      { label: "Full Name",   name: "name",    icon: faUser,          type: "text"   },
                      { label: "Email",       name: "email",   icon: faEnvelope,      type: "email"  },
                      { label: "Phone",       name: "phone",   icon: faPhone,         type: "tel"    },
                      { label: "Date of Birth",name:"dob",     icon: faCalendarDays,  type: "date"   },
                      { label: "Address",     name: "address", icon: faMapLocationDot,type: "text"   },
                      { label: "Blood Group", name: "blood",   icon: faHeartPulse,    type: "text"   },
                    ].map((f) => (
                      <div key={f.name}>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">{f.label}</label>
                        <div className="relative">
                          <FontAwesomeIcon icon={f.icon} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                          <input
                            name={f.name} type={f.type} value={profile[f.name]}
                            disabled={!editMode}
                            onChange={e => setProfile({ ...profile, [f.name]: e.target.value })}
                            onFocus={() => setFocused(f.name)} onBlur={() => setFocused("")}
                            className={`${inputClass(f.name)} pl-10`}
                          />
                        </div>
                      </div>
                    ))}

                    {/* Gender select */}
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Gender</label>
                      <div className="relative">
                        <FontAwesomeIcon icon={faVenusMars} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                        <select
                          value={profile.gender} disabled={!editMode}
                          onChange={e => setProfile({ ...profile, gender: e.target.value })}
                          className={`${inputClass("gender")} pl-10 appearance-none`}>
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {editMode && (
                    <div className="flex gap-3 mt-6">
                      <button onClick={handleSaveProfile}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3 rounded-xl text-sm transition duration-200">
                        Save Changes
                      </button>
                      <button onClick={() => setEditMode(false)}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-extrabold py-3 rounded-xl text-sm transition duration-200">
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </FadeUp>
            )}

            {/* ── APPOINTMENTS ────────────────────────────── */}
            {activeTab === "appointments" && (
              <FadeUp>
                <div className="bg-white rounded-2xl shadow-sm p-7">
                  <div className="mb-6">
                    <h2 className="text-xl font-extrabold text-gray-900">Appointment History</h2>
                    <p className="text-sm text-gray-500 mt-0.5">{mockAppointments.length} total appointments</p>
                  </div>

                  <div className="space-y-4">
                    {mockAppointments.map((apt, i) => (
                      <FadeUp key={apt.id} delay={i * 0.07}>
                        <div className="border-2 border-gray-100 hover:border-blue-200 rounded-2xl p-5 transition duration-200 group">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-extrabold text-lg flex-shrink-0">
                                {apt.doctor.split(" ").pop().charAt(0)}
                              </div>
                              <div>
                                <div className="font-extrabold text-gray-900 text-sm">{apt.doctor}</div>
                                <div className="text-blue-600 text-xs font-bold">{apt.speciality}</div>
                                <div className="text-gray-400 text-xs mt-0.5">
                                  {apt.date} · {apt.time}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-2 flex-shrink-0">
                              <span className={`text-xs font-extrabold px-2.5 py-1 rounded-full capitalize ${statusStyle[apt.status]}`}>
                                {apt.status}
                              </span>
                              <span className="text-xs font-bold text-gray-500">{apt.fee}</span>
                            </div>
                          </div>
                          {apt.status === "upcoming" && (
                            <div className="mt-4 flex gap-2">
                              <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold py-2 rounded-xl transition duration-200">
                                Reschedule
                              </button>
                              <button className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold py-2 rounded-xl transition duration-200">
                                Cancel
                              </button>
                            </div>
                          )}
                          {apt.status === "completed" && (
                            <div className="mt-4 flex gap-2">
                              <button className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-600 text-xs font-bold py-2 rounded-xl transition duration-200 flex items-center justify-center gap-1">
                                <FontAwesomeIcon icon={faStar} className="text-yellow-400 text-xs" /> Write Review
                              </button>
                              <button
                                onClick={() => navigate("/appointment/1")}
                                className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold py-2 rounded-xl transition duration-200">
                                Book Again
                              </button>
                            </div>
                          )}
                        </div>
                      </FadeUp>
                    ))}
                  </div>

                  <button onClick={() => navigate("/appointment/1")}
                    className="w-full mt-6 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-sm transition duration-200">
                    Book New Appointment <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                  </button>
                </div>
              </FadeUp>
            )}

            {/* ── MEDICAL RECORDS ─────────────────────────── */}
            {activeTab === "records" && (
              <FadeUp>
                <div className="bg-white rounded-2xl shadow-sm p-7">
                  <div className="mb-6">
                    <h2 className="text-xl font-extrabold text-gray-900">Medical Records</h2>
                    <p className="text-sm text-gray-500 mt-0.5">Your health documents and reports</p>
                  </div>

                  <div className="space-y-4">
                    {mockRecords.map((rec, i) => (
                      <FadeUp key={rec.id} delay={i * 0.08}>
                        <div className="flex items-center gap-4 border-2 border-gray-100 hover:border-blue-200 rounded-2xl p-5 transition duration-200 group cursor-pointer">
                          <div className={`w-12 h-12 ${rec.color.split(" ")[1]} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                            <FontAwesomeIcon icon={rec.icon} className={`${rec.color.split(" ")[0]} text-lg`} />
                          </div>
                          <div className="flex-1">
                            <div className="font-extrabold text-gray-900 text-sm">{rec.title}</div>
                            <div className="text-gray-400 text-xs mt-0.5">{rec.type} · {rec.date}</div>
                          </div>
                          <button className="bg-gray-100 hover:bg-blue-100 hover:text-blue-600 text-gray-500 text-xs font-bold px-3 py-1.5 rounded-xl transition duration-200">
                            View
                          </button>
                        </div>
                      </FadeUp>
                    ))}
                  </div>

                  <div className="mt-6 border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-blue-300 transition duration-200 cursor-pointer group">
                    <FontAwesomeIcon icon={faFileMedical} className="text-gray-300 group-hover:text-blue-400 text-3xl mb-3 transition duration-200" />
                    <div className="font-bold text-gray-500 text-sm group-hover:text-gray-700 transition">Upload New Record</div>
                    <div className="text-xs text-gray-400 mt-1">PDF, JPG, PNG up to 10MB</div>
                  </div>
                </div>
              </FadeUp>
            )}

            {/* ── CHANGE PASSWORD ─────────────────────────── */}
            {activeTab === "password" && (
              <FadeUp>
                <div className="bg-white rounded-2xl shadow-sm p-7">
                  <div className="mb-6">
                    <h2 className="text-xl font-extrabold text-gray-900">Change Password</h2>
                    <p className="text-sm text-gray-500 mt-0.5">Keep your account secure with a strong password</p>
                  </div>

                  {passError && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-semibold px-4 py-3 rounded-xl mb-5 flex items-center gap-2">
                      <FontAwesomeIcon icon={faTriangleExclamation} />
                      {passError}
                    </div>
                  )}

                  <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
                    {[
                      { label: "Current Password", name: "current", show: showOldPass, toggle: () => setShowOldPass(!showOldPass) },
                      { label: "New Password",     name: "newPass", show: showNewPass, toggle: () => setShowNewPass(!showNewPass) },
                      { label: "Confirm Password", name: "confirm", show: showNewPass, toggle: () => setShowNewPass(!showNewPass) },
                    ].map((f) => (
                      <div key={f.name}>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">{f.label}</label>
                        <div className="relative">
                          <FontAwesomeIcon icon={faLock} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                          <input
                            type={f.show ? "text" : "password"}
                            required value={passForm[f.name]}
                            onChange={e => { setPassForm({ ...passForm, [f.name]: e.target.value }); setPassError(""); }}
                            onFocus={() => setFocused(f.name)} onBlur={() => setFocused("")}
                            className={`${inputClass(f.name)} pl-10 pr-11`}
                          />
                          <button type="button" onClick={f.toggle}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition">
                            <FontAwesomeIcon icon={f.show ? faEyeSlash : faEye} className="text-sm" />
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-xs text-blue-700 font-semibold space-y-1">
                      {["At least 6 characters", "Mix of letters and numbers", "One uppercase letter recommended"].map((tip, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <FontAwesomeIcon icon={faCircleCheck} className="text-blue-400 flex-shrink-0" />
                          {tip}
                        </div>
                      ))}
                    </div>

                    <button type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3.5 rounded-xl text-sm transition duration-200 flex items-center justify-center gap-2">
                      <FontAwesomeIcon icon={faShieldHeart} />
                      Update Password
                    </button>
                  </form>
                </div>
              </FadeUp>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp        { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideInRight  { from { opacity:0; transform:translateX(20px);} to { opacity:1; transform:translateX(0); } }
      `}</style>
    </div>
  );
}