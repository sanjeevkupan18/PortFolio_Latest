import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const CMDS = {
  help: () => `Available commands:
  about      → About me
  skills     → Skill XP tree
  projects   → My projects
  contact    → Contact info
  whoami     → Identity check
  status     → System status
  easter     → 🥚 Secret
  matrix     → ???
  goto <page>→ Navigate (home|about|skills|projects|contact)
  clear      → Clear terminal`,

  about: () => `> Loading profile...
  Name     : Sanjeev Kumar Pandit
  Role     : Full Stack Dev & Data Analyst
  College  : B.Tech CSE (2023–2027)
  Location : India 🇮🇳
  Status   : 🟢 Available for freelance & internships`,

  skills: () => `> Scanning skill tree...
  ── Full Stack ──────────────────────
  HTML/CSS     [████████░░] 82%
  JavaScript   [███████░░░] 75%
  React.js     [███████░░░] 78%
  Node.js      [██████░░░░] 68%
  Express.js   [██████░░░░] 66%
  MongoDB      [██████░░░░] 62%
  ── Data Analytics ──────────────────
  Python       [███████░░░] 72%
  Pandas       [██████░░░░] 68%
  Statistics   [███████░░░] 73%
  Seaborn      [██████░░░░] 67%
  SQL          [███████░░░] 74%
  MS Excel     [███████░░░] 76%
  Power BI     [██████░░░░] 68%`,

  projects: () => `> Fetching repos...
  [1] DailyFlow         → MERN productivity tracker
  [2] BinaryBlogs       → MERN blogging platform
  [3] RailMatrix        → HTML/CSS/JS + Firebase
  [4] Robonixx BCET     → Club website platform
  [5] ChicBurg          → Restaurant website
  → Type 'goto projects' to see all`,

  contact: () => `> Contact matrix...
  Email    : sanjeevkupan18@gmail.com
  LinkedIn : /in/sanjeevkupan18
  GitHub   : github.com/sanjeevkupan18
  Status   : 🟢 Available`,

  whoami: () => `> Identity check...
  ██████████ 100%
  You are: A curious explorer of the multiverse.
  Threat level: ◼◼◼◼◻ (Curious Human)`,

  status: () => `> System status...
  [✓] Portfolio   ONLINE
  [✓] API Server  RUNNING  
  [✓] MongoDB     CONNECTED
  [✓] Creativity  OVERCLOCKED
  [!] Sleep       LOW (1.2hrs)`,

  easter: () => `> Secret found!
  🥚 Achievement: "Easter Egg Hunter"
  Not everything is on the surface.
  Keep exploring...`,

  matrix: () => `> Matrix mode...
  01001000 01100101 01101100 01101100 01101111
  Follow the white rabbit 🐇`,
}

const ROUTES = { home: '/', about: '/about', skills: '/skills', projects: '/projects', contact: '/contact' }

export default function Terminal({ onClose }) {
  const [lines, setLines] = useState([
    { t: 'sys',  v: '  ██████╗ SanjuCoding.DEV TERMINAL v2.0' },
    { t: 'sys',  v: '  Type "help" for commands. Ctrl+` to close.' },
    { t: 'blank' },
  ])
  const [input, setInput] = useState('')
  const [hist,  setHist]  = useState([])
  const [hidx,  setHidx]  = useState(-1)
  const bottom = useRef(null)
  const inp    = useRef(null)
  const nav    = useNavigate()

  useEffect(() => { bottom.current?.scrollIntoView({ behavior: 'smooth' }) }, [lines])
  useEffect(() => { inp.current?.focus() }, [])

  const run = (raw) => {
    const cmd = raw.trim().toLowerCase()
    const next = [...lines, { t: 'in', v: cmd }]

    if (cmd === 'clear') {
      setLines([{ t: 'sys', v: 'Terminal cleared.' }, { t: 'blank' }])
    } else if (cmd.startsWith('goto ')) {
      const dest = cmd.slice(5)
      if (ROUTES[dest]) {
        next.push({ t: 'out', v: `> Navigating to /${dest}...` })
        setLines(next)
        setTimeout(() => { nav(ROUTES[dest]); onClose() }, 700)
      } else {
        next.push({ t: 'err', v: `Unknown route: ${dest}` }, { t: 'blank' })
        setLines(next)
      }
    } else if (cmd === '') {
      setLines(next)
    } else if (CMDS[cmd]) {
      next.push({ t: 'out', v: CMDS[cmd]() }, { t: 'blank' })
      setLines(next)
    } else {
      next.push({ t: 'err', v: `Command not found: "${cmd}". Try "help".` }, { t: 'blank' })
      setLines(next)
    }
    setHist(h => [cmd, ...h].slice(0, 30))
    setHidx(-1)
    setInput('')
  }

  const onKey = (e) => {
    if (e.key === 'Enter') { run(input) }
    else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const i = Math.min(hidx + 1, hist.length - 1)
      setHidx(i); setInput(hist[i] || '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const i = Math.max(hidx - 1, -1)
      setHidx(i); setInput(i === -1 ? '' : hist[i])
    }
  }

  const color = (t) => ({
    sys: 'text-cyan-400', in: 'text-white', out: 'text-green-400',
    err: 'text-red-400', blank: '',
  })[t] || ''

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0,  scale: 1 }}
      exit={{   opacity: 0, y: 30,  scale: 0.96 }}
      transition={{ duration: 0.25 }}
      className="fixed bottom-20 left-4 right-4 z-50 terminal-wrap shadow-2xl sm:left-auto sm:right-6"
      style={{ maxHeight: '70vh', width: 'min(42rem, calc(100vw - 2rem))' }}
      onClick={() => inp.current?.focus()}
    >
      {/* Title bar */}
      <div className="terminal-bar justify-between gap-3 flex-wrap">
        <div className="flex min-w-0 items-center gap-2">
          <div className="t-dot bg-red-500" />
          <div className="t-dot bg-yellow-500" />
          <div className="t-dot bg-green-500" />
          <span className="ml-3 truncate font-mono text-xs text-white/30">sanjuCoding@portfolio:~$</span>
        </div>
        <button onClick={onClose} className="shrink-0 font-mono text-xs text-white/30 hover:text-white transition-colors">[× CLOSE]</button>
      </div>

      {/* Body */}
      <div className="terminal-body overflow-y-auto text-xs leading-relaxed" style={{ maxHeight: 'calc(70vh - 44px)' }}>
        {lines.map((l, i) => (
          <div key={i} className={`mb-0.5 whitespace-pre-wrap ${color(l.t)}`}>
            {l.t === 'in' && <span className="text-cyan-400 mr-2">›</span>}
            {l.t !== 'blank' && l.v}
          </div>
        ))}
        {/* Input row */}
        <div className="flex items-center mt-2">
          <span className="text-cyan-400 mr-2">›</span>
          <input
            ref={inp} value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKey}
            className="flex-1 bg-transparent text-green-400 outline-none font-mono text-xs caret-cyan-400"
            spellCheck={false} autoComplete="off"
          />
          <span className="t-cursor" />
        </div>
        <div ref={bottom} />
      </div>
    </motion.div>
  )
}
