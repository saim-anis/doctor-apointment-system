import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseMedical, faEnvelope, faLock, faEye, faEyeSlash,
  faUser, faCircleCheck, faArrowRight, faGoogle
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle as faGoogleBrand } from "@fortawesome/free-brands-svg-icons";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

const perks = [
  "Book appointments with 150+ specialist doctors",
  "Access your medical records anytime",
  "Get reminders for upcoming appointments",
  "24/7 emergency support hotline",
];

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm]           = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPass, setShowPass]   = useState(false);
  const [showConf, setShowConf]   = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const [focused, setFocused]     = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const validate = () => {
    if (!form.name.trim())              return "Please enter your full name.";
    if (!form.email.includes("@"))      return "Please enter a valid email address.";
    if (form.password.length < 6)       return "Password must be at least 6 characters.";
    if (form.password !== form.confirm) return "Passwords do not match.";
    return null;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return setError(err);
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, form.email, form.password);
      navigate("/");
    } catch (err) {
      const msgs = {
        "auth/email-already-in-use": "This email is already registered. Try logging in.",
        "auth/invalid-email":        "Invalid email address.",
        "auth/weak-password":        "Password is too weak.",
      };
      setError(msgs[err.code] || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch {
      setError("Google sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full pl-11 pr-4 py-3.5 rounded-xl border-2 text-sm font-semibold outline-none transition duration-200 bg-white ${
      focused === field
        ? "border-blue-500 bg-blue-50"
        : error && !form[field]
        ? "border-red-300 bg-red-50"
        : "border-gray-200 hover:border-gray-300"
    }`;

  const strength = () => {
    const p = form.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 6)              s++;
    if (p.length >= 10)             s++;
    if (/[A-Z]/.test(p))            s++;
    if (/[0-9]/.test(p))            s++;
    if (/[^A-Za-z0-9]/.test(p))     s++;
    return s;
  };
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong", "Very Strong"];
  const strengthColor = ["", "bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-blue-500", "bg-green-500"];
  const s = strength();

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex">

      {/* ── LEFT PANEL ────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-5/12 bg-gray-900 text-white flex-col justify-between p-12 relative overflow-hidden">

        {/* bg decoration */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-600 opacity-15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-10 w-64 h-64 bg-blue-500 opacity-10 rounded-full blur-3xl pointer-events-none" />

        {/* Logo */}
        <div className="flex items-center gap-3 relative z-10" style={{ animation: "fadeUp 0.5s ease both" }}>
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <FontAwesomeIcon icon={faHouseMedical} className="text-white text-lg" />
          </div>
          <span className="italic text-2xl font-extrabold">Lifeline</span>
        </div>

        {/* Main text */}
        <div className="relative z-10" style={{ animation: "fadeUp 0.5s ease 0.1s both" }}>
          <div className="flex items-center gap-2 mb-5">
            <div className="h-px w-8 bg-blue-500"></div>
            <span className="text-blue-400 text-xs font-extrabold uppercase tracking-widest">Join Today</span>
          </div>
          <h2 className="text-4xl font-extrabold leading-tight mb-5">
            Your health<br />
            <span className="text-blue-400">deserves</span><br />
            the best care.
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-xs">
            Create your Lifeline account and unlock access to Pakistan's finest medical specialists.
          </p>

          <div className="space-y-3">
            {perks.map((p, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-gray-300">
                <FontAwesomeIcon icon={faCircleCheck} className="text-blue-400 flex-shrink-0" />
                {p}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <div className="text-xs text-gray-600 relative z-10" style={{ animation: "fadeUp 0.5s ease 0.2s both" }}>
          Trusted by 12,000+ patients across Pakistan
        </div>
      </div>

      {/* ── RIGHT PANEL — FORM ────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md" style={{ animation: "fadeUp 0.5s ease 0.05s both" }}>

          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faHouseMedical} className="text-white text-sm" />
            </div>
            <span className="italic text-xl font-extrabold text-gray-900">Lifeline</span>
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Create Account</h1>
          <p className="text-sm text-gray-500 mb-7">Join Lifeline and start your health journey today.</p>

          {/* Google Button */}
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 border-2 border-gray-200 hover:border-gray-300 bg-white text-gray-700 font-bold py-3 rounded-xl transition duration-200 text-sm mb-5 hover:shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.5 0 6.5 1.2 8.9 3.2l6.6-6.6C35.5 2.5 30.1 0 24 0 14.7 0 6.8 5.4 2.9 13.3l7.7 6C12.4 13.2 17.7 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8C43.5 37.5 46.5 31.4 46.5 24.5z"/>
              <path fill="#FBBC05" d="M10.6 28.7A14.7 14.7 0 0 1 9.5 24c0-1.6.3-3.2.8-4.7l-7.7-6A23.9 23.9 0 0 0 0 24c0 3.9.9 7.5 2.6 10.8l8-6.1z"/>
              <path fill="#34A853" d="M24 48c6.1 0 11.2-2 14.9-5.4l-7.5-5.8c-2 1.4-4.6 2.2-7.4 2.2-6.3 0-11.6-3.7-13.4-9l-8 6.1C6.8 42.6 14.7 48 24 48z"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs text-gray-400 font-semibold">or sign up with email</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-semibold px-4 py-3 rounded-xl mb-4">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-4">

            {/* Full Name */}
            <div className="relative">
              <FontAwesomeIcon icon={faUser} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                name="name" required value={form.name} onChange={handleChange}
                placeholder="Full Name"
                onFocus={() => setFocused("name")} onBlur={() => setFocused("")}
                className={inputClass("name")}
              />
            </div>

            {/* Email */}
            <div className="relative">
              <FontAwesomeIcon icon={faEnvelope} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                name="email" type="email" required value={form.email} onChange={handleChange}
                placeholder="Email Address"
                onFocus={() => setFocused("email")} onBlur={() => setFocused("")}
                className={inputClass("email")}
              />
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <FontAwesomeIcon icon={faLock} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  name="password" type={showPass ? "text" : "password"} required
                  value={form.password} onChange={handleChange}
                  placeholder="Password"
                  onFocus={() => setFocused("password")} onBlur={() => setFocused("")}
                  className={`${inputClass("password")} pr-11`}
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition">
                  <FontAwesomeIcon icon={showPass ? faEyeSlash : faEye} className="text-sm" />
                </button>
              </div>
              {/* Strength bar */}
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1,2,3,4,5].map(n => (
                      <div key={n} className={`h-1 flex-1 rounded-full transition-all duration-300 ${n <= s ? strengthColor[s] : "bg-gray-200"}`} />
                    ))}
                  </div>
                  <span className={`text-xs font-bold ${s <= 1 ? "text-red-500" : s <= 2 ? "text-orange-500" : s <= 3 ? "text-yellow-500" : "text-green-600"}`}>
                    {strengthLabel[s]}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <FontAwesomeIcon icon={faLock} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                name="confirm" type={showConf ? "text" : "password"} required
                value={form.confirm} onChange={handleChange}
                placeholder="Confirm Password"
                onFocus={() => setFocused("confirm")} onBlur={() => setFocused("")}
                className={`${inputClass("confirm")} pr-11 ${
                  form.confirm && form.password !== form.confirm ? "border-red-300" :
                  form.confirm && form.password === form.confirm ? "border-green-400" : ""
                }`}
              />
              <button type="button" onClick={() => setShowConf(!showConf)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition">
                <FontAwesomeIcon icon={showConf ? faEyeSlash : faEye} className="text-sm" />
              </button>
              {form.confirm && form.password === form.confirm && (
                <FontAwesomeIcon icon={faCircleCheck} className="absolute right-10 top-1/2 -translate-y-1/2 text-green-500 text-sm" />
              )}
            </div>

            {/* Terms */}
            <p className="text-xs text-gray-400 leading-relaxed">
              By creating an account, you agree to our{" "}
              <span className="text-blue-600 font-bold cursor-pointer hover:underline">Terms of Service</span>{" "}
              and{" "}
              <span className="text-blue-600 font-bold cursor-pointer hover:underline">Privacy Policy</span>.
            </p>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-extrabold py-3.5 rounded-xl transition duration-200 text-sm shadow-lg mt-2"
            >
              {loading ? (
                <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                </svg>
              ) : (
                <>Create Account <FontAwesomeIcon icon={faArrowRight} className="text-xs" /></>
              )}
            </button>
          </form>

          {/* Login link */}
          <p className="text-sm text-center text-gray-500 mt-6">
            Already have an account?{" "}
            <NavLink to="/login" className="text-blue-600 font-extrabold hover:underline">
              Log In
            </NavLink>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
    </div>
  );
}