import React, { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dot  = useRef(null)
  const ring = useRef(null)
  const pos  = useRef({ x: 0, y: 0 })
  const rpos = useRef({ x: 0, y: 0 })
  const raf  = useRef()
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dot.current) {
        dot.current.style.left = `${e.clientX - 4}px`
        dot.current.style.top  = `${e.clientY - 4}px`
      }
    }
    const onOver = (e) => {
      if (e.target.closest('a,button,[data-hover],input,textarea,.mac-folder')) setHovered(true)
    }
    const onOut = () => setHovered(false)

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout',  onOut)

    const loop = () => {
      rpos.current.x += (pos.current.x - rpos.current.x) * 0.12
      rpos.current.y += (pos.current.y - rpos.current.y) * 0.12
      if (ring.current) {
        const s = hovered ? 52 : 36
        ring.current.style.left = `${rpos.current.x - s / 2}px`
        ring.current.style.top  = `${rpos.current.y - s / 2}px`
      }
      raf.current = requestAnimationFrame(loop)
    }
    raf.current = requestAnimationFrame(loop)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout',  onOut)
      cancelAnimationFrame(raf.current)
    }
  }, [hovered])

  return (
    <>
      <div ref={dot}  className="cursor-dot  hidden md:block" />
      <div ref={ring} className={`cursor-ring hidden md:block ${hovered ? 'hovered' : ''}`} />
    </>
  )
}
