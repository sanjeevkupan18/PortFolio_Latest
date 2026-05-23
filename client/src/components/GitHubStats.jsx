import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

const INTENSITY = ['#1b2430', '#0e4429', '#006d32', '#26a641', '#39d353']
const LANGS = [
  { name: 'JavaScript', pct: 45, color: '#f7df1e' },
  { name: 'Python',     pct: 15, color: '#3776ab' },
  { name: 'Html', pct: 15, color: '#3178c6' },
  { name: 'CSS',        pct: 12, color: '#1572b6' },
  { name: 'Other',      pct: 13, color: '#555'    },
]

export default function GitHubStats({ username = 'sanjeevkupan18' }) {
  const [hoveredCell, setHoveredCell] = useState(null)
  const weeks = useMemo(() =>
    Array.from({ length: 52 }, (_, wi) =>
      Array.from({ length: 7 }, (_, di) => {
        const r = Math.random()
        const level = r > 0.65 ? (r > 0.85 ? 3 : r > 0.75 ? 2 : 1) : 0

        return {
          id: `${wi}-${di}`,
          level,
          contributions: level * 3,
        }
      })
    ), [])

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }} className="glass-card p-6">
      <div className="font-mono text-xs text-green-400 mb-5 flex items-center gap-2 flex-wrap">
        <span>🐙 GITHUB ANALYTICS</span>
        <span className="text-white/65">-</span>
        <span className="text-white font-semibold">@{username}</span>
      </div>

      {/* Contribution grid */}
      <div className="mb-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="font-mono text-xs text-white/25">Contribution Activity (last year)</div>
          <div className="font-mono text-xs text-cyan-300/80 text-right">
            {hoveredCell ? `${hoveredCell.contributions} contributions` : 'Hover a square'}
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-white/8 bg-black/20 p-3 pb-2">
          <div className="flex gap-1" style={{ minWidth: 'max-content' }}>
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-1">
                {week.map((day) => (
                  <div
                    key={day.id}
                    className="contrib-cell h-3.5 w-3.5 rounded-[3px]"
                    onMouseEnter={() => setHoveredCell(day)}
                    onFocus={() => setHoveredCell(day)}
                    onMouseLeave={() => setHoveredCell(null)}
                    onBlur={() => setHoveredCell(null)}
                    tabIndex={0}
                    aria-label={`${day.contributions} contributions`}
                    style={{
                      background: INTENSITY[day.level],
                      border: `1px solid ${day.level === 0 ? 'rgba(255,255,255,0.08)' : `${INTENSITY[day.level]}cc`}`,
                      boxShadow: day.level > 0
                        ? `0 0 6px ${INTENSITY[day.level]}55, inset 0 0 0 1px rgba(255,255,255,0.03)`
                        : 'inset 0 0 0 1px rgba(255,255,255,0.02)',
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1.5 mt-2 justify-end">
            <span className="font-mono text-xs text-white/20">Less</span>
            {INTENSITY.map((c, i) => (
              <div
                key={i}
                className="h-3.5 w-3.5 rounded-[3px]"
                style={{ background: c, border: '1px solid rgba(255,255,255,0.08)' }}
              />
            ))}
            <span className="font-mono text-xs text-white/20">More</span>
          </div>
        </div>
      </div>

      {/* Language breakdown */}
      <div>
        <div className="font-mono text-xs text-white/25 mb-3">Top Languages</div>
        <div className="flex rounded-full overflow-hidden h-2 mb-3">
          {LANGS.map(l => (
            <div key={l.name} style={{ width: `${l.pct}%`, background: l.color }} title={`${l.name} ${l.pct}%`} />
          ))}
        </div>
        <div className="flex flex-wrap gap-4">
          {LANGS.map(l => (
            <div key={l.name} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }} />
              <span className="font-mono text-xs text-white/50">{l.name}</span>
              <span className="font-mono text-xs font-bold" style={{ color: l.color }}>{l.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
