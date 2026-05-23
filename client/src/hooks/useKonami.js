import { useEffect, useRef } from 'react'

const CODE = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']

export function useKonami(cb) {
  const seq = useRef([])
  useEffect(() => {
    const h = (e) => {
      seq.current = [...seq.current, e.key].slice(-CODE.length)
      if (seq.current.join() === CODE.join()) cb?.()
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [cb])
}
