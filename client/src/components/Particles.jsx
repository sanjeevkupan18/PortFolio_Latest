import React, { useEffect, useRef } from 'react'

const COLORS = ['#00fff5', '#bf00ff', '#00ff88', '#ff6b00']

export default function Particles() {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current
    if (!c) return
    const nodes = []
    for (let i = 0; i < 40; i++) {
      const p = document.createElement('div')
      p.className = 'particle'
      p.style.cssText = `
        left: ${Math.random() * 100}%;
        background: ${COLORS[i % COLORS.length]};
        animation-duration: ${10 + Math.random() * 18}s;
        animation-delay: ${Math.random() * 20}s;
        opacity: ${0.3 + Math.random() * 0.5};
      `
      c.appendChild(p)
      nodes.push(p)
    }
    return () => nodes.forEach(n => n.remove())
  }, [])
  return (
    <div ref={ref}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    />
  )
}
