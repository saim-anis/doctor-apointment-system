import React, { useEffect, useRef, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartPulse, faMicroscope, faHandHoldingHeart, faGraduationCap,
  faArrowRight, faUserDoctor, faStar, faCircleCheck, faStethoscope,
  faHospital, faAward, faShieldHeart, faClock, faPhone, faQuoteLeft,
  faCalendarCheck
} from "@fortawesome/free-solid-svg-icons";

// ── data ──────────────────────────────────────────────────
const stats = [
  { number: 12000, suffix: "+", label: "Patients Served" },
  { number: 150,   suffix: "+", label: "Expert Doctors"  },
  { number: 20,    suffix: "+", label: "Specialties"     },
  { number: 98,    suffix: "%", label: "Satisfaction"    },
];

const values = [
  { icon: faHeartPulse,        title: "Patient First",       desc: "Every decision centres around the well-being and comfort of our patients."        },
  { icon: faMicroscope,        title: "Medical Excellence",  desc: "We uphold the highest standards of care with evidence-based practices."           },
  { icon: faHandHoldingHeart,  title: "Compassionate Care",  desc: "We treat every patient with dignity, empathy, and genuine concern."               },
  { icon: faGraduationCap,     title: "Continuous Growth",   desc: "Our doctors and staff are committed to lifelong learning and improvement."        },
];

const milestones = [
  { year: "2015", title: "Founded",          desc: "Started as a small clinic in Karachi with a passionate team of 5 doctors."    },
  { year: "2017", title: "City Expansion",   desc: "Opened 3 new branches to make quality healthcare accessible city-wide."        },
  { year: "2020", title: "Digital Platform", desc: "Launched online booking and telemedicine to serve patients from home."          },
  { year: "2024", title: "10K+ Milestone",   desc: "Reached over 10,000 patients served annually — a testament to trust."          },
];

const testimonials = [
  { name: "Sarah Ahmed",   role: "Patient since 2019", text: "The doctors here genuinely care. My recovery was smooth and the staff were incredibly supportive throughout.", rating: 5 },
  { name: "Usman Tariq",   role: "Patient since 2021", text: "Booking an appointment was effortless and the doctor was thorough and compassionate. Highly recommend Lifeline!", rating: 5 },
  { name: "Amna Siddiqui", role: "Patient since 2022", text: "World-class facility with a personal touch. I've never felt more at ease in a hospital setting. Truly exceptional.", rating: 5 },
];

const features = [
  { icon: faStethoscope,   title: "Specialist Doctors",   desc: "150+ board-certified specialists across 20+ medical fields."              },
  { icon: faHospital,      title: "Modern Facilities",    desc: "State-of-the-art equipment and sterile, comfortable environments."         },
  { icon: faClock,         title: "24/7 Emergency",       desc: "Round-the-clock emergency care whenever you need it most."                },
  { icon: faCalendarCheck, title: "Easy Booking",         desc: "Book appointments online in seconds — no long wait times."                },
  { icon: faShieldHeart,   title: "Patient Safety",       desc: "Strict protocols ensure every visit is safe, clean, and professional."     },
  { icon: faAward,         title: "Award-Winning Care",   desc: "Recognised nationally for excellence in patient outcomes and service."      },
];

// ── helpers ───────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function CountUp({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const steps = 60;
        const inc = target / steps;
        let cur = 0;
        const t = setInterval(() => {
          cur += inc;
          if (cur >= target) { setCount(target); clearInterval(t); }
          else setCount(Math.floor(cur));
        }, 2000 / steps);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
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

// ── component ─────────────────────────────────────────────
export default function About() {
  const { doctorsData } = useContext(AppContext);
  const team = doctorsData ? doctorsData.slice(0, 4) : [];

  return (
    <div className="font-sans bg-white text-gray-900 overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────── */}
      <div className="relative bg-gradient-to-br from-blue-600 to-blue-900 text-white py-24 px-6 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-white opacity-5 rounded-full" />
        <div className="absolute -bottom-24 -left-16 w-80 h-80 bg-white opacity-5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500 opacity-10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-white bg-opacity-20 text-white text-xs font-bold tracking-widest px-5 py-1.5 rounded-full mb-6 uppercase"
              style={{ animation: "fadeDown 0.6s ease both" }}>
              About Lifeline
            </span>
            <h1 className="text-5xl font-extrabold leading-tight mb-6"
              style={{ animation: "fadeDown 0.6s ease 0.1s both" }}>
              Caring for Lives,<br />
              <span className="text-blue-200">One Patient</span><br />
              at a Time
            </h1>
            <p className="text-blue-100 text-base leading-relaxed mb-8 max-w-md"
              style={{ animation: "fadeDown 0.6s ease 0.2s both" }}>
              We believe healthcare should be personal, compassionate, and accessible to everyone — no matter where you are in life.
            </p>
            <div className="flex gap-4 flex-wrap" style={{ animation: "fadeDown 0.6s ease 0.3s both" }}>
              <a href="/appointment/1" className="inline-flex items-center gap-2 bg-white text-blue-700 font-extrabold px-6 py-3 rounded-xl hover:bg-blue-50 transition duration-200 text-sm shadow-lg">
                Book Appointment <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </a>
              <a href="/doctors" className="inline-flex items-center gap-2 border-2 border-white border-opacity-40 text-white font-bold px-6 py-3 rounded-xl hover:bg-white hover:bg-opacity-10 transition duration-200 text-sm">
                <FontAwesomeIcon icon={faUserDoctor} /> Our Doctors
              </a>
            </div>
          </div>

          {/* floating card grid */}
          <div className="hidden lg:grid grid-cols-2 gap-4" style={{ animation: "fadeUp 0.7s ease 0.3s both" }}>
            {[
              { icon: faUserDoctor,   label: "Doctors",     val: "150+"  },
              { icon: faHospital,     label: "Branches",    val: "4"     },
              { icon: faHeartPulse,   label: "Patients",    val: "12K+"  },
              { icon: faStar,         label: "Rating",      val: "4.9"   },
            ].map((c, i) => (
              <div key={i} className="bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 rounded-2xl p-5 text-center hover:bg-opacity-20 transition duration-200">
                <FontAwesomeIcon icon={c.icon} className="text-blue-200 text-2xl mb-2" />
                <div className="text-2xl font-extrabold">{c.val}</div>
                <div className="text-blue-200 text-xs font-semibold mt-0.5">{c.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── STATS ────────────────────────────────────────── */}
      <div className="bg-blue-900 py-14 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center">
          {stats.map((s, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="text-4xl font-extrabold tracking-tight mb-1">
                <CountUp target={s.number} suffix={s.suffix} />
              </div>
              <div className="text-blue-200 text-xs font-bold uppercase tracking-widest">{s.label}</div>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* ── OUR STORY ────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <span className="inline-block bg-blue-50 text-blue-600 text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">Our Story</span>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-5 leading-snug">
              Built on Trust,<br />Driven by Care
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Lifeline was founded with a single mission — to make quality healthcare accessible to everyone. We started as a small clinic and have grown into a trusted medical platform serving thousands of patients.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed mb-7">
              Our team of dedicated doctors, nurses, and healthcare professionals work tirelessly to ensure that every patient receives personalized, compassionate care.
            </p>
            <div className="space-y-3">
              {["Board-certified specialist doctors", "State-of-the-art medical equipment", "Patient-centered care approach", "Affordable healthcare for all"].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faCircleCheck} className="text-blue-500 text-base flex-shrink-0" />
                  <span className="text-sm text-gray-600 font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* Image collage */}
          <FadeUp delay={0.15}>
            <div className="grid grid-cols-2 gap-3">
              <img src="https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=300&h=300&fit=crop" alt="" className="w-full h-44 object-cover rounded-2xl" />
              <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=300&h=300&fit=crop" alt="" className="w-full h-44 object-cover rounded-2xl mt-6" />
              <img src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=300&h=300&fit=crop" alt="" className="w-full h-44 object-cover rounded-2xl -mt-6" />
              <img src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=300&fit=crop" alt="" className="w-full h-44 object-cover rounded-2xl" />
            </div>
          </FadeUp>
        </div>
      </div>

      {/* ── WHY CHOOSE US ─────────────────────────────────── */}
      <div className="bg-gray-50 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <div className="text-center mb-12">
              <span className="inline-block bg-blue-50 text-blue-600 text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">Why Choose Us</span>
              <h2 className="text-3xl font-extrabold text-gray-900">What Sets Us Apart</h2>
            </div>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-200 hover:shadow-md transition duration-200 group h-full">
                  <div className="w-11 h-11 bg-blue-50 group-hover:bg-blue-600 rounded-xl flex items-center justify-center mb-4 transition duration-200">
                    <FontAwesomeIcon icon={f.icon} className="text-blue-600 group-hover:text-white transition duration-200" />
                  </div>
                  <div className="font-extrabold text-gray-900 mb-2">{f.title}</div>
                  <div className="text-sm text-gray-500 leading-relaxed">{f.desc}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>

      {/* ── VALUES ────────────────────────────────────────── */}
      <div className="bg-gray-900 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <div className="text-center mb-12">
              <span className="inline-block bg-gray-800 text-blue-400 text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">Our Values</span>
              <h2 className="text-3xl font-extrabold text-white">What We Stand For</h2>
            </div>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="bg-gray-800 rounded-2xl p-7 hover:bg-gray-700 transition duration-200 group h-full">
                  <div className="w-12 h-12 bg-blue-600 bg-opacity-20 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-600 transition duration-200">
                    <FontAwesomeIcon icon={v.icon} className="text-blue-400 text-lg group-hover:text-white transition duration-200" />
                  </div>
                  <div className="font-extrabold text-white mb-2">{v.title}</div>
                  <div className="text-sm text-gray-400 leading-relaxed">{v.desc}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>

      {/* ── TIMELINE ──────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        <FadeUp>
          <div className="text-center mb-14">
            <span className="inline-block bg-blue-50 text-blue-600 text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">Our Journey</span>
            <h2 className="text-3xl font-extrabold text-gray-900">How We Got Here</h2>
          </div>
        </FadeUp>
        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-blue-100 hidden md:block" />
          <div className="space-y-8">
            {milestones.map((m, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="flex gap-6 items-start">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-extrabold z-10 shadow-md">
                      {m.year.slice(2)}
                    </div>
                  </div>
                  <div className="bg-white border border-gray-100 rounded-2xl p-5 flex-1 hover:border-blue-200 hover:shadow-sm transition duration-200">
                    <div className="text-xs text-blue-600 font-extrabold mb-0.5 uppercase tracking-wide">{m.year}</div>
                    <div className="font-extrabold text-gray-900 mb-1">{m.title}</div>
                    <div className="text-sm text-gray-500 leading-relaxed">{m.desc}</div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>

      {/* ── TEAM ─────────────────────────────────────────── */}
      <div className="bg-gray-50 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="inline-block bg-white text-blue-600 text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 border border-blue-100">Our Team</span>
                <h2 className="text-3xl font-extrabold text-gray-900">Meet Our Doctors</h2>
              </div>
              <a href="/doctors" className="text-blue-600 text-sm font-bold hover:underline hidden md:flex items-center gap-1">
                View All <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </a>
            </div>
          </FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 group">
                  <div className="relative overflow-hidden">
                    <img src={member.image} alt={member.name} className="w-full h-48 object-cover group-hover:scale-105 transition duration-300" />
                    <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-10 transition duration-300" />
                  </div>
                  <div className="p-4">
                    <div className="font-extrabold text-sm text-gray-900 mb-0.5">{member.name}</div>
                    <div className="text-xs text-blue-600 font-bold">{member.speciality}</div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>

      {/* ── TESTIMONIALS ──────────────────────────────────── */}
      <div className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <div className="text-center mb-12">
              <span className="inline-block bg-blue-50 text-blue-600 text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">Testimonials</span>
              <h2 className="text-3xl font-extrabold text-gray-900">What Our Patients Say</h2>
            </div>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-7 hover:shadow-md transition duration-200 h-full flex flex-col">
                  <FontAwesomeIcon icon={faQuoteLeft} className="text-blue-200 text-3xl mb-4" />
                  <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-5">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-extrabold text-sm flex-shrink-0">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-extrabold text-sm text-gray-900">{t.name}</div>
                      <div className="text-xs text-gray-400">{t.role}</div>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                      {[...Array(t.rating)].map((_, i) => (
                        <FontAwesomeIcon key={i} icon={faStar} className="text-amber-400 text-xs" />
                      ))}
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ──────────────────────────────────────────── */}
      <div className="mx-6 mb-16 rounded-3xl bg-gradient-to-br from-blue-600 to-blue-900 px-8 py-16 text-center text-white max-w-5xl md:mx-auto relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full translate-x-20 -translate-y-20" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -translate-x-16 translate-y-16" />
        <FadeUp>
          <div className="relative z-10">
            <FontAwesomeIcon icon={faPhone} className="text-blue-200 text-3xl mb-5" />
            <h2 className="text-3xl font-extrabold mb-3">Ready to Get Started?</h2>
            <p className="text-blue-100 text-sm mb-8 font-semibold max-w-md mx-auto">Book an appointment with our expert doctors today and take the first step towards better health.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a href="/appointment/1" className="inline-flex items-center gap-2 bg-white text-blue-700 font-extrabold px-8 py-3.5 rounded-xl hover:bg-blue-50 transition duration-200 text-sm shadow-lg">
                Book Appointment <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </a>
              <a href="/contact" className="inline-flex items-center gap-2 border-2 border-white border-opacity-50 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-white hover:bg-opacity-10 transition duration-200 text-sm">
                Contact Us
              </a>
            </div>
          </div>
        </FadeUp>
      </div>

      {/* keyframes */}
      <style>{`
        @keyframes fadeDown { from { opacity:0; transform:translateY(-20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeUp   { from { opacity:0; transform:translateY(20px);  } to { opacity:1; transform:translateY(0); } }
      `}</style>

    </div>
  );
}