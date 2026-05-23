import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/* ── Data ──────────────────────────────────────────────────── */
const EDU = [
  {
    year: 2020,
    label: "10th Grade",
    school: "DAV Centenary Public School",
    score: "93.4%",
    level: 76,
    stage: "Foundation",
    color: "#00fff5",
  },
  {
    year: 2022,
    label: "12th Grade",
    school: "DAV Centenary Public School",
    score: "86%",
    level: 80,
    stage: "Higher Secondary",
    color: "#bf00ff",
  },
  {
    year: 2027,
    label: "B.Tech CSE",
    school: "Bengal College of Engineering & Technology",
    score: "In Progress",
    level: 87,
    stage: "Professional Track",
    color: "#00ff88",
    current: true,
  },
];

const ACHIEVEMENTS = [
  { icon: '🏆', title: 'College Hackathon Winner',   desc: '1st place — CodeJam Hackathon 2024',       tier: 'gold'   },
  { icon: '🎓', title: 'Academic Excellence',desc: 'Top performer in CSE batch',                 tier: 'silver' },
  { icon: '📘', title: 'GATE 2026 Qualified', desc: 'AIR 21014 — Computer Science',               tier: 'cyan'   },
  { icon: '💡', title: 'Project Lead',        desc: 'Led 3+ cross-functional tech projects',      tier: 'cyan'   },
  { icon: '🌐', title: 'Open Source',         desc: 'Active contributor to OSS projects',         tier: 'cyan'   },
  { icon: '📊', title: 'Data Challenge',      desc: 'Top 10% — Kaggle competition',               tier: 'gold'   },
  { icon: '🚀', title: 'Published Apps',      desc: '5+ production-ready apps deployed',          tier: 'silver' },
]

const CERTS = [
  { title: 'Full Stack Web Dev',    issuer: 'Udemy',            year: '2025', color: '#00fff5' },
  { title: 'Python for Data Sci',   issuer: 'Udemy',         year: '2024', color: '#bf00ff' },
  { title: 'Power BI Essentials',   issuer: 'Udemy',        year: '2026', color: '#00ff88' },
  { title: 'Programming in JAVA',           issuer: 'NPTEL', year: '2026', color: '#ff6b00' },
  { title: 'Google GenAI Study Jam',       issuer: 'Google Developer Groups',            year: '2024', color: '#ff007a' },
]

/* ── Education SVG Graph ───────────────────────────────────── */
function EduGraph() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true })
  const [hov,  setHov] = useState(null)

  const W = 700, H = 200, PL = 60, PR = 40, PT = 30, PB = 30
  const minS = 70, maxS = 100

  const xS = (yr)  => PL + ((yr - 2020) / (2027 - 2020)) * (W - PL - PR)
  const yS = (s)   => H - PB - ((s - minS) / (maxS - minS)) * (H - PT - PB)

  const pts = EDU.map((e) => ({ ...e, x: xS(e.year), y: yS(e.level), sv: e.level }))
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const area = `${path} L ${pts[pts.length-1].x} ${H-PB} L ${pts[0].x} ${H-PB} Z`

  return (
    <div ref={ref}>
      <svg viewBox={`0 0 ${W} ${H+40}`} className="edu-graph w-full" style={{ maxHeight: 240 }}>
        <defs>
          <linearGradient id="lineG" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#00fff5" />
            <stop offset="50%"  stopColor="#bf00ff" />
            <stop offset="100%" stopColor="#00ff88" />
          </linearGradient>
          <linearGradient id="areaG" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#00fff5" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#00fff5" stopOpacity="0"    />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[75,80,85,90,95].map(v => (
          <g key={v}>
            <line x1={PL} y1={yS(v)} x2={W-PR} y2={yS(v)}
              className="edu-grid-line"
              stroke="rgba(0,255,245,.07)" strokeWidth="1" strokeDasharray="4,4" />
            <text className="edu-axis-label" x={PL-8} y={yS(v)+4} fontSize="10" fill="rgba(255,255,255,.3)" textAnchor="end">{v}</text>
          </g>
        ))}

        {/* Year labels */}
        {pts.map(p => (
          <text className="edu-axis-label" key={p.year} x={p.x} y={H+22} fontSize="11" fill="rgba(255,255,255,.35)" textAnchor="middle">
            {p.year}
          </text>
        ))}

        {/* Area */}
        {inView && (
          <motion.path d={area} fill="url(#areaG)"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }} />
        )}

        {/* Line */}
        {inView && (
          <motion.path d={path} fill="none" stroke="url(#lineG)" strokeWidth="2.5"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
            style={{ filter: 'drop-shadow(0 0 6px #00fff5)' }} />
        )}

        {/* Points */}
        {pts.map((p, i) => (
          <g key={i} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)} style={{ cursor: 'pointer' }}>
            <circle cx={p.x} cy={p.y} r={14} fill="transparent" />
            {inView && (
              <motion.circle cx={p.x} cy={p.y} r={6} fill={p.color}
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ delay: 0.5 + i * 0.3, type: 'spring' }}
                style={{ filter: `drop-shadow(0 0 8px ${p.color})` }} />
            )}
            {hov === i && (
              <g>
                <rect x={p.x-72} y={p.y-58} width={144} height={56} rx={6}
                  className="edu-tooltip-bg"
                  fill="rgba(0,0,0,.88)" stroke={p.color} strokeWidth="1" />
                <text x={p.x} y={p.y-40} fontSize="11" fill={p.color} textAnchor="middle" fontWeight="bold">
                  {p.label}
                </text>
                <text className="edu-tooltip-text" x={p.x} y={p.y-25} fontSize="10" fill="rgba(255,255,255,.65)" textAnchor="middle">
                  {p.score}
                </text>
                <text className="edu-tooltip-subtext" x={p.x} y={p.y-11} fontSize="9" fill="rgba(255,255,255,.42)" textAnchor="middle">
                  {p.stage}
                </text>
              </g>
            )}
          </g>
        ))}
      </svg>

      {/* Legend */}
      <div className="flex justify-around mt-2">
        {EDU.map(e => (
          <div key={e.year} className="text-center">
            <div className="font-display text-xs mb-1" style={{ color: e.color }}>{e.label}</div>
            <div className="font-mono text-xs text-white/30">{e.year} • {e.stage}</div>
            <div className="font-mono text-[11px] text-white/45 mt-1">{e.score}</div>
            {e.current && <span className="badge badge-cyan text-xs mt-1 block">CURRENT</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Certificate Carousel ──────────────────────────────────── */
function CertCarousel() {
  const [idx, setIdx] = useState(0)

  React.useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % CERTS.length), 3000)
    return () => clearInterval(t)
  }, [])

  return (
    <div>
      <div className="overflow-hidden">
        <motion.div className="flex gap-4"
          animate={{ x: -idx * (220 + 16) }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
          {[...CERTS, ...CERTS].map((c, i) => (
            <div key={i} className="glass-card p-5 flex-shrink-0 w-52"
              style={{ borderColor: c.color + '35' }}>
              <div className="text-2xl mb-2">🎖️</div>
              <div className="font-mono text-xs font-bold mb-1" style={{ color: c.color }}>{c.title}</div>
              <div className="font-mono text-xs text-white/40">{c.issuer}</div>
              <div className="font-mono text-xs text-white/20 mt-1">{c.year}</div>
            </div>
          ))}
        </motion.div>
      </div>
      <div className="flex gap-2 justify-center mt-4">
        {CERTS.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === idx % CERTS.length ? 'bg-cyan-400 w-6' : 'bg-white/20 w-1.5'}`} />
        ))}
      </div>
    </div>
  )
}

/* ── Page ──────────────────────────────────────────────────── */
export default function About() {
  return (
    <div className="min-h-screen bg-mesh grid-bg pt-28 pb-20 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16">
          <p className="font-mono text-xs text-white/25 mb-2">// SYSTEM PROFILE</p>
          <h1 className="section-head gradient-text mb-4">ABOUT ME</h1>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto" />
        </motion.div>

        {/* Bio + Details */}
        <div className="grid md:grid-cols-2 gap-6 mb-14">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }} className="glass-card p-8">
            <div className="font-mono text-xs neon-cyan mb-4">// BIO</div>
            <p className="text-white/65 leading-relaxed mb-4 text-sm">
              I&apos;m <span className="neon-cyan font-semibold">Sanjeev Kumar Pandit</span>, a passionate Full Stack
              Developer &amp; Data Analyst pursuing B.Tech in Computer Science. I love building end-to-end
              digital products that combine clean code, powerful data insights, and beautiful interfaces.
            </p>
            <p className="text-white/65 leading-relaxed text-sm">
              I thrive at the intersection of{' '}
              <span className="neon-purple">technology</span> and{' '}
              <span className="neon-green">data</span>. When not coding, I&apos;m exploring ML concepts,
              contributing to open source, or analysing datasets for fun.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Problem Solver','Team Player','Quick Learner','Creative'].map(t => (
                <span key={t} className="badge badge-cyan">{t}</span>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }} className="glass-card p-8">
            <div className="font-mono text-xs neon-purple mb-4">// PERSONAL DETAILS</div>
            <div className="space-y-3 font-mono text-sm">
              {[
                ['Name',      'Sanjeev Kumar Pandit'],
                ['Role',      'Full Stack Dev & Data Analyst'],
                ['Location',  'Dhanbad , JH , India 🇮🇳'],
                ['College',   'B.Tech CSE (2023–2027)'],
                ['Status',    '🟢 Available'],
                ['Email',     'sanjeevkupan18@gmail.com'],
                ['Languages', 'English, Hindi'],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-3">
                  <span className="text-white/28 w-24 flex-shrink-0">{k}:</span>
                  <span className="text-white/75">{v}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Education graph */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} className="glass-card p-8 mb-14">
          <div className="font-mono text-xs neon-green mb-2">// EDUCATION TIMELINE</div>
          <h2 className="font-display text-xl text-white mb-6">Academic Journey</h2>
          <EduGraph />
        </motion.div>

        {/* Achievements */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} className="mb-14">
          <div className="text-center mb-8">
            <p className="font-mono text-xs text-white/25 mb-2">// UNLOCKED</p>
            <h2 className="section-head text-white">ACHIEVEMENTS</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ACHIEVEMENTS.map((a, i) => (
              <motion.div key={a.title}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08, type: 'spring' }}
                className="glass-card p-5 flex gap-4">
                <div className="text-3xl">{a.icon}</div>
                <div>
                  <span className={`badge badge-${a.tier} mb-2`}>{a.tier.toUpperCase()}</span>
                  <div className="font-mono text-sm text-white font-semibold">{a.title}</div>
                  <div className="font-mono text-xs text-white/38 mt-1">{a.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certificates */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}>
          <div className="text-center mb-8">
            <p className="font-mono text-xs text-white/25 mb-2">// CREDENTIALS</p>
            <h2 className="section-head text-white">CERTIFICATES</h2>
          </div>
          <CertCarousel />
        </motion.div>

      </div>
    </div>
  )
}
