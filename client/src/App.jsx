import React, { useState, useEffect, createContext, useContext, useCallback } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import Home           from './pages/Home.jsx'
import About          from './pages/About.jsx'
import Skills         from './pages/Skills.jsx'
import Projects       from './pages/Projects.jsx'
import Contact        from './pages/Contact.jsx'
import AdminLogin     from './pages/AdminLogin.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'

import Navbar         from './components/Navbar.jsx'
import CustomCursor   from './components/CustomCursor.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import Particles      from './components/Particles.jsx'
import ScanLine       from './components/ScanLine.jsx'
import Terminal       from './components/Terminal.jsx'
import EasterEgg      from './components/EasterEgg.jsx'
import { useKonami }  from './hooks/useKonami.js'

/* ─── Theme context ─────────────────────────────────────────── */
export const ThemeCtx = createContext()
export const useTheme = () => useContext(ThemeCtx)

/* ─── Page transition wrapper ───────────────────────────────── */
const variants = {
  initial: { opacity: 0, y: 18 },
  in:      { opacity: 1, y: 0  },
  out:     { opacity: 0, y: -18 },
}
const transition = { duration: 0.38, ease: 'easeInOut' }

function Wrap({ children }) {
  return (
    <motion.div initial="initial" animate="in" exit="out" variants={variants} transition={transition}>
      {children}
    </motion.div>
  )
}

/* ─── Animated routes ───────────────────────────────────────── */
function AnimatedRoutes() {
  const loc = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={loc} key={loc.pathname}>
        <Route path="/"                 element={<Wrap><Home /></Wrap>} />
        <Route path="/about"            element={<Wrap><About /></Wrap>} />
        <Route path="/skills"           element={<Wrap><Skills /></Wrap>} />
        <Route path="/projects"         element={<Wrap><Projects /></Wrap>} />
        <Route path="/contact"          element={<Wrap><Contact /></Wrap>} />
        <Route path="/admin/login"      element={<AdminLogin />} />
        <Route path="/admin/dashboard"  element={<AdminDashboard />} />
      </Routes>
    </AnimatePresence>
  )
}

/* ─── App shell ─────────────────────────────────────────────── */
function Shell() {
  const loc = useLocation()
  const isAdmin = loc.pathname.startsWith('/admin')
  const [terminal, setTerminal] = useState(false)
  const [egg,      setEgg]      = useState(false)

  useKonami(useCallback(() => setEgg(true), []))

  useEffect(() => {
    const h = (e) => { if (e.ctrlKey && e.key === '`') setTerminal(p => !p) }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [])

  return (
    <div className="min-h-screen bg-cyber text-white relative">
      <Particles />
      <ScanLine />
      <ScrollProgress />
      <CustomCursor />
      {!isAdmin && <Navbar />}
      <AnimatedRoutes />

      {/* Terminal toggle button */}
      {!isAdmin && (
        <button
          onClick={() => setTerminal(p => !p)}
          className="fixed bottom-4 right-4 z-50 btn-outline terminal-launcher flex items-center justify-center gap-3 px-4 py-3 sm:left-auto sm:right-6 sm:px-6"
          title="Ctrl+`"
          aria-label="Toggle terminal"
        >
          <span className="terminal-launcher__icon neon-cyan">{'>'}_</span>
          <span className="terminal-launcher__label">TERMINAL</span>
        </button>
      )}

      <AnimatePresence>
        {terminal && !isAdmin && <Terminal onClose={() => setTerminal(false)} />}
      </AnimatePresence>

      <EasterEgg show={egg} onClose={() => setEgg(false)} />
    </div>
  )
}

/* ─── Root ──────────────────────────────────────────────────── */
export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'dark')

  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme)
    document.documentElement.classList.toggle('light', theme === 'light')
  }, [theme])

  return (
    <ThemeCtx.Provider value={{ theme, toggle: () => setTheme(p => p === 'dark' ? 'light' : 'dark') }}>
      <Router>
        <Shell />
      </Router>
    </ThemeCtx.Provider>
  )
}
