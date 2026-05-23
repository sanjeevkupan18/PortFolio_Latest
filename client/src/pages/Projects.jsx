import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  SiReact, SiNodedotjs, SiMongodb, SiPython,
  SiMysql, SiExpress, SiTailwindcss, SiHtml5,
  SiCss, SiJavascript, SiFirebase,
} from 'react-icons/si'
import { TbPower } from 'react-icons/tb'
import GitHubStats from '../components/GitHubStats.jsx'
import dailyflowImg from '../assets/dailyflow.png'
import binaryblogsImg from '../assets/binaryblogs.png'
import railmatrixImg from '../assets/railmatrix.png'
import robonixxImg from '../assets/robonixx.png'
import chicburgImg from '../assets/chicburg.png'

const ICON_MAP  = { React: SiReact, Node: SiNodedotjs, MongoDB: SiMongodb, Python: SiPython, MySQL: SiMysql, Express: SiExpress, Tailwind: SiTailwindcss, PowerBI: TbPower, HTML: SiHtml5, CSS: SiCss, JavaScript: SiJavascript, Firebase: SiFirebase }
const COLOR_MAP = { React:'#61dafb',Node:'#339933',MongoDB:'#47a248',Python:'#3776ab',MySQL:'#4479a1',Express:'#bbb',Tailwind:'#06b6d4',PowerBI:'#f2c811',HTML:'#e34f26',CSS:'#1572b6',JavaScript:'#f7df1e',Firebase:'#ffca28' }

const PROJECTS = [
  {
    id: 1,
    cat: "web",
    emoji: "⚡️",
    title: "DailyFlow",
    imageUrl: dailyflowImg,
    color: "#00fff5",
    stars: "★★★★★",
    desc: "Full-stack to-do progress tracker with dashboard , analytics and reminders.",
    long: "DailyFlow is a feature-rich MERN progress tracker app. It includes JWT auth, task management, progress tracking, charts, analytics, weekly-monthly reports, gamified streaks and well wishing reminders, pomodoro timer and a sleek dashboard.",
    tech: ["React", "Node", "MongoDB", "Express"],
    highlights: [
      "JWT Auth",
      "REST API",
      "Analytics Dashboard",
      "Progress Tracking",
    ],
    demo: "https://daily-flow-tau.vercel.app/login",
    github: "https://github.com/sanjeevkupan18/DailyFlow",
  },
  {
    id: 2,
    cat: "web",
    emoji: "📒",
    title: "BinaryBlogs",
    imageUrl: binaryblogsImg,
    color: "#bf00ff",
    stars: "★★★★☆",
    desc: "MERN blogging platform with rich text editor, user profiles and analytics dashboard.",
    long: "BinaryBlogs is a full-stack blogging platform built with the MERN stack. It features a rich text editor, user authentication, profile management, and an analytics dashboard showing blog performance metrics like views, likes and engagement trends.",
    tech: ["React", "Node", "MongoDB", "Express"],
    highlights: [
      "Rich Text Editor",
      "User Profiles",
      "Analytics Dashboard",
      "REST API",
    ],
    demo: "https://binary-blogs-pi.vercel.app/",
    github:
      "https://github.com/sanjeevkupan18/BinaryBlogs---Mern-Stack-Web-App",
  },
  {
    id: 3,
    cat: "web",
    emoji: "🚆",
    title: "RailMatrix",
    imageUrl: railmatrixImg,
    color: "#00ff88",
    stars: "★★★★☆",
    desc: "RailMatrix is a online Railway seat booking platform with train schedules, seat availability and booking analytics.",
    long: "RailMatrix is a comprehensive online railway seat booking platform built with the Html+Css+Js+Firebase stack. It provides real-time train schedules, seat availability, and an intuitive booking interface. The platform also includes an analytics dashboard for users to track their bookings and travel history.",
    tech: ["HTML", "CSS", "JavaScript", "Firebase"],
    highlights: [
      "Real-time Schedules",
      "Seat Availability",
      "Booking Interface",
      "Analytics Dashboard",
    ],
    demo: "https://railmatrix-6487f.web.app/",
    github: "https://github.com/sanjeevkupan18/Railway-Reservation-System",
  },
  {
    id: 4,
    cat: "web",
    emoji: "🏫",
    title: "Robonixx Bcet",
    imageUrl: robonixxImg,
    color: "#ff6b00",
    stars: "★★★★☆",
    desc: "College Club Website for BCET's Robotics Club with event management and project showcase.",
    long: "Robonixx BCET is a dynamic website built for the robotics club of BCET. It features event management, project showcases, team member profiles, and a blog section for updates. The site is designed to engage students and promote the club's activities effectively.",
    tech: ["React", "Node", "MongoDB", "Express"],
    highlights: [
      "Event Management",
      "Project Showcases",
      "Team Member Profiles",
      "Blog Section",
    ],
    demo: "https://www.robonixxbcet.in/",
    github: "https://github.com/sanjeevkupan18/robonixx-bcet",
  },
  {
    id: 5,
    cat: "web",
    emoji: "🍔",
    title: "ChicBurg",
    imageUrl: chicburgImg,
    color: "#ff007a",
    stars: "★★★★★",
    desc: "Html , CSS , JS based restaurant website for ChicBurg with menu, online ordering and reservation system.",
    long: "ChicBurg is a sleek restaurant website built with HTML, CSS, and JavaScript. It features a dynamic menu, online ordering system, and reservation functionality. The site is designed to provide an engaging user experience while showcasing the restaurant's offerings effectively.",
    tech: ["Html", "Css", "JavaScript"],
    highlights: [
      "Dynamic Menu",
      "Online Ordering",
      "Reservation System",
      "Engaging User Experience",
    ],
    demo: "http://sanjucoding.me/ChicBurg-Website/",
    github: "https://github.com/sanjeevkupan18/ChicBurg-Website",
  },
  // {
  //   id: 6,
  //   cat: "data",
  //   emoji: "👥",
  //   title: "HR Analytics",
  //   color: "#00fff5",
  //   stars: "★★★☆☆",
  //   desc: "Employee attrition prediction and HR dashboard with Python ML and Power BI.",
  //   long: "End-to-end HR analytics predicting employee attrition with Scikit-learn ML, identifying key drivers, and presenting insights through interactive Power BI dashboards for HR teams.",
  //   tech: ["Python", "PowerBI", "MySQL"],
  //   highlights: [
  //     "ML Prediction",
  //     "Power BI",
  //     "Attrition Analysis",
  //     "HR Insights",
  //   ],
  //   demo: "#",
  //   github: "#",
  // },
];

/* ── Modal ──────────────────────────────────────────────────── */
function Modal({ p, onClose }) {
  if (!p) return null
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,.8)', backdropFilter: 'blur(8px)' }}
        onClick={onClose}>
        <motion.div initial={{ opacity: 0, scale: 0.82, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.82 }}
          className="glass-card max-w-lg w-full p-8 relative"
          style={{ borderColor: p.color + '38' }}
          onClick={e => e.stopPropagation()}>
          <button onClick={onClose}
            className="absolute top-4 right-4 font-mono text-xs text-white/30 hover:text-white transition-colors">
            [× CLOSE]
          </button>
          {p.imageUrl ? (
            <div className="mb-5 overflow-hidden rounded-xl border border-white/10">
              <img
                src={p.imageUrl}
                alt={p.title}
                className="h-52 w-full object-cover"
              />
            </div>
          ) : (
            <div className="text-4xl mb-4">{p.emoji}</div>
          )}
          <h3 className="font-display text-2xl mb-1" style={{ color: p.color }}>{p.title}</h3>
          <div className="font-mono text-xs mb-4" style={{ color: p.color }}>{p.stars}</div>
          <p className="text-white/65 text-sm leading-relaxed mb-5">{p.long}</p>
          <div className="flex flex-wrap gap-2 mb-5">
            {p.highlights.map(h => <span key={h} className="badge badge-cyan">{h}</span>)}
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {p.tech.map(t => {
              const Icon = ICON_MAP[t]
              return (
                <div key={t} className="flex items-center gap-1 glass px-2 py-1 rounded text-xs font-mono"
                  style={{ color: COLOR_MAP[t] }}>
                  {Icon && <Icon />} {t}
                </div>
              )
            })}
          </div>
          <div className="flex gap-3">
            <a href={p.demo}   className="btn-filled  flex-1 text-center text-xs py-3">LIVE DEMO</a>
            <a href={p.github} className="btn-outline flex-1 text-center text-xs py-3">GITHUB</a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

/* ── Project Card ───────────────────────────────────────────── */
function Card({ p, onClick }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    setTilt({
      x: ((e.clientX - r.left)  / r.width  - 0.5) * 18,
      y: ((e.clientY - r.top)   / r.height - 0.5) * -18,
    })
  }

  return (
    <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{ transform: `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` }}
      className="glass-card h-full p-6 proj-card cursor-pointer group flex flex-col"
      onClick={onClick} data-hover>

      {/* Top */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{p.emoji}</span>
          <div>
            <h3 className="font-display text-sm font-bold text-white">{p.title}</h3>
            <div className="font-mono text-xs mt-0.5" style={{ color: p.color }}>{p.stars}</div>
          </div>
        </div>
        <span className={`badge text-xs ${p.cat === 'web' ? 'badge-cyan' : 'badge-gold'}`}>
          {p.cat === 'web' ? '⚡ WEB' : '📊 DATA'}
        </span>
      </div>

      {/* Thumbnail */}
      <div className="w-full h-28 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden"
        style={{ background: `linear-gradient(135deg,${p.color}0e,${p.color}05)`,
          border: `1px solid ${p.color}18` }}>
        {p.imageUrl ? (
          <img
            src={p.imageUrl}
            alt={p.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <span className="text-5xl opacity-15">{p.emoji}</span>
        )}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background: p.imageUrl ? 'rgba(2, 11, 20, 0.62)' : `${p.color}0a` }}>
          <span className="font-mono text-xs text-white/50">CLICK FOR DETAILS →</span>
        </div>
      </div>

      <p className="text-white/55 text-xs leading-relaxed mb-4 font-mono">{p.desc}</p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {p.tech.map(t => {
          const Icon = ICON_MAP[t]
          return (
            <div key={t} className="flex items-center gap-1 glass px-2 py-1 rounded font-mono text-xs"
              style={{ color: COLOR_MAP[t] }}>
              {Icon && <Icon className="text-xs" />} {t}
            </div>
          )
        })}
      </div>

      <div className="flex gap-2 mt-auto">
        <button className="btn-filled  flex-1 text-xs py-2" onClick={e => e.stopPropagation()}>DEMO</button>
        <button className="btn-outline flex-1 text-xs py-2" onClick={e => e.stopPropagation()}>GITHUB</button>
      </div>
    </motion.div>
  )
}

/* ── Page ──────────────────────────────────────────────────── */
export default function Projects() {
  const [filter,   setFilter]   = useState('all')
  const [selected, setSelected] = useState(null)

  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.cat === filter)

  return (
    <div className="min-h-screen bg-mesh grid-bg pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10">
          <p className="font-mono text-xs text-white/25 mb-2">// PORTFOLIO</p>
          <h1 className="section-head gradient-text mb-2">MY WORK</h1>
          <p className="font-mono text-sm text-white/35">Hover to tilt · Click for full details</p>
        </motion.div>

        {/* Filters */}
        <div className="flex gap-3 justify-center mb-10 flex-wrap">
          {[['all','🌐 ALL'],['web','⚡ WEB DEV'],['data','📊 DATA']].map(([id, lbl]) => (
            <button key={id} onClick={() => setFilter(id)}
              className={`px-5 py-2 rounded font-mono text-xs transition-all ${filter === id ? 'btn-filled' : 'btn-outline'}`}>
              {lbl}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {filtered.map(p => (
              <motion.div key={p.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
                <Card p={p} onClick={() => setSelected(p)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* GitHub Stats */}
        <div className="mt-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            {[
              { label:'Repositories', val:'25+', icon:'📁', color:'#00fff5' },
              { label:'Commits',      val:'150+',icon:'💾', color:'#bf00ff' },
              // { label:'Stars Earned', val:'120+',icon:'⭐', color:'#f7df1e' },
              { label:'Contributions',val:'160+',icon:'📊', color:'#00ff88' },
              { label:'Live Deployments', val:'10+', icon:'🚀', color:'#ff6b00' },
              { label:'Tech Stack',       val:'15+', icon:'🛠️', color:'#61dafb' },
            ].map(s => (
              <motion.div key={s.label} initial={{ opacity:0, scale:0.85 }}
                whileInView={{ opacity:1, scale:1 }}
                className="glass-card p-5 flex items-center gap-3">
                <span className="text-2xl">{s.icon}</span>
                <div>
                  <div className="font-display text-xl font-bold" style={{ color: s.color }}>{s.val}</div>
                  <div className="font-mono text-xs text-white/35">{s.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
          <GitHubStats username="sanjeevkupan18" />
        </div>

      </div>

      <Modal p={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
