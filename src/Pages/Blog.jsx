import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass, faArrowRight, faClock, faUser,
  faTag, faHeart, faShareNodes, faBookmark, faFire,
  faStethoscope, faHeartPulse, faBrain, faTooth,
  faBone, faEye, faAppleWhole, faSyringe, faBaby,
  faPersonRunning
} from "@fortawesome/free-solid-svg-icons";

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
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

// ── data ──────────────────────────────────────────────────
const categories = [
  { label: "All",           icon: faStethoscope  },
  { label: "Cardiology",    icon: faHeartPulse   },
  { label: "Neurology",     icon: faBrain        },
  { label: "Dental",        icon: faTooth        },
  { label: "Orthopedics",   icon: faBone         },
  { label: "Eye Care",      icon: faEye          },
  { label: "Nutrition",     icon: faAppleWhole   },
  { label: "Vaccines",      icon: faSyringe      },
  { label: "Pediatrics",    icon: faBaby         },
  { label: "Fitness",       icon: faPersonRunning},
];

const posts = [
  {
    id: 1, category: "Cardiology",
    title: "10 Warning Signs of Heart Disease You Should Never Ignore",
    excerpt: "Early detection of heart disease can save lives. Learn the key symptoms that indicate your heart may need immediate medical attention.",
    author: "Dr. Sara Khan", date: "Feb 28, 2025", readTime: "5 min",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop",
    featured: true, hot: true,
  },
  {
    id: 2, category: "Neurology",
    title: "Understanding Migraines: Causes, Triggers and Effective Treatments",
    excerpt: "Migraines affect millions worldwide. Discover what triggers them, how the brain responds, and the latest treatment options available.",
    author: "Dr. Usman Ali", date: "Feb 22, 2025", readTime: "7 min",
    img: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=400&fit=crop",
    featured: true, hot: false,
  },
  {
    id: 3, category: "Nutrition",
    title: "The Anti-Inflammatory Diet: Foods That Heal Your Body",
    excerpt: "Chronic inflammation is linked to most major diseases. Find out which foods fight inflammation and which ones make it worse.",
    author: "Dr. Ayesha Malik", date: "Feb 18, 2025", readTime: "6 min",
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop",
    featured: false, hot: true,
  },
  {
    id: 4, category: "Dental",
    title: "Beyond Brushing: The Complete Guide to Oral Health",
    excerpt: "Good oral hygiene goes far beyond brushing twice a day. Explore expert tips for keeping your teeth and gums healthy for life.",
    author: "Dr. Ahmad Raza", date: "Feb 14, 2025", readTime: "4 min",
    img: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&h=400&fit=crop",
    featured: false, hot: false,
  },
  {
    id: 5, category: "Fitness",
    title: "How 30 Minutes of Walking Daily Can Transform Your Health",
    excerpt: "Walking is the most underrated form of exercise. Science shows it improves cardiovascular health, mood, and longevity significantly.",
    author: "Dr. Sara Khan", date: "Feb 10, 2025", readTime: "4 min",
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
    featured: false, hot: false,
  },
  {
    id: 6, category: "Pediatrics",
    title: "Childhood Vaccinations: What Parents Need to Know in 2025",
    excerpt: "Vaccine schedules can be confusing for new parents. Here's a complete breakdown of which vaccines your child needs and when.",
    author: "Dr. Ayesha Malik", date: "Feb 06, 2025", readTime: "8 min",
    img: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&h=400&fit=crop",
    featured: false, hot: true,
  },
  {
    id: 7, category: "Eye Care",
    title: "Screen Time and Eye Strain: Protecting Your Vision in the Digital Age",
    excerpt: "Millions of people suffer from digital eye strain. Learn practical techniques to protect your eyesight during long screen hours.",
    author: "Dr. Ahmad Raza", date: "Jan 30, 2025", readTime: "5 min",
    img: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=600&h=400&fit=crop",
    featured: false, hot: false,
  },
  {
    id: 8, category: "Orthopedics",
    title: "Lower Back Pain: Home Remedies vs When to See a Doctor",
    excerpt: "Back pain is among the most common complaints worldwide. Find out when you can treat it at home and when it needs medical care.",
    author: "Dr. Usman Ali", date: "Jan 25, 2025", readTime: "6 min",
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop",
    featured: false, hot: false,
  },
  {
    id: 9, category: "Cardiology",
    title: "Blood Pressure Management: Lifestyle Changes That Actually Work",
    excerpt: "High blood pressure affects 1 in 3 adults. Discover evidence-based lifestyle changes that can bring your numbers down naturally.",
    author: "Dr. Sara Khan", date: "Jan 20, 2025", readTime: "7 min",
    img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
    featured: false, hot: false,
  },
  {
    id: 10, category: "Neurology",
    title: "Sleep Disorders: How Poor Sleep Destroys Your Brain Over Time",
    excerpt: "Chronic sleep deprivation does lasting damage to cognitive function. Learn what's happening in your brain and how to fix it.",
    author: "Dr. Usman Ali", date: "Jan 15, 2025", readTime: "9 min",
    img: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&h=400&fit=crop",
    featured: false, hot: false,
  },
  {
    id: 11, category: "Nutrition",
    title: "Diabetes and Diet: A Practical Guide to Managing Blood Sugar",
    excerpt: "Managing diabetes through diet is possible. We break down the glycemic index, smart food swaps, and meal planning strategies.",
    author: "Dr. Ayesha Malik", date: "Jan 10, 2025", readTime: "8 min",
    img: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=600&h=400&fit=crop",
    featured: false, hot: false,
  },
  {
    id: 12, category: "Vaccines",
    title: "The Science Behind mRNA Vaccines: What You Should Know",
    excerpt: "mRNA technology changed medicine forever. Get a clear, jargon-free explanation of how these vaccines work and why they're safe.",
    author: "Dr. Ahmad Raza", date: "Jan 05, 2025", readTime: "6 min",
    img: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&h=400&fit=crop",
    featured: false, hot: false,
  },
  {
    id: 13, category: "Dental",
    title: "Teeth Whitening: Safe Methods vs Harmful DIY Trends",
    excerpt: "Social media is filled with teeth whitening hacks. We separate the safe from the dangerous and give you dentist-approved options.",
    author: "Dr. Sara Khan", date: "Dec 28, 2024", readTime: "4 min",
    img: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&h=400&fit=crop",
    featured: false, hot: false,
  },
  {
    id: 14, category: "Fitness",
    title: "Strength Training After 40: Building Muscle Safely as You Age",
    excerpt: "It's never too late to build strength. Here's how your exercise approach should change after 40 to get results without injury.",
    author: "Dr. Usman Ali", date: "Dec 22, 2024", readTime: "7 min",
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop",
    featured: false, hot: false,
  },
  {
    id: 15, category: "Pediatrics",
    title: "Signs of Autism in Children: Early Detection Changes Everything",
    excerpt: "Early intervention for autism leads to dramatically better outcomes. Learn the early behavioral signs every parent should know.",
    author: "Dr. Ayesha Malik", date: "Dec 15, 2024", readTime: "8 min",
    img: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=400&fit=crop",
    featured: false, hot: false,
  },
  {
    id: 16, category: "Eye Care",
    title: "Glaucoma: The Silent Thief of Sight and How to Stop It",
    excerpt: "Glaucoma has no symptoms until damage is done. Find out who's at risk, how it's detected, and the treatments that preserve vision.",
    author: "Dr. Ahmad Raza", date: "Dec 10, 2024", readTime: "6 min",
    img: "https://images.unsplash.com/photo-1559757175-7cb02e505e69?w=600&h=400&fit=crop",
    featured: false, hot: false,
  },
  {
    id: 17, category: "Orthopedics",
    title: "Knee Replacement Surgery: Is It Right for You?",
    excerpt: "Knee pain can be debilitating. We explain when knee replacement becomes necessary, what the surgery involves, and recovery timelines.",
    author: "Dr. Usman Ali", date: "Dec 05, 2024", readTime: "9 min",
    img: "https://images.unsplash.com/photo-1576671081837-49000212a370?w=600&h=400&fit=crop",
    featured: false, hot: false,
  },
  {
    id: 18, category: "Neurology",
    title: "Anxiety vs Panic Attacks: Key Differences and How to Cope",
    excerpt: "Many people confuse anxiety and panic attacks. Understanding the difference is the first step towards effective, targeted treatment.",
    author: "Dr. Sara Khan", date: "Nov 28, 2024", readTime: "5 min",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop",
    featured: false, hot: false,
  },
  {
    id: 19, category: "Vaccines",
    title: "Flu Season 2025: Why This Year's Vaccine Matters More",
    excerpt: "This year's flu strains are more aggressive. Here's why experts recommend the vaccine early and who is most vulnerable this season.",
    author: "Dr. Ayesha Malik", date: "Nov 20, 2024", readTime: "5 min",
    img: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600&h=400&fit=crop",
    featured: false, hot: false,
  },
  {
    id: 20, category: "Nutrition",
    title: "Gut Health Revolution: How Your Microbiome Controls Everything",
    excerpt: "The gut-brain connection is real. Science now links microbiome health to immunity, mood, weight, and even chronic disease prevention.",
    author: "Dr. Ahmad Raza", date: "Nov 14, 2024", readTime: "7 min",
    img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop",
    featured: false, hot: false,
  },
];

const POSTS_PER_PAGE = 6;

// ── component ─────────────────────────────────────────────
export default function Blog() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch]                 = useState("");
  const [page, setPage]                     = useState(1);
  const [saved, setSaved]                   = useState([]);

  const featured = posts.filter(p => p.featured);

  const filtered = posts.filter(p => {
    const matchCat  = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = search === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.author.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const totalPages  = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated   = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  const toggleSave = (id) => setSaved(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  // reset page on filter/search change
  useEffect(() => setPage(1), [activeCategory, search]);

  return (
    <div className="font-sans bg-white text-gray-900 overflow-x-hidden">

      {/* ── HERO ──────────────────────────────────────────── */}
      <div className="relative bg-gradient-to-br from-blue-600 to-blue-900 text-white pt-16 pb-24 px-6 overflow-hidden">
        <div className="absolute -top-16 -right-16 w-72 h-72 bg-white opacity-5 rounded-full" />
        <div className="absolute -bottom-20 -left-10 w-64 h-64 bg-white opacity-5 rounded-full" />
        <div className="absolute inset-0 bg-blue-500 opacity-10 blur-3xl pointer-events-none" />
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <span className="inline-block bg-white bg-opacity-20 text-white text-xs font-bold tracking-widest px-5 py-1.5 rounded-full mb-5 uppercase"
            style={{ animation: "fadeDown 0.5s ease both" }}>
            Lifeline Health Blog
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight"
            style={{ animation: "fadeDown 0.5s ease 0.1s both" }}>
            Health Insights &<br />
            <span className="text-blue-200">Expert Advice</span>
          </h1>
          <p className="text-blue-100 text-base leading-relaxed font-semibold mb-8"
            style={{ animation: "fadeDown 0.5s ease 0.2s both" }}>
            Stay informed with the latest medical knowledge, wellness tips, and expert guidance from our team of doctors.
          </p>

          {/* Search */}
          <div className="relative max-w-lg mx-auto"
            style={{ animation: "fadeDown 0.5s ease 0.3s both" }}>
            <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles, topics, doctors..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white text-gray-900 pl-11 pr-5 py-4 rounded-2xl text-sm font-semibold outline-none shadow-xl placeholder-gray-400"
            />
          </div>
        </div>
      </div>

      {/* ── FEATURED POSTS ────────────────────────────────── */}
      {!search && activeCategory === "All" && (
        <div className="max-w-6xl mx-auto px-6 -mt-10 mb-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featured.map((post, i) => (
              <FadeUp key={post.id} delay={i * 0.1}>
                <div
                  onClick={() => navigate(`/blog/${post.id}`)}
                  className="relative rounded-3xl overflow-hidden cursor-pointer group shadow-xl h-72"
                >
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">{post.category}</span>
                      {post.hot && <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1"><FontAwesomeIcon icon={faFire} className="text-xs" /> Hot</span>}
                    </div>
                    <h3 className="text-white font-extrabold text-lg leading-snug mb-2 group-hover:text-blue-200 transition duration-200">{post.title}</h3>
                    <div className="flex items-center gap-3 text-gray-300 text-xs font-semibold">
                      <span className="flex items-center gap-1"><FontAwesomeIcon icon={faUser} className="text-xs" /> {post.author}</span>
                      <span className="flex items-center gap-1"><FontAwesomeIcon icon={faClock} className="text-xs" /> {post.readTime} read</span>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      )}

      {/* ── MAIN CONTENT ──────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 pb-20">

        {/* Category Filter */}
        <FadeUp>
          <div className="flex gap-2 overflow-x-auto pb-3 mb-10 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(cat.label)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition duration-200 flex-shrink-0 ${
                  activeCategory === cat.label
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <FontAwesomeIcon icon={cat.icon} className="text-xs" />
                {cat.label}
              </button>
            ))}
          </div>
        </FadeUp>

        {/* Results count */}
        <FadeUp>
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-500 font-semibold">
              Showing <span className="text-blue-600 font-extrabold">{filtered.length}</span> articles
              {activeCategory !== "All" && <> in <span className="text-blue-600 font-extrabold">{activeCategory}</span></>}
              {search && <> for "<span className="text-blue-600 font-extrabold">{search}</span>"</>}
            </p>
            {saved.length > 0 && (
              <span className="text-xs text-blue-600 font-bold flex items-center gap-1">
                <FontAwesomeIcon icon={faBookmark} /> {saved.length} saved
              </span>
            )}
          </div>
        </FadeUp>

        {/* Posts Grid */}
        {paginated.length === 0 ? (
          <FadeUp>
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="text-gray-400 text-2xl" />
              </div>
              <div className="font-extrabold text-gray-700 text-lg mb-2">No articles found</div>
              <div className="text-sm text-gray-400">Try a different search term or category.</div>
              <button onClick={() => { setSearch(""); setActiveCategory("All"); }}
                className="mt-5 bg-blue-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-blue-700 transition">
                Clear Filters
              </button>
            </div>
          </FadeUp>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((post, i) => (
              <FadeUp key={post.id} delay={i * 0.06}>
                <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition duration-300 group flex flex-col h-full">

                  {/* Image */}
                  <div className="relative overflow-hidden h-48 flex-shrink-0">
                    <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-400" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                        <FontAwesomeIcon icon={faTag} className="text-xs" /> {post.category}
                      </span>
                      {post.hot && (
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                          <FontAwesomeIcon icon={faFire} className="text-xs" /> Hot
                        </span>
                      )}
                    </div>
                    <button
                      onClick={e => { e.stopPropagation(); toggleSave(post.id); }}
                      className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition duration-200 ${
                        saved.includes(post.id) ? "bg-blue-600 text-white" : "bg-white text-gray-400 hover:text-blue-600"
                      }`}
                    >
                      <FontAwesomeIcon icon={faBookmark} className="text-xs" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-extrabold text-gray-900 text-sm leading-snug mb-2 group-hover:text-blue-600 transition duration-200 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed mb-4 flex-1 line-clamp-3">{post.excerpt}</p>

                    {/* Meta */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-extrabold flex-shrink-0">
                          {post.author.split(" ").pop().charAt(0)}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-gray-800 leading-none">{post.author}</div>
                          <div className="text-xs text-gray-400">{post.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-gray-400 text-xs">
                        <span className="flex items-center gap-1"><FontAwesomeIcon icon={faClock} /> {post.readTime}</span>
                      </div>
                    </div>

                    {/* Read More */}
                    <button
                      onClick={() => navigate(`/blog/${post.id}`)}
                      className="mt-4 w-full flex items-center justify-center gap-2 bg-gray-50 hover:bg-blue-600 text-gray-700 hover:text-white font-bold py-2.5 rounded-xl text-xs transition duration-200"
                    >
                      Read Article <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                    </button>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <FadeUp>
            <div className="flex items-center justify-center gap-2 mt-12">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-10 h-10 rounded-xl border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-blue-500 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition duration-200"
              >
                ‹
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`w-10 h-10 rounded-xl text-sm font-extrabold transition duration-200 ${
                    page === n ? "bg-blue-600 text-white shadow-md" : "border-2 border-gray-200 text-gray-500 hover:border-blue-500 hover:text-blue-600"
                  }`}
                >
                  {n}
                </button>
              ))}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-10 h-10 rounded-xl border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-blue-500 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition duration-200"
              >
                ›
              </button>
            </div>
            <p className="text-center text-xs text-gray-400 mt-3">
              Page {page} of {totalPages} · {filtered.length} articles
            </p>
          </FadeUp>
        )}
      </div>

      {/* ── NEWSLETTER ────────────────────────────────────── */}
      <FadeUp>
        <div className="bg-gradient-to-br from-blue-600 to-blue-900 py-16 px-6 text-center text-white relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-white opacity-5 rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white opacity-5 rounded-full" />
          <div className="relative z-10 max-w-xl mx-auto">
            <FontAwesomeIcon icon={faHeart} className="text-blue-200 text-3xl mb-4" />
            <h2 className="text-2xl font-extrabold mb-2">Stay Updated on Your Health</h2>
            <p className="text-blue-100 text-sm mb-7 font-semibold">
              Get the latest health articles, tips, and expert advice delivered straight to your inbox — weekly.
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-white text-gray-900 px-4 py-3 rounded-xl text-sm font-semibold outline-none placeholder-gray-400"
              />
              <button className="bg-amber-500 hover:bg-amber-600 text-white font-extrabold px-5 py-3 rounded-xl text-sm transition duration-200 flex items-center gap-2 flex-shrink-0">
                Subscribe <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </button>
            </div>
          </div>
        </div>
      </FadeUp>

      <style>{`
        @keyframes fadeDown { from { opacity:0; transform:translateY(-18px); } to { opacity:1; transform:translateY(0); } }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </div>
  );
}