import React, { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const h = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setPct(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])
  return <div className="scroll-bar" style={{ width: `${pct}%` }} />
}
