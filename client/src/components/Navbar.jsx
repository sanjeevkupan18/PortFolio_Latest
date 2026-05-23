import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTheme } from '../App.jsx'

const LINKS = [
  { to: '/',        label: 'HOME'     },
  { to: '/about',   label: 'ABOUT'    },
  { to: '/skills',  label: 'SKILLS'   },
  { to: '/projects',label: 'PROJECTS' },
  { to: '/contact', label: 'CONTACT'  },
]

export default function Navbar() {
  const loc = useLocation()
  const { theme, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)
  const [time,     setTime]     = useState(new Date())

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    const tick = setInterval(() => setTime(new Date()), 1000)
    return () => { window.removeEventListener('scroll', onScroll); clearInterval(tick) }
  }, [])

  return (
    <motion.nav
      initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-dark border-b border-white/5' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="navbar-logo-ring w-8 h-8 border border-cyan-400/70 rounded-[50%] flex items-center justify-center relative">
            <span className="navbar-logo-mark font-display text-xs neon-cyan font-bold">SC</span>
            <div className="navbar-logo-glow absolute inset-0 border border-cyan-400 scale-110 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div>
            <div className="navbar-logo-text font-display text-xs neon-cyan tracking-widest leading-none">{"< "}SanjuCoding{" />"}</div>
            <div className="font-mono text-[9px] text-white/30 tracking-widest"></div>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {LINKS.map(l => (
            <Link key={l.to} to={l.to} className={`nav-link ${loc.pathname === l.to ? 'active' : ''}`}>
              <span className="text-cyan-400/30 mr-1">/</span>{l.label}
            </Link>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-4">
          <span className="hidden md:block font-mono text-xs text-white/20">
            {time.toLocaleTimeString()}
          </span>
          <button onClick={toggle}
            className="w-8 h-8 border border-white/10 hover:border-cyan-400/50 flex items-center justify-center transition-colors text-sm">
            {theme === 'dark' ? '☀' : '◑'}
          </button>
          {/* Mobile burger */}
          <button onClick={() => setOpen(p => !p)} className="md:hidden flex flex-col gap-1.5">
            <span className={`block w-5 h-px bg-cyan-400 transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-px bg-cyan-400 transition-all ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-cyan-400 transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
          className="md:hidden glass-dark border-t border-white/5 overflow-hidden">
          <div className="px-6 py-4 flex flex-col gap-4">
            {LINKS.map(l => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
                className={`font-mono text-sm ${loc.pathname === l.to ? 'neon-cyan' : 'text-white/50'}`}>
                <span className="text-cyan-400 mr-2">›</span>{l.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
