import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck, faArrowRight, faStar, faShieldHeart,
  faHeartPulse, faTooth, faBone, faEye, faBrain, faStethoscope,
  faPhone, faCrown
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
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

// ── data ──────────────────────────────────────────────────
const plans = [
  {
    name: "Basic",
    price: 999,
    period: "/ month",
    desc: "Perfect for individuals needing essential healthcare coverage.",
    color: "border-gray-200",
    badge: null,
    btnClass: "bg-gray-900 hover:bg-gray-700 text-white",
    features: [
      "2 GP Consultations / month",
      "Basic Lab Tests",
      "Emergency Hotline Access",
      "Online Appointment Booking",
      "Medical Records Access",
    ],
    missing: ["Specialist Consultations", "Dental & Vision Care", "Home Visit Service"],
  },
  {
    name: "Standard",
    price: 2499,
    period: "/ month",
    desc: "Comprehensive care for families with regular health needs.",
    color: "border-blue-500",
    badge: "Most Popular",
    btnClass: "bg-blue-600 hover:bg-blue-700 text-white",
    features: [
      "5 GP Consultations / month",
      "Full Lab Test Panel",
      "Emergency Hotline Access",
      "Online Appointment Booking",
      "Medical Records Access",
      "2 Specialist Consultations",
      "Dental Checkup (1x / month)",
    ],
    missing: ["Home Visit Service"],
  },
  {
    name: "Premium",
    price: 4999,
    period: "/ month",
    desc: "All-inclusive plan for those who want the very best care.",
    color: "border-amber-400",
    badge: "Best Value",
    btnClass: "bg-amber-500 hover:bg-amber-600 text-white",
    features: [
      "Unlimited GP Consultations",
      "Full Lab Test Panel",
      "24 / 7 Emergency Hotline",
      "Priority Appointment Booking",
      "Medical Records Access",
      "Unlimited Specialist Access",
      "Dental & Vision Care",
      "Home Visit Service (2x / month)",
    ],
    missing: [],
  },
];

const services = [
  { icon: faHeartPulse, name: "Cardiology",    price: "Rs. 2,500" },
  { icon: faTooth,      name: "Dental",        price: "Rs. 1,500" },
  { icon: faBone,       name: "Orthopedics",   price: "Rs. 3,000" },
  { icon: faEye,        name: "Ophthalmology", price: "Rs. 2,000" },
  { icon: faBrain,      name: "Neurology",     price: "Rs. 3,500" },
  { icon: faStethoscope,name: "General GP",    price: "Rs. 800"   },
];

const faqs = [
  { q: "Can I cancel my plan anytime?",             a: "Yes, you can cancel or downgrade your plan at any time with no cancellation fees. Changes take effect at the next billing cycle."                },
  { q: "Are specialist visits included?",           a: "Standard and Premium plans include specialist consultations. Basic plan members can add specialist visits at a discounted per-visit rate."      },
  { q: "Is my family covered under one plan?",      a: "Each plan covers one individual. We offer family bundles at a 20% discount — contact us for details."                                          },
  { q: "What payment methods are accepted?",        a: "We accept all major debit/credit cards, bank transfers, JazzCash, and EasyPaisa."                                                              },
];

// ── component ─────────────────────────────────────────────
export default function Pricing() {
  const [billing, setBilling] = useState("monthly");
  const [openFaq, setOpenFaq] = useState(null);

  const multiplier = billing === "yearly" ? 10 : 1; // yearly = 10 months price
  const discount   = billing === "yearly";

  return (
    <div className="font-sans bg-white text-gray-900 overflow-x-hidden">

      {/* ── HERO — split minimal style ────────────────────── */}
      <div className="bg-white border-b-2 border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left — text */}
          <div style={{ animation: "fadeUp 0.6s ease both" }}>
            <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-xs font-extrabold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              No hidden fees · Cancel anytime
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-none tracking-tight mb-5">
              Plans that<br />
              <span className="text-blue-600">fit your</span><br />
              health.
            </h1>
            <p className="text-gray-500 text-base leading-relaxed max-w-md mb-8">
              Choose the right coverage for you or your family. Transparent pricing, world-class doctors, and care you can count on.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center gap-3">
              <span className={`text-sm font-bold transition duration-200 ${billing === "monthly" ? "text-gray-900" : "text-gray-400"}`}>Monthly</span>
              <button
                onClick={() => setBilling(billing === "monthly" ? "yearly" : "monthly")}
                className={`relative w-14 h-7 rounded-full transition duration-300 ${billing === "yearly" ? "bg-blue-600" : "bg-gray-200"}`}
              >
                <span className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${billing === "yearly" ? "left-8" : "left-1"}`} />
              </button>
              <span className={`text-sm font-bold transition duration-200 ${billing === "yearly" ? "text-gray-900" : "text-gray-400"}`}>Yearly</span>
              <span className="bg-green-100 text-green-700 text-xs font-extrabold px-2.5 py-1 rounded-full">Save 17%</span>
            </div>
          </div>

          {/* Right — plan preview cards */}
          <div className="grid grid-cols-3 gap-3" style={{ animation: "fadeUp 0.6s ease 0.15s both" }}>
            {plans.map((plan, i) => (
              <div key={i} className={`rounded-2xl border-2 p-4 text-center transition duration-200 hover:shadow-lg cursor-pointer ${plan.color} ${plan.badge === "Most Popular" ? "bg-blue-50" : "bg-white"}`}>
                {plan.badge && (
                  <div className={`text-xs font-extrabold mb-2 ${plan.badge === "Most Popular" ? "text-blue-600" : "text-amber-600"}`}>
                    {plan.badge === "Most Popular" ? "Popular" : "Best"}
                  </div>
                )}
                <div className="font-extrabold text-gray-900 text-sm mb-1">{plan.name}</div>
                <div className="text-blue-600 font-extrabold text-base">
                  Rs.{(plan.price * (billing === "yearly" ? 10 : 1)).toLocaleString()}
                </div>
                <div className="text-gray-400 text-xs mt-0.5">{billing === "yearly" ? "/ yr" : "/ mo"}</div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── PLANS ─────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className={`relative bg-white rounded-3xl border-2 ${plan.color} p-7 hover:shadow-xl transition duration-300 ${plan.badge === "Most Popular" ? "shadow-lg" : ""}`}>

                {/* Badge */}
                {plan.badge && (
                  <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-extrabold flex items-center gap-1.5 ${
                    plan.badge === "Most Popular" ? "bg-blue-600 text-white" : "bg-amber-400 text-amber-900"
                  }`}>
                    {plan.badge === "Best Value" && <FontAwesomeIcon icon={faCrown} className="text-xs" />}
                    {plan.badge === "Most Popular" && <FontAwesomeIcon icon={faStar} className="text-xs" />}
                    {plan.badge}
                  </div>
                )}

                <div className="mb-5">
                  <div className="font-extrabold text-lg text-gray-900 mb-1">{plan.name}</div>
                  <div className="text-sm text-gray-400 leading-relaxed">{plan.desc}</div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-extrabold text-gray-900">
                      Rs. {(plan.price * multiplier).toLocaleString()}
                    </span>
                    <span className="text-gray-400 text-sm font-semibold mb-1">
                      {billing === "yearly" ? "/ year" : plan.period}
                    </span>
                  </div>
                  {discount && (
                    <div className="text-xs text-green-600 font-bold mt-1">
                      Save Rs. {(plan.price * 2).toLocaleString()} vs monthly
                    </div>
                  )}
                </div>

                <a href="/appointment/1"
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition duration-200 mb-7 ${plan.btnClass}`}>
                  Get Started <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                </a>

                {/* Features */}
                <div className="space-y-3">
                  {plan.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-2.5 text-sm text-gray-700">
                      <FontAwesomeIcon icon={faCircleCheck} className="text-green-500 flex-shrink-0" />
                      {f}
                    </div>
                  ))}
                  {plan.missing.map((f, j) => (
                    <div key={j} className="flex items-center gap-2.5 text-sm text-gray-300 line-through">
                      <FontAwesomeIcon icon={faCircleCheck} className="text-gray-200 flex-shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* ── PER-SERVICE PRICING ───────────────────────────── */}
      <div className="bg-gray-50 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <div className="text-center mb-12">
              <span className="inline-block bg-blue-50 text-blue-600 text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
                Pay Per Visit
              </span>
              <h2 className="text-3xl font-extrabold text-gray-900">Individual Service Fees</h2>
              <p className="text-sm text-gray-500 mt-3 max-w-md mx-auto">Don't need a monthly plan? Book individual consultations at transparent flat rates.</p>
            </div>
          </FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div className="bg-white rounded-2xl border border-gray-100 p-6 flex items-center gap-4 hover:border-blue-200 hover:shadow-md transition duration-200 group">
                  <div className="w-12 h-12 bg-blue-50 group-hover:bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 transition duration-200">
                    <FontAwesomeIcon icon={s.icon} className="text-blue-600 group-hover:text-white transition duration-200" />
                  </div>
                  <div>
                    <div className="font-extrabold text-gray-900 text-sm">{s.name}</div>
                    <div className="text-blue-600 font-bold text-sm">{s.price}</div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>

      {/* ── TRUST BADGES ──────────────────────────────────── */}
      <div className="py-16 px-6 border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              {[
                { icon: faShieldHeart, title: "No Hidden Fees",      desc: "All prices are final. What you see is what you pay."          },
                { icon: faStar,        title: "Cancel Anytime",       desc: "No lock-in contracts. Downgrade or cancel at any time."       },
                { icon: faCircleCheck, title: "Instant Activation",   desc: "Your plan activates immediately after payment confirmation."  },
              ].map((b, i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={b.icon} className="text-blue-600 text-lg" />
                  </div>
                  <div className="font-extrabold text-gray-900">{b.title}</div>
                  <div className="text-sm text-gray-500 max-w-xs">{b.desc}</div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>

      {/* ── FAQ ───────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-6 py-20">
        <FadeUp>
          <div className="text-center mb-12">
            <span className="inline-block bg-blue-50 text-blue-600 text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">FAQ</span>
            <h2 className="text-3xl font-extrabold text-gray-900">Frequently Asked Questions</h2>
          </div>
        </FadeUp>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <FadeUp key={i} delay={i * 0.08}>
              <div className="border border-gray-200 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition duration-200"
                >
                  <span className="font-bold text-sm text-gray-900">{f.q}</span>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className={`text-blue-500 text-xs flex-shrink-0 ml-3 transition-transform duration-300 ${openFaq === i ? "rotate-90" : "rotate-0"}`}
                  />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-40" : "max-h-0"}`}>
                  <div className="px-6 pb-5 text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-3">
                    {f.a}
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* ── CTA ───────────────────────────────────────────── */}
      <FadeUp>
        <div className="mx-6 mb-16 rounded-3xl bg-gradient-to-br from-blue-600 to-blue-900 px-8 py-16 text-center text-white max-w-5xl md:mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full translate-x-20 -translate-y-20" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -translate-x-16 translate-y-16" />
          <div className="relative z-10">
            <FontAwesomeIcon icon={faPhone} className="text-blue-200 text-3xl mb-5" />
            <h2 className="text-3xl font-extrabold mb-3">Not Sure Which Plan?</h2>
            <p className="text-blue-100 text-sm mb-8 font-semibold max-w-md mx-auto">
              Talk to our team and we'll help you find the right plan for your health needs and budget.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a href="tel:+923323543871"
                className="inline-flex items-center gap-2 bg-white text-blue-700 font-extrabold px-8 py-3.5 rounded-xl hover:bg-blue-50 transition duration-200 text-sm shadow-lg">
                <FontAwesomeIcon icon={faPhone} className="text-xs" />
                Call Us Now
              </a>
              <a href="/contact"
                className="inline-flex items-center gap-2 border-2 border-white border-opacity-50 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-white hover:bg-opacity-10 transition duration-200 text-sm">
                Contact Us <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </a>
            </div>
          </div>
        </div>
      </FadeUp>

      <style>{`
        @keyframes fadeDown { from { opacity:0; transform:translateY(-18px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
    </div>
  );
}