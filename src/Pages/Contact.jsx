import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faXTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import {
  faLocationDot, faPhone, faEnvelope, faClock,
  faCircleCheck, faPaperPlane, faCircleQuestion
} from "@fortawesome/free-solid-svg-icons";

// ── animation hook ────────────────────────────────────────
function useInView(threshold = 0.15) {
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
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transition: `opacity 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ── data ──────────────────────────────────────────────────
const contactCards = [
  { icon: faLocationDot, label: "Our Location",   lines: ["Santana Health Street,", "Karachi, Pakistan"],          iconBg: "bg-rose-100",   iconColor: "text-rose-500"   },
  { icon: faPhone,       label: "Phone Number",   lines: ["+92 332 354 3871", "Mon – Sat, 9am – 6pm"],             iconBg: "bg-blue-100",   iconColor: "text-blue-500"   },
  { icon: faEnvelope,    label: "Email Address",  lines: ["Lifelinecare@gmail.com", "We reply within 24 hours"],   iconBg: "bg-violet-100", iconColor: "text-violet-500" },
];

const workingHours = [
  { day: "Monday – Friday", time: "9:00 AM – 8:00 PM", emergency: false },
  { day: "Saturday",        time: "9:00 AM – 6:00 PM", emergency: false },
  { day: "Sunday",          time: "10:00 AM – 4:00 PM", emergency: false },
  { day: "Emergency",       time: "24 / 7 Available",   emergency: true  },
];

const socials = [
  { label: "Facebook",  icon: faFacebook,  color: "bg-blue-100 text-blue-700"  },
  { label: "Instagram", icon: faInstagram, color: "bg-pink-100 text-pink-700"  },
  { label: "Twitter",   icon: faXTwitter,  color: "bg-sky-100  text-sky-700"   },
  { label: "LinkedIn",  icon: faLinkedin,  color: "bg-blue-100 text-blue-800"  },
];

// ── component ─────────────────────────────────────────────
export default function Contact() {
  const [form, setForm]           = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused]     = useState("");

  const handleChange  = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit  = (e) => { e.preventDefault(); setSubmitted(true); };
  const handleReset   = ()  => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); };

  const inputClass = (field) =>
    `w-full border-2 rounded-xl px-4 py-3 text-sm outline-none transition duration-200 ${
      focused === field ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"
    }`;

  return (
    <div className="font-sans bg-white text-gray-900 overflow-x-hidden">

      {/* ── HERO ──────────────────────────────────────────── */}
      <div className="relative bg-gradient-to-br from-blue-600 to-blue-900 text-white py-20 px-6 text-center overflow-hidden">
        <div className="absolute -top-16 -right-16 w-72 h-72 bg-white opacity-5 rounded-full" />
        <div className="absolute -bottom-20 -left-10 w-64 h-64 bg-white opacity-5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-400 opacity-10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <span
            className="inline-block bg-white bg-opacity-20 text-white text-xs font-bold tracking-widest px-5 py-1.5 rounded-full mb-5 uppercase"
            style={{ animation: "fadeDown 0.5s ease both" }}
          >
            Contact Us
          </span>
          <h1
            className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight"
            style={{ animation: "fadeDown 0.5s ease 0.1s both" }}
          >
            We're Here to Help
          </h1>
          <p
            className="text-base opacity-85 max-w-lg mx-auto leading-relaxed font-semibold"
            style={{ animation: "fadeDown 0.5s ease 0.2s both" }}
          >
            Have questions or need to book an appointment? Reach out to us anytime — our team is ready to assist you.
          </p>
        </div>
      </div>

      {/* ── CONTACT CARDS ─────────────────────────────────── */}
      <div className="bg-blue-50 py-12 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5">
          {contactCards.map((c, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="bg-white rounded-2xl shadow-sm p-6 text-center hover:shadow-md hover:-translate-y-1 transition duration-300 h-full">
                <div className={`w-12 h-12 ${c.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <FontAwesomeIcon icon={c.icon} className={`${c.iconColor} text-lg`} />
                </div>
                <div className="font-extrabold text-gray-900 mb-2">{c.label}</div>
                {c.lines.map((l, j) => (
                  <div key={j} className="text-sm text-gray-500">{l}</div>
                ))}
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* ── FORM + MAP ────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Contact Form */}
          <FadeUp delay={0.05}>
            <span className="inline-block bg-blue-50 text-blue-600 text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
              Send a Message
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Get in Touch</h2>
            <p className="text-sm text-gray-500 mb-8 leading-relaxed">
              Fill out the form below and our team will get back to you as soon as possible.
            </p>

            {submitted ? (
              <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center"
                style={{ animation: "popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both" }}>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FontAwesomeIcon icon={faCircleCheck} className="text-green-500 text-3xl" />
                </div>
                <div className="font-extrabold text-green-700 text-xl mb-2">Message Sent!</div>
                <div className="text-sm text-green-600 mb-6">Thank you for reaching out. We'll get back to you within 24 hours.</div>
                <button onClick={handleReset}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl transition duration-200 text-sm">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Full Name *</label>
                    <input name="name" required value={form.name} onChange={handleChange} placeholder="Your Name"
                      onFocus={() => setFocused("name")} onBlur={() => setFocused("")}
                      className={inputClass("name")} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Phone Number</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="+92 300 1234567"
                      onFocus={() => setFocused("phone")} onBlur={() => setFocused("")}
                      className={inputClass("phone")} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Email Address *</label>
                  <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="Enter email"
                    onFocus={() => setFocused("email")} onBlur={() => setFocused("")}
                    className={inputClass("email")} />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Subject *</label>
                  <select name="subject" required value={form.subject} onChange={handleChange}
                    onFocus={() => setFocused("subject")} onBlur={() => setFocused("")}
                    className={inputClass("subject")}>
                    <option value="">Select a subject</option>
                    <option>Book an Appointment</option>
                    <option>General Inquiry</option>
                    <option>Medical Records</option>
                    <option>Billing & Payments</option>
                    <option>Feedback</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Message *</label>
                  <textarea name="message" required rows={5} value={form.message} onChange={handleChange}
                    placeholder="Write your message here..."
                    onFocus={() => setFocused("message")} onBlur={() => setFocused("")}
                    className={`${inputClass("message")} resize-none`} />
                </div>

                <button type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold py-3.5 rounded-xl transition duration-200 text-sm tracking-wide flex items-center justify-center gap-2">
                  <FontAwesomeIcon icon={faPaperPlane} />
                  Send Message
                </button>
              </form>
            )}
          </FadeUp>

          {/* Map + Info */}
          <FadeUp delay={0.15}>
            <div className="flex flex-col gap-6">

              {/* Map */}
              <div>
                <span className="inline-block bg-blue-50 text-blue-600 text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                  Find Us
                </span>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Our Location</h2>
                <div className="rounded-2xl overflow-hidden shadow-sm border-2 border-gray-100">
                  <iframe
                    title="Lifeline Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57898.56219463658!2d67.01011!3d24.8607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e06651d4bbf%3A0x9cf92f44555a0c23!2sKarachi%2C%20Pakistan!5e0!3m2!1sen!2s!4v1234567890"
                    width="100%" height="240"
                    style={{ border: 0, display: "block" }}
                    allowFullScreen="" loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              {/* Working Hours */}
              <div className="bg-gray-900 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-2 font-extrabold mb-5">
                  <FontAwesomeIcon icon={faClock} className="text-blue-400" />
                  Working Hours
                </div>
                <div className="space-y-3">
                  {workingHours.map((h, i) => (
                    <div key={i} className="flex justify-between items-center text-sm border-b border-gray-800 pb-3 last:border-0 last:pb-0">
                      <span className="text-gray-400 font-semibold">{h.day}</span>
                      <span className={`font-bold text-xs px-2.5 py-1 rounded-full ${
                        h.emergency ? "bg-green-500 bg-opacity-20 text-green-400" : "bg-blue-500 bg-opacity-20 text-blue-400"
                      }`}>
                        {h.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social */}
              <div className="bg-white rounded-2xl shadow-sm p-6 border-2 border-gray-100">
                <div className="font-extrabold text-gray-900 mb-4">Follow Us</div>
                <div className="flex gap-3">
                  {socials.map((s, i) => (
                    <button key={i} className={`flex-1 ${s.color} rounded-xl py-3 text-xs font-bold flex flex-col items-center gap-1.5 hover:opacity-80 hover:scale-105 transition duration-200`}>
                      <FontAwesomeIcon icon={s.icon} className="text-lg" />
                      <span>{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </FadeUp>
        </div>
      </div>

      {/* ── FAQ STRIP ─────────────────────────────────────── */}
      <FadeIn>
        <div className="bg-blue-50 py-16 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm">
              <FontAwesomeIcon icon={faCircleQuestion} className="text-blue-600 text-2xl" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Still have questions?</h2>
            <p className="text-sm text-gray-500 mb-7">Check our FAQ page or call us directly for immediate assistance.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+923323543871"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl transition duration-200 text-sm">
                <FontAwesomeIcon icon={faPhone} />
                Call Now
              </a>
              <a href="mailto:Lifelinecare@gmail.com"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 font-bold px-8 py-3 rounded-xl transition duration-200 text-sm">
                <FontAwesomeIcon icon={faEnvelope} />
                Send Email
              </a>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* keyframes */}
      <style>{`
        @keyframes fadeDown { from { opacity:0; transform:translateY(-18px); } to { opacity:1; transform:translateY(0); } }
        @keyframes popIn   { from { opacity:0; transform:scale(0.85);        } to { opacity:1; transform:scale(1);    } }
      `}</style>

    </div>
  );
}