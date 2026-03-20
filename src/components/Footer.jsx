import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faHouseMedical, faPhone, faEnvelope, faArrowUp,
  faHouse, faUserDoctor, faCalendarCheck, faInfoCircle,
  faAddressBook, faFileShield, faTags, faNewspaper,
  faStethoscope, faTag, faHeart
} from "@fortawesome/free-solid-svg-icons"
import { faInstagram, faFacebook, faXTwitter, faLinkedin, faDribbble } from "@fortawesome/free-brands-svg-icons"

const links = {
  company: [
    { label: 'Home',           path: '/',           icon: faHouse         },
    { label: 'About',          path: '/about',       icon: faInfoCircle    },
    { label: 'Doctors',        path: '/doctors',     icon: faUserDoctor    },
    { label: 'Appointment',    path: '/appointment/1',icon: faCalendarCheck },
    { label: 'Contact Us',     path: '/contact',     icon: faAddressBook   },
    { label: 'Privacy Policy', path: '#',            icon: faFileShield    },
  ],
  pages: [
    { label: 'Services',  path: '/services', icon: faStethoscope },
    { label: 'Pricing',   path: '/pricing',  icon: faTag         },
    { label: 'Blog',      path: '/blog',     icon: faNewspaper   },
    { label: '404 Page',  path: '/404',      icon: faFileShield  },
  ],
}

const socials = [
  { icon: faFacebook,  href: '#',                                  label: 'Facebook'  },
  { icon: faInstagram, href: '#',                                  label: 'Instagram' },
  { icon: faXTwitter,  href: '#',                                  label: 'Twitter'   },
  { icon: faLinkedin,  href: '#',                                  label: 'LinkedIn'  },
  { icon: faDribbble,  href: 'https://dribbble.com/Saimanis',      label: 'Dribbble'  },
]

export default function Footer() {
  const navigate = useNavigate()
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <>
      {/* ── FOOTER ──────────────────────────────────────── */}
      <footer className="bg-white text-gray-500 font-sans">

        {/* Top wave divider */}
        <div className="bg-gray-50">
          <svg viewBox="0 0 1440 60" className="w-full block" preserveAspectRatio="none" style={{ height: 10 }}>
            <path fill="#00000" d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>

        <div className="px-6 pb-10">

          {/* Main grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-12 border-b border-gray-200">

            {/* ── Brand ─────────────────────────────────── */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
                  <FontAwesomeIcon icon={faHouseMedical} className="text-white text-base" />
                </div>
                <span className="italic text-2xl font-extrabold text-dark-900">Lifeline</span>
              </div>
              <p className="text-sm leading-relaxed text-gray-500 mb-6">
                We care about you and your family's health every step of the way. Our doctors and staff work together to offer the best possible medical support.
              </p>

              {/* Socials */}
              <div className="flex items-center gap-2">
                {socials.map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                    title={s.label}
                    className={`w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center transition duration-200 hover:scale-110 ${
                      s.label === 'Dribbble'
                        ? 'hover:bg-pink-600 hover:border-pink-600 text-pink-400'
                        : 'hover:bg-blue-600 hover:border-blue-600 hover:text-white'
                    }`}>
                    <FontAwesomeIcon icon={s.icon} className="text-sm" />
                  </a>
                ))}
              </div>
            </div>

            {/* ── Company ───────────────────────────────── */}
            <div>
              <p className="text-gray-900 font-extrabold text-sm uppercase tracking-widest mb-5">Company</p>
              <ul className="space-y-3">
                {links.company.map((l, i) => (
                  <li key={i}>
                    <button onClick={() => navigate(l.path)}
                      className="flex items-center gap-2.5 text-sm text-gray-500 hover:text-gray-900 transition duration-200 group">
                      <FontAwesomeIcon icon={l.icon} className="text-xs text-gray-400 group-hover:text-blue-500 transition duration-200 w-3" />
                      <span className="group-hover:translate-x-1 transition duration-200">{l.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Pages ─────────────────────────────────── */}
            <div>
              <p className="text-gray-900 font-extrabold text-sm uppercase tracking-widest mb-5">Pages</p>
              <ul className="space-y-3">
                {links.pages.map((l, i) => (
                  <li key={i}>
                    <button onClick={() => navigate(l.path)}
                      className="flex items-center gap-2.5 text-sm text-gray-500 hover:text-gray-900 transition duration-200 group">
                      <FontAwesomeIcon icon={l.icon} className="text-xs text-gray-400 group-hover:text-blue-500 transition duration-200 w-3" />
                      <span className="group-hover:translate-x-1 transition duration-200">{l.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Contact ───────────────────────────────── */}
            <div>
              <p className="text-gray-900 font-extrabold text-sm uppercase tracking-widest mb-5">Get In Touch</p>
              <ul className="space-y-4">
                <li>
                  <a href="tel:+923323543871"
                    className="flex items-start gap-3 text-sm text-gray-500 hover:text-gray-900 transition duration-200 group">
                    <div className="w-8 h-8 bg-gray-100 group-hover:bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 transition duration-200">
                      <FontAwesomeIcon icon={faPhone} className="text-xs" />
                    </div>
                    <span className="pt-1.5">+92 332 3543871</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:Lifelinecare@gmail.com"
                    className="flex items-start gap-3 text-sm text-gray-500 hover:text-gray-900 transition duration-200 group">
                    <div className="w-8 h-8 bg-gray-100 group-hover:bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 transition duration-200">
                      <FontAwesomeIcon icon={faEnvelope} className="text-xs" />
                    </div>
                    <span className="pt-1.5">Lifelinecare@gmail.com</span>
                  </a>
                </li>
              </ul>

              {/* Book CTA */}
              <button onClick={() => navigate('/appointment/1')}
                className="mt-7 w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold py-3 rounded-xl transition duration-200 flex items-center justify-center gap-2">
                <FontAwesomeIcon icon={faCalendarCheck} className="text-xs" />
                Book Appointment
              </button>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <p className="font-semibold">
              Copyright {new Date().getFullYear()} © <span className="text-gray-900 font-extrabold">Lifeline</span> — All Rights Reserved
            </p>
            <p className="flex items-center gap-1.5 font-semibold">
              Designed with <FontAwesomeIcon icon={faHeart} className="text-red-500 text-xs" style={{ animation: 'hb 1.4s ease-in-out infinite' }} /> by{' '}
              <a href="https://dribbble.com/Saimanis" target="_blank" rel="noopener noreferrer"
                className="text-pink-400 font-extrabold hover:text-pink-300 transition duration-200 flex items-center gap-1">
                <FontAwesomeIcon icon={faDribbble} className="text-xs" />
                Saim Design
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* ── SCROLL TO TOP ───────────────────────────────── */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1"
        style={{
          opacity: showTop ? 1 : 0,
          transform: showTop ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)',
          pointerEvents: showTop ? 'auto' : 'none',
        }}
      >
        <FontAwesomeIcon icon={faArrowUp} className="text-sm" />
      </button>

      <style>{`
        @keyframes hb {
          0%,100% { transform: scale(1); }
          14%      { transform: scale(1.3); }
          28%      { transform: scale(1); }
          42%      { transform: scale(1.2); }
          56%      { transform: scale(1); }
        }
      `}</style>
    </>
  )
}