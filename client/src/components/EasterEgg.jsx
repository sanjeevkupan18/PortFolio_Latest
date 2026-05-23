import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function EasterEgg({ show, onClose }) {
  const canvas = useRef(null)
  const raf    = useRef()

  useEffect(() => {
    if (!show || !canvas.current) return
    const c   = canvas.current
    const ctx = c.getContext('2d')
    c.width   = window.innerWidth
    c.height  = window.innerHeight
    const cols  = Math.floor(c.width / 16)
    const drops = Array(cols).fill(1)
    const chars = 'アイウエオカキクケコサシスセソ0123456789ABCDEF</>{}[]'

    const draw = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.05)'
      ctx.fillRect(0, 0, c.width, c.height)
      ctx.fillStyle = '#00ff88'
      ctx.font = '14px JetBrains Mono, monospace'
      drops.forEach((y, i) => {
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 16, y * 16)
        if (y * 16 > c.height && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      })
    }
    const loop = () => { draw(); raf.current = requestAnimationFrame(loop) }
    raf.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf.current)
  }, [show])

  useEffect(() => {
    if (show) {
      const t = setTimeout(onClose, 7000)
      return () => clearTimeout(t)
    }
  }, [show, onClose])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ cursor: 'none' }} onClick={onClose}
        >
          <canvas ref={canvas} className="absolute inset-0" />
          <motion.div
            initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 180, delay: 0.2 }}
            className="relative z-10 text-center glass-dark rounded-2xl px-10 py-8"
            style={{ border: '1px solid rgba(0,255,136,.4)', boxShadow: '0 0 60px rgba(0,255,136,.25)' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="text-5xl mb-4">🥚</div>
            <div className="font-display text-2xl neon-green mb-2">KONAMI CODE!</div>
            <div className="font-mono text-sm text-white/50 mb-4">↑↑↓↓←→←→BA</div>
            <div className="badge badge-gold text-sm mb-4">🏆 Achievement: Neo</div>
            <p className="font-mono text-xs text-green-400/60">There is no spoon... but there is code.</p>
            <p className="font-mono text-xs text-white/20 mt-4">Click anywhere to exit</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
