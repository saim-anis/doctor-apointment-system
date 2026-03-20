import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faQuoteLeft } from '@fortawesome/free-solid-svg-icons'

const testimonials = [
  { name: 'Fatima Zahra',    role: 'Patient · Karachi',    rating: 5, text: 'Lifeline changed my life. The cardiologist was incredibly thorough and caring. I felt heard for the first time.',          avatar: 'F' },
  { name: 'Ahmed Siddiqui',  role: 'Patient · Lahore',     rating: 5, text: 'Booking was effortless and the doctor was on time. The entire experience felt world-class from start to finish.',           avatar: 'A' },
  { name: 'Sana Malik',      role: 'Patient · Islamabad',  rating: 5, text: "My son's pediatrician at Lifeline is simply the best. She explains everything in detail and genuinely cares.",             avatar: 'S' },
  { name: 'Bilal Khan',      role: 'Patient · Karachi',    rating: 5, text: 'After years of back pain, the orthopedic team finally gave me a clear diagnosis and a real treatment plan. Grateful.',     avatar: 'B' },
  { name: 'Amna Tariq',      role: 'Patient · Lahore',     rating: 5, text: "The dental department is spotless and painless. First time I've actually looked forward to a checkup!",                   avatar: 'A' },
  { name: 'Usman Chaudhry',  role: 'Patient · Karachi',    rating: 5, text: 'Same-day lab results and the doctor followed up personally. That level of care is rare anywhere in Pakistan.',             avatar: 'U' },
  { name: 'Rabia Noor',      role: 'Patient · Rawalpindi', rating: 5, text: 'The neurologist took time to explain my MRI results in simple terms. I left with clarity and a clear path forward.',       avatar: 'R' },
  { name: 'Zain Abbas',      role: 'Patient · Karachi',    rating: 5, text: "Emergency care at 2am and the team was fully alert. Probably saved my father's life that night.",                         avatar: 'Z' },
]

const avatarColors = [
  'bg-blue-600', 'bg-purple-600', 'bg-green-600', 'bg-rose-600',
  'bg-amber-600', 'bg-teal-600',  'bg-indigo-600','bg-pink-600',
]

function Card({ t, dark = false }) {
  const color = avatarColors[t.name.charCodeAt(0) % avatarColors.length]
  return (
    <div className={`flex-shrink-0 w-72 rounded-3xl p-5 border-2 transition duration-300 hover:-translate-y-1 ${
      dark
        ? 'bg-blue-400 border-gray-700 hover:border-gray-500'
        : 'bg-white border-gray-100 hover:border-blue-200 hover:shadow-lg'
    }`}>
      <div className="flex items-center gap-0.5 mb-2">
        {Array.from({ length: t.rating }).map((_, i) => (
          <FontAwesomeIcon key={i} icon={faStar} className="text-amber-400 text-xs" />
        ))}
      </div>
      <FontAwesomeIcon icon={faQuoteLeft} className={`text-2xl mb-1 ${dark ? 'text-gray-700' : 'text-blue-100'}`} />
      <p className={`text-xs leading-relaxed mb-4 line-clamp-3 ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
        {t.text}
      </p>
      <div className="flex items-center gap-2.5">
        <div className={`w-9 h-9 ${color} rounded-full flex items-center justify-center text-white font-extrabold text-sm flex-shrink-0`}>
          {t.avatar}
        </div>
        <div>
          <div className={`font-extrabold text-sm leading-none mb-0.5 ${dark ? 'text-white' : 'text-gray-900'}`}>{t.name}</div>
          <div className={`text-xs ${dark ? 'text-gray-500' : 'text-gray-400'}`}>{t.role}</div>
        </div>
      </div>
    </div>
  )
}

export default function TestimonialMarquee() {
  return (
    <section className="py-16 bg-gray-50 overflow-hidden">

      {/* Header */}
      <div className="text-center mb-10 px-6">
        <span className="inline-block bg-blue-50 text-blue-600 text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
          Patient Stories
        </span>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">What Our Patients Say</h2>
        <p className="text-gray-500 text-sm max-w-sm mx-auto">Real experiences from real patients across Pakistan</p>
      </div>

      {/* Row 1 — left */}
      <div className="mb-4">
        <div className="flex gap-4" style={{ animation: 'marqueeLeft 35s linear infinite', width: 'max-content' }}>
          {[...testimonials, ...testimonials].map((t, i) => (
            <Card key={i} t={t} />
          ))}
        </div>
      </div>

      {/* Row 2 — right */}
      <div>
        <div className="flex gap-4" style={{ animation: 'marqueeRight 30s linear infinite', width: 'max-content' }}>
          {[...testimonials.slice(4), ...testimonials, ...testimonials.slice(4)].map((t, i) => (
            <Card key={i} t={t} dark />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marqueeLeft  { from { transform: translateX(0); }    to { transform: translateX(-50%); } }
        @keyframes marqueeRight { from { transform: translateX(-50%); } to { transform: translateX(0); }    }
        .line-clamp-3 { display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; }
      `}</style>
    </section>
  )
}