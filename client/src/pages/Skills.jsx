import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const LV_NAMES = ['','Novice','Apprentice','Developer','Proficient','Skilled','Advanced','Expert','Master','Grandmaster','Legend']

const FULLSTACK = [
  { name: 'HTML/CSS',     xp: 82, lv: 8, badge: '🥇', color: '#e34c26' },
  { name: 'JavaScript',   xp: 75, lv: 7, badge: '🥇', color: '#f7df1e' },
  { name: 'Java',         xp: 69, lv: 6, badge: '🥈', color: '#f89820' },
  { name: 'React.js',     xp: 78, lv: 7, badge: '🥇', color: '#61dafb' },
  { name: 'Node.js',      xp: 68, lv: 6, badge: '🥈', color: '#339933' },
  { name: 'Express.js',   xp: 65, lv: 6, badge: '🥈', color: '#bbbbbb' },
  { name: 'Firebase',     xp: 71, lv: 7, badge: '🥇', color: '#ffca28' },
  { name: 'MongoDB',      xp: 62, lv: 6, badge: '🥈', color: '#47a248' },
  { name: 'MySQL',        xp: 70, lv: 7, badge: '🥇', color: '#4479a1' },
  { name: 'Git/GitHub',   xp: 80, lv: 8, badge: '🥇', color: '#f05032' },
  { name: 'Postman',      xp: 72, lv: 7, badge: '🥈', color: '#ff6c37' },
  { name: 'VS Code',      xp: 90, lv: 9, badge: '💎', color: '#007acc' },
  { name: 'Vercel/Render',xp: 66, lv: 6, badge: '🥈', color: '#00fff5' },
  { name: 'Tailwind CSS', xp: 77, lv: 7, badge: '🥇', color: '#06b6d4' },
]

const DATA = [
  { name: 'Excel',       xp: 78, lv: 7, badge: '🥇', color: '#1d6f42' },
  { name: 'Python',      xp: 72, lv: 7, badge: '🥇', color: '#3776ab' },
  { name: 'Pandas',      xp: 68, lv: 6, badge: '🥈', color: '#6a6aff' },
  { name: 'NumPy',       xp: 65, lv: 6, badge: '🥈', color: '#4dabcf' },
  { name: 'Matplotlib',  xp: 62, lv: 6, badge: '🥈', color: '#11557c' },
  { name: 'Seaborn',     xp: 60, lv: 6, badge: '🥈', color: '#3b7dd8' },
  { name: 'Statistics',  xp: 58, lv: 5, badge: '🥉', color: '#bf00ff' },
  { name: 'EDA',         xp: 70, lv: 7, badge: '🥇', color: '#00ff88' },
  { name: 'SQL',         xp: 74, lv: 7, badge: '🥇', color: '#4479a1' },
  { name: 'Tableau ',    xp: 68, lv: 6, badge: '🥈', color: '#f2c811' },
]

/* ── XP Card ────────────────────────────────────────────────── */
function XPCard({ skill, delay }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.45 }}
      className="glass-card p-4 hover:scale-[1.02] transition-transform">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{skill.badge}</span>
          <span className="font-mono text-sm text-white font-semibold">{skill.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-white/30">LV</span>
          <span className="font-display text-sm font-bold" style={{ color: skill.color }}>{skill.lv}</span>
          <span className="badge badge-cyan text-xs">{LV_NAMES[skill.lv]}</span>
        </div>
      </div>

      <div className="xp-track mb-1">
        <motion.div className="xp-fill"
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.xp}%` } : { width: 0 }}
          transition={{ delay: delay + 0.3, duration: 1.2, ease: 'easeOut' }}
          style={{ background: `linear-gradient(90deg,${skill.color}70,${skill.color})` }} />
      </div>

      <div className="flex justify-between">
        <span className="font-mono text-xs text-white/25">XP Progress</span>
        <span className="font-mono text-xs font-bold" style={{ color: skill.color }}>{skill.xp}%</span>
      </div>
    </motion.div>
  )
}

/* ── Roadmap Node ───────────────────────────────────────────── */
function RoadNode({ skill, index }) {
  const isLeft = index % 2 === 0
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.07, duration: 0.45 }}
      className={`flex items-center gap-4 mb-6 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
      {/* Card */}
      <div className="flex-1 glass-card p-3 max-w-xs">
        <div className="flex items-center gap-2 mb-2">
          <span>{skill.badge}</span>
          <span className="font-mono text-xs font-bold text-white">{skill.name}</span>
        </div>
        <div className="xp-track">
          <motion.div className="xp-fill"
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.xp}%` }}
            transition={{ delay: index * 0.07 + 0.4, duration: 1 }}
            style={{ background: `linear-gradient(90deg,${skill.color}55,${skill.color})` }} />
        </div>
        <div className="font-mono text-xs text-white/35 mt-1">{skill.xp}% · Lv.{skill.lv}</div>
      </div>
      {/* Node dot */}
      <div className="flex-shrink-0 w-4 h-4 rounded-full border-2"
        style={{ borderColor: skill.color, background: `${skill.color}28`,
          boxShadow: `0 0 12px ${skill.color}` }} />
      {/* Spacer */}
      <div className="flex-1 max-w-xs" />
    </motion.div>
  )
}

/* ── Skill Bar Graph ───────────────────────────────────────── */
function SkillBarGraph({ skills, title }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6 mt-8"
    >
      <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
        <div>
          <div className="font-mono text-xs text-cyan-400 mb-2">// SKILL GRAPH</div>
          <h3 className="font-display text-lg text-white">{title}</h3>
        </div>
        <div className="font-mono text-xs text-white/30">XP scale: 0 - 100</div>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="min-w-[860px]">
          <div className="relative ml-10 mr-3 h-[220px]">
            {[0, 25, 50, 75, 100].map((mark) => (
              <div
                key={mark}
                className="absolute inset-x-0 border-t border-dashed border-cyan-400/10"
                style={{ bottom: `${(mark / 100) * 100}%` }}
              >
                <span className="absolute -left-10 -top-2.5 font-mono text-[10px] text-white/28">
                  {mark}
                </span>
              </div>
            ))}

            <div className="relative flex h-full items-end justify-between gap-4">
              {skills.map((skill, index) => (
                <div key={skill.name} className="flex h-full w-14 items-end justify-center">
                  <motion.div
                    initial={{ height: 0, opacity: 0.4 }}
                    animate={inView ? { height: `${skill.xp}%`, opacity: 1 } : { height: 0, opacity: 0.4 }}
                    transition={{ delay: index * 0.05, duration: 0.75, ease: 'easeOut' }}
                    className="w-full rounded-t-2xl border border-white/10"
                    style={{
                      background: `linear-gradient(180deg, ${skill.color}, ${skill.color}88)`,
                      boxShadow: `0 0 24px ${skill.color}28`,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 ml-10 mr-3 flex items-start justify-between gap-4">
            {skills.map((skill, index) => (
              <div key={skill.name} className="flex w-14 flex-col items-center">
                <span className="font-mono text-[10px] text-white/45">{skill.xp}%</span>
                <span className="mt-3 text-center font-mono text-[10px] leading-4 text-white/55">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Page ──────────────────────────────────────────────────── */
export default function Skills() {
  const [tab,  setTab]  = useState('fullstack')
  const [view, setView] = useState('grid')

  const skills = tab === 'fullstack' ? FULLSTACK : DATA
  const avgXP  = Math.round(skills.reduce((s, x) => s + x.xp, 0) / skills.length)
  const maxLv  = Math.max(...skills.map(s => s.lv))
  const totalXP = skills.reduce((s, x) => s + x.xp * 10, 0)

  return (
    <div className="min-h-screen bg-mesh grid-bg pt-28 pb-20 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10">
          <p className="font-mono text-xs text-white/25 mb-2">// SKILL TREE</p>
          <h1 className="section-head gradient-text mb-2">SKILL MATRIX</h1>
          <p className="font-mono text-sm text-white/35">Gamified progression system · Level up your stack</p>
        </motion.div>

        {/* Stats bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-xl p-4 mb-8 flex flex-wrap gap-6 justify-center border border-cyan-400/08">
          {[
            { label: 'AVG XP',    val: `${avgXP}%`,              color: '#00fff5' },
            { label: 'MAX LEVEL', val: `LV.${maxLv}`,            color: '#bf00ff' },
            { label: 'TOTAL XP',  val: totalXP.toLocaleString(), color: '#00ff88' },
            { label: 'SKILLS',    val: skills.length,             color: '#ff6b00' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="font-display text-xl font-bold" style={{ color: s.color }}>{s.val}</div>
              <div className="font-mono text-xs text-white/28">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Controls */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          <div className="glass rounded-lg p-1 flex gap-1 border border-white/5">
            {[['fullstack','⚡ FULL STACK'],['data','📊 DATA ANALYST']].map(([id, lbl]) => (
              <button key={id} onClick={() => setTab(id)}
                className={`px-4 py-2 rounded font-mono text-xs transition-all ${tab === id
                  ? 'bg-cyan-400/18 text-cyan-400 border border-cyan-400/28'
                  : 'text-white/38 hover:text-white'}`}>
                {lbl}
              </button>
            ))}
          </div>
          <div className="glass rounded-lg p-1 flex gap-1 border border-white/5">
            {[['grid','⊞ GRID'],['roadmap','⇨ ROADMAP']].map(([id, lbl]) => (
              <button key={id} onClick={() => setView(id)}
                className={`px-4 py-2 rounded font-mono text-xs transition-all ${view === id
                  ? 'bg-purple-400/18 text-purple-400 border border-purple-400/28'
                  : 'text-white/38 hover:text-white'}`}>
                {lbl}
              </button>
            ))}
          </div>
        </div>

        {/* Section label */}
        <motion.div key={tab} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="mb-8 text-center">
          <h2 className="font-display text-xl text-white">
            {tab === 'fullstack' ? '⚡ Full Stack Development' : '📊 Data Analytics Track'}
          </h2>
          <div className="w-32 h-px mx-auto mt-2"
            style={{ background: tab === 'fullstack' ? '#00fff5' : '#bf00ff' }} />
        </motion.div>

        {/* Skills display */}
        {view === 'grid' ? (
          <>
            <motion.div key={`${tab}-grid`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.map((s, i) => <XPCard key={s.name} skill={s} delay={i * 0.05} />)}
            </motion.div>
            <SkillBarGraph
              skills={skills}
              title={tab === 'fullstack' ? 'Full Stack Skill Distribution' : 'Data Analyst Skill Distribution'}
            />
          </>
        ) : (
          <motion.div key={`${tab}-road`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="relative">
            {/* Center spine */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
              style={{ background: 'linear-gradient(180deg,#00fff5,#bf00ff,#00ff88)', opacity: 0.25 }} />
            <div className="space-y-2">
              {skills.map((s, i) => <RoadNode key={s.name} skill={s} index={i} />)}
            </div>
          </motion.div>
        )}

        {/* Achievements footer */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          className="mt-16 glass-card p-8 text-center">
          <div className="font-mono text-xs text-yellow-400 mb-4">// ACHIEVEMENTS UNLOCKED</div>
          <div className="flex flex-wrap gap-3 justify-center">
            {['🏆 10K XP Club','💎 Legend Status','⚡ Full Stack Pro',
              '📊 Data Wizard','🚀 Deploy Master','🔥 GitHub Warrior'].map(a => (
              <span key={a} className="badge badge-gold">{a}</span>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  )
}
