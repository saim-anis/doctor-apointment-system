import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartPulse, faBrain, faTooth, faBone, faEye,
  faStethoscope, faSyringe, faBaby, faPersonRunning,
  faFlask, faXRay, faAmbulance, faMicroscope, faLungs,
  faVenus, faArrowRight, faCircleCheck, faClock,
  faUserDoctor, faCalendarCheck, faPhone, faChevronDown
} from "@fortawesome/free-solid-svg-icons";

// ── animation hook ────────────────────────────────────────
function useInView(threshold = 0.12) {
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
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transition: `opacity 0.7s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

// ── data ──────────────────────────────────────────────────
const services = [
  {
    id: 1,
    icon: faHeartPulse,
    name: "Cardiology",
    tagline: "Heart & Cardiovascular Care",
    color: "red",
    bg: "bg-red-50", iconBg: "bg-red-100", iconColor: "text-red-600", border: "border-red-200", badge: "bg-red-600",
    desc: "Comprehensive diagnosis and treatment of heart diseases, hypertension, and cardiovascular conditions with state-of-the-art technology.",
    features: ["ECG & Echocardiography", "Stress Testing", "Cholesterol Management", "Heart Failure Treatment", "Arrhythmia Care"],
    fee: "Rs. 2,500", time: "30–45 min", doctors: 8,
  },
  {
    id: 2,
    icon: faBrain,
    name: "Neurology",
    tagline: "Brain & Nervous System",
    color: "purple",
    bg: "bg-purple-50", iconBg: "bg-purple-100", iconColor: "text-purple-600", border: "border-purple-200", badge: "bg-purple-600",
    desc: "Expert care for neurological conditions including migraines, epilepsy, stroke recovery, and disorders of the brain and spinal cord.",
    features: ["EEG & Brain Mapping", "Migraine Treatment", "Stroke Management", "Epilepsy Care", "Memory Disorders"],
    fee: "Rs. 3,500", time: "40–60 min", doctors: 6,
  },
  {
    id: 3,
    icon: faTooth,
    name: "Dental Care",
    tagline: "Oral Health & Hygiene",
    color: "cyan",
    bg: "bg-cyan-50", iconBg: "bg-cyan-100", iconColor: "text-cyan-600", border: "border-cyan-200", badge: "bg-cyan-600",
    desc: "Full-spectrum dental services from routine cleanings and fillings to advanced orthodontics, implants, and cosmetic dentistry.",
    features: ["Teeth Cleaning & Scaling", "Dental Implants", "Orthodontics / Braces", "Root Canal Treatment", "Teeth Whitening"],
    fee: "Rs. 1,500", time: "20–60 min", doctors: 10,
  },
  {
    id: 4,
    icon: faBone,
    name: "Orthopedics",
    tagline: "Bones, Joints & Muscles",
    color: "orange",
    bg: "bg-orange-50", iconBg: "bg-orange-100", iconColor: "text-orange-600", border: "border-orange-200", badge: "bg-orange-600",
    desc: "Specialized treatment of musculoskeletal conditions including fractures, joint replacements, sports injuries, and spine disorders.",
    features: ["Joint Replacement Surgery", "Fracture Management", "Sports Injury Treatment", "Spine & Back Care", "Arthritis Management"],
    fee: "Rs. 3,000", time: "30–50 min", doctors: 7,
  },
  {
    id: 5,
    icon: faEye,
    name: "Ophthalmology",
    tagline: "Eye Health & Vision",
    color: "blue",
    bg: "bg-blue-50", iconBg: "bg-blue-100", iconColor: "text-blue-600", border: "border-blue-200", badge: "bg-blue-600",
    desc: "Complete eye care including vision correction, cataract surgery, glaucoma treatment, and pediatric ophthalmology services.",
    features: ["Vision Testing & Glasses", "Cataract Surgery", "Glaucoma Treatment", "Laser Eye Surgery", "Retina Care"],
    fee: "Rs. 2,000", time: "25–40 min", doctors: 5,
  },
  {
    id: 6,
    icon: faStethoscope,
    name: "General Practice",
    tagline: "Primary & Preventive Care",
    color: "green",
    bg: "bg-green-50", iconBg: "bg-green-100", iconColor: "text-green-600", border: "border-green-200", badge: "bg-green-600",
    desc: "Your first point of contact for all health concerns. Our GPs provide diagnoses, referrals, and comprehensive preventive healthcare.",
    features: ["Full Body Checkups", "Chronic Disease Management", "Vaccinations", "Health Screenings", "Prescription Renewals"],
    fee: "Rs. 800", time: "15–30 min", doctors: 20,
  },
  {
    id: 7,
    icon: faFlask,
    name: "Laboratory",
    tagline: "Diagnostic Testing",
    color: "yellow",
    bg: "bg-yellow-50", iconBg: "bg-yellow-100", iconColor: "text-yellow-600", border: "border-yellow-200", badge: "bg-yellow-600",
    desc: "Advanced diagnostic laboratory offering a full range of blood tests, urine analysis, cultures, and specialized pathology services.",
    features: ["Blood & Urine Tests", "Thyroid Panel", "Diabetes Screening", "Liver & Kidney Function", "Allergy Testing"],
    fee: "Rs. 500+", time: "Same day results", doctors: 12,
  },
  {
    id: 8,
    icon: faXRay,
    name: "Radiology",
    tagline: "Imaging & Diagnostics",
    color: "slate",
    bg: "bg-slate-50", iconBg: "bg-slate-100", iconColor: "text-slate-600", border: "border-slate-200", badge: "bg-slate-600",
    desc: "Modern imaging services including X-rays, ultrasounds, CT scans, and MRIs with rapid digital reporting by expert radiologists.",
    features: ["X-Ray Imaging", "Ultrasound", "CT Scan", "MRI Scan", "Doppler Studies"],
    fee: "Rs. 1,500+", time: "1–2 hrs", doctors: 6,
  },
  {
    id: 9,
    icon: faSyringe,
    name: "Vaccination",
    tagline: "Immunisation Services",
    color: "teal",
    bg: "bg-teal-50", iconBg: "bg-teal-100", iconColor: "text-teal-600", border: "border-teal-200", badge: "bg-teal-600",
    desc: "Complete immunisation programs for all ages — from childhood vaccine schedules to travel vaccines and annual flu shots.",
    features: ["Childhood Immunisation", "Adult Boosters", "Travel Vaccines", "Flu Shots", "HPV & Hepatitis B"],
    fee: "Rs. 600+", time: "10–15 min", doctors: 8,
  },
  {
    id: 10,
    icon: faBaby,
    name: "Pediatrics",
    tagline: "Child Health & Development",
    color: "pink",
    bg: "bg-pink-50", iconBg: "bg-pink-100", iconColor: "text-pink-600", border: "border-pink-200", badge: "bg-pink-600",
    desc: "Dedicated care for infants, children, and teenagers covering growth monitoring, nutrition, developmental assessments, and illness management.",
    features: ["Newborn Care", "Growth Monitoring", "Childhood Vaccinations", "Developmental Assessment", "Nutritional Guidance"],
    fee: "Rs. 1,200", time: "20–40 min", doctors: 9,
  },
  {
    id: 11,
    icon: faLungs,
    name: "Pulmonology",
    tagline: "Lung & Respiratory Care",
    color: "sky",
    bg: "bg-sky-50", iconBg: "bg-sky-100", iconColor: "text-sky-600", border: "border-sky-200", badge: "bg-sky-600",
    desc: "Specialist diagnosis and management of respiratory conditions including asthma, COPD, sleep apnea, and chronic cough.",
    features: ["Asthma Management", "COPD Treatment", "Sleep Apnea", "Spirometry Testing", "Chest Physiotherapy"],
    fee: "Rs. 2,800", time: "30–50 min", doctors: 5,
  },
  {
    id: 12,
    icon: faVenus,
    name: "Gynecology",
    tagline: "Women's Health & Maternity",
    color: "rose",
    bg: "bg-rose-50", iconBg: "bg-rose-100", iconColor: "text-rose-600", border: "border-rose-200", badge: "bg-rose-600",
    desc: "Comprehensive women's health services including prenatal care, gynecological exams, family planning, and menopause management.",
    features: ["Prenatal & Antenatal Care", "Pap Smear & Screening", "Family Planning", "PCOS Management", "Menopause Care"],
    fee: "Rs. 2,200", time: "30–45 min", doctors: 8,
  },
  {
    id: 13,
    icon: faAmbulance,
    name: "Emergency Care",
    tagline: "24 / 7 Urgent Services",
    color: "red",
    bg: "bg-red-50", iconBg: "bg-red-100", iconColor: "text-red-600", border: "border-red-200", badge: "bg-red-600",
    desc: "Round-the-clock emergency medical services with rapid response teams, trauma care, and critical stabilisation facilities.",
    features: ["24/7 Emergency Room", "Trauma & Critical Care", "Ambulance Service", "First Aid & Resuscitation", "ICU Referral Support"],
    fee: "Variable", time: "Immediate", doctors: 15,
  },
  {
    id: 14,
    icon: faMicroscope,
    name: "Pathology",
    tagline: "Biopsy & Tissue Analysis",
    color: "indigo",
    bg: "bg-indigo-50", iconBg: "bg-indigo-100", iconColor: "text-indigo-600", border: "border-indigo-200", badge: "bg-indigo-600",
    desc: "Comprehensive histopathology and cytopathology services for accurate diagnosis of diseases through tissue and cell examination.",
    features: ["Biopsy Analysis", "Cancer Screening", "Cytology Testing", "Hormonal Assays", "Genetic Screening"],
    fee: "Rs. 2,000+", time: "2–5 days", doctors: 4,
  },
  {
    id: 15,
    icon: faPersonRunning,
    name: "Physiotherapy",
    tagline: "Rehabilitation & Recovery",
    color: "lime",
    bg: "bg-lime-50", iconBg: "bg-lime-100", iconColor: "text-lime-600", border: "border-lime-200", badge: "bg-lime-600",
    desc: "Evidence-based physiotherapy for post-surgical recovery, sports rehabilitation, chronic pain management, and mobility restoration.",
    features: ["Post-Surgery Recovery", "Sports Rehabilitation", "Chronic Pain Management", "Electrotherapy", "Hydrotherapy"],
    fee: "Rs. 1,800", time: "45–60 min", doctors: 11,
  },
];

const stats = [
  { icon: faUserDoctor,    value: "150+",  label: "Specialist Doctors"  },
  { icon: faStethoscope,   value: "15+",   label: "Medical Departments" },
  { icon: faCalendarCheck, value: "12K+",  label: "Patients Yearly"     },
  { icon: faClock,         value: "24/7",  label: "Emergency Available" },
];

// ── component ─────────────────────────────────────────────
export default function Services() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");
  const [expanded, setExpanded] = useState(null);

  const filters = ["All", "Diagnostics", "Surgery", "Consultation", "Emergency"];

  const filterMap = {
    Diagnostics: ["Laboratory", "Radiology", "Pathology"],
    Surgery:     ["Orthopedics", "Ophthalmology", "Dental Care"],
    Consultation:["Cardiology", "Neurology", "General Practice", "Pulmonology", "Gynecology", "Pediatrics"],
    Emergency:   ["Emergency Care", "Ambulance"],
  };

  const filtered = activeFilter === "All"
    ? services
    : services.filter(s => (filterMap[activeFilter] || []).includes(s.name));

  return (
    <div className="font-sans bg-white text-gray-900 overflow-x-hidden">

      {/* ── HERO ──────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100 overflow-hidden">

        {/* top strip */}
        <div className="border-b border-gray-100 px-6 py-3 bg-gray-50">
          <div className="max-w-6xl mx-auto flex items-center justify-between text-xs text-gray-400 font-semibold">
            <span className="text-gray-700 font-extrabold uppercase tracking-widest">Our Services</span>
            <span className="hidden md:flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full" style={{ animation: "pulse 2s infinite" }}></span>
              15 Departments · 150+ Doctors
            </span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <div style={{ animation: "fadeUp 0.6s ease both" }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10 bg-blue-500"></div>
              <span className="text-blue-600 text-xs font-extrabold uppercase tracking-widest">World-Class Healthcare</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-none tracking-tight mb-5 text-gray-900">
              Every<br />
              <span className="text-blue-600">Service</span><br />
              You Need.
            </h1>
            <p className="text-gray-500 text-base leading-relaxed max-w-md mb-8">
              From routine checkups to complex surgeries — Lifeline offers 15 specialised departments staffed by over 150 expert doctors under one roof.
            </p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => navigate("/appointment/1")}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition duration-200 text-sm">
                Book Appointment <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </button>
              <button onClick={() => navigate("/contact")}
                className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-6 py-3 rounded-xl transition duration-200 text-sm">
                <FontAwesomeIcon icon={faPhone} className="text-xs" /> Contact Us
              </button>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4" style={{ animation: "fadeUp 0.6s ease 0.15s both" }}>
            {stats.map((s, i) => (
              <div key={i} className="bg-gray-50 border-2 border-gray-100 rounded-2xl p-6 hover:border-blue-300 hover:shadow-md transition duration-200 group">
                <div className="w-10 h-10 bg-blue-100 group-hover:bg-blue-600 rounded-xl flex items-center justify-center mb-4 transition duration-200">
                  <FontAwesomeIcon icon={s.icon} className="text-blue-600 group-hover:text-white transition duration-200" />
                </div>
                <div className="text-3xl font-extrabold text-gray-900 mb-1">{s.value}</div>
                <div className="text-gray-400 text-xs font-bold uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FILTER TABS ───────────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className={`px-5 py-2 rounded-full text-xs font-extrabold whitespace-nowrap transition duration-200 flex-shrink-0 ${
                activeFilter === f
                  ? "bg-gray-900 text-white shadow"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}>
              {f}
              {f !== "All" && (
                <span className={`ml-1.5 text-xs ${activeFilter === f ? "text-gray-300" : "text-gray-400"}`}>
                  ({(filterMap[f] || []).length})
                </span>
              )}
            </button>
          ))}
          <span className="ml-auto text-xs text-gray-400 font-semibold flex-shrink-0 hidden md:block">
            {filtered.length} services
          </span>
        </div>
      </div>

      {/* ── SERVICES GRID ─────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((svc, i) => (
            <FadeUp key={svc.id} delay={i * 0.06}>
              <div className={`${svc.bg} border-2 ${svc.border} rounded-3xl overflow-hidden hover:shadow-xl transition duration-300 group flex flex-col`}>

                {/* Card Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 ${svc.iconBg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition duration-300`}>
                      <FontAwesomeIcon icon={svc.icon} className={`${svc.iconColor} text-2xl`} />
                    </div>
                    <span className={`${svc.badge} text-white text-xs font-extrabold px-3 py-1 rounded-full`}>
                      {svc.fee}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-gray-900 text-lg mb-0.5">{svc.name}</h3>
                  <p className={`${svc.iconColor} text-xs font-bold mb-3`}>{svc.tagline}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{svc.desc}</p>
                </div>

                {/* Meta row */}
                <div className="px-6 pb-4 flex items-center gap-4 text-xs text-gray-500 font-semibold">
                  <span className="flex items-center gap-1"><FontAwesomeIcon icon={faClock} className="text-xs" /> {svc.time}</span>
                  <span className="flex items-center gap-1"><FontAwesomeIcon icon={faUserDoctor} className="text-xs" /> {svc.doctors} Doctors</span>
                </div>

                {/* Expandable features */}
                <div className="border-t border-white border-opacity-60 mx-6"></div>
                <button
                  onClick={() => setExpanded(expanded === svc.id ? null : svc.id)}
                  className="flex items-center justify-between px-6 py-3 text-xs font-extrabold text-gray-600 hover:text-gray-900 transition duration-200 w-full text-left"
                >
                  <span>What's included</span>
                  <FontAwesomeIcon icon={faChevronDown}
                    className={`transition-transform duration-300 ${expanded === svc.id ? "rotate-180" : "rotate-0"}`} />
                </button>

                <div className={`overflow-hidden transition-all duration-400 ${expanded === svc.id ? "max-h-60" : "max-h-0"}`}>
                  <div className="px-6 pb-4 space-y-2">
                    {svc.features.map((f, j) => (
                      <div key={j} className="flex items-center gap-2 text-sm text-gray-700">
                        <FontAwesomeIcon icon={faCircleCheck} className={`${svc.iconColor} text-xs flex-shrink-0`} />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="px-6 pb-6 mt-auto">
                  <button
                    onClick={() => navigate("/appointment/1")}
                    className={`w-full flex items-center justify-center gap-2 ${svc.iconBg} ${svc.iconColor} hover:opacity-80 font-extrabold py-2.5 rounded-xl text-xs transition duration-200`}>
                    Book This Service <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                  </button>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ──────────────────────────────────── */}
      <FadeIn>
        <div className="bg-gray-50 py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <span className="inline-block bg-white text-blue-600 border border-blue-100 text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">How It Works</span>
              <h2 className="text-3xl font-extrabold text-gray-900">Getting Care is Simple</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              {/* connector line */}
              <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-blue-100 z-0" />
              {[
                { step: "01", title: "Choose Service",    desc: "Browse our departments and select the one you need.",          icon: faStethoscope   },
                { step: "02", title: "Pick a Doctor",     desc: "Select from our specialists based on expertise and reviews.",   icon: faUserDoctor    },
                { step: "03", title: "Book Appointment",  desc: "Choose a convenient date and time slot online instantly.",      icon: faCalendarCheck },
                { step: "04", title: "Get Treated",       desc: "Visit us and receive expert, compassionate medical care.",      icon: faCircleCheck   },
              ].map((s, i) => (
                <FadeUp key={i} delay={i * 0.1}>
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-white border-2 border-blue-100 rounded-full flex items-center justify-center mb-4 shadow-sm">
                      <FontAwesomeIcon icon={s.icon} className="text-blue-600 text-xl" />
                    </div>
                    <div className="text-xs font-extrabold text-blue-400 mb-1">{s.step}</div>
                    <div className="font-extrabold text-gray-900 mb-2">{s.title}</div>
                    <div className="text-sm text-gray-500 leading-relaxed max-w-[160px]">{s.desc}</div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>

      {/* ── CTA ───────────────────────────────────────────── */}
      <FadeUp>
        <div className="mx-6 mb-16 mt-16 rounded-3xl bg-gray-900 px-8 py-16 text-center text-white max-w-5xl md:mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-600 opacity-10 rounded-full translate-x-24 -translate-y-24 blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-blue-600 opacity-10 rounded-full -translate-x-20 translate-y-20 blur-2xl pointer-events-none" />
          <div className="relative z-10">
            <FontAwesomeIcon icon={faHeartPulse} className="text-blue-400 text-4xl mb-5" />
            <h2 className="text-3xl font-extrabold mb-3">Not Sure Which Service You Need?</h2>
            <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto leading-relaxed">
              Book a General Practice consultation and our GP will guide you to the right specialist.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button onClick={() => navigate("/appointment/1")}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-8 py-3.5 rounded-xl transition duration-200 text-sm">
                Book a GP Consultation <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </button>
              <a href="tel:+923323543871"
                className="inline-flex items-center gap-2 border border-gray-700 hover:border-gray-500 text-gray-300 font-bold px-8 py-3.5 rounded-xl transition duration-200 text-sm">
                <FontAwesomeIcon icon={faPhone} className="text-xs" /> Call Us
              </a>
            </div>
          </div>
        </div>
      </FadeUp>

      <style>{`
        @keyframes fadeUp  { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse   { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
        .scrollbar-hide::-webkit-scrollbar { display:none; }
        .scrollbar-hide { -ms-overflow-style:none; scrollbar-width:none; }
        .duration-400 { transition-duration: 400ms; }
      `}</style>
    </div>
  );
}