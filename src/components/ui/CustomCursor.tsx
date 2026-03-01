'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      setIsPointer(
        getComputedStyle(el).cursor === 'pointer' ||
        el.tagName === 'BUTTON' ||
        el.tagName === 'A'
      )
    }
    const hide = () => setIsHidden(true)
    const show = () => setIsHidden(false)

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    document.addEventListener('mouseleave', hide)
    document.addEventListener('mouseenter', show)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      document.removeEventListener('mouseleave', hide)
      document.removeEventListener('mouseenter', show)
    }
  }, [])

  // Only show on non-touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return null

  return (
    <>
      {/* Main dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none mix-blend-screen"
        animate={{
          x: pos.x - 4,
          y: pos.y - 4,
          opacity: isHidden ? 0 : 1,
          scale: isPointer ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 1000, damping: 50 }}
      >
        <div className="w-2 h-2 rounded-full bg-accent-cyan" />
      </motion.div>

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9997] pointer-events-none"
        animate={{
          x: pos.x - 20,
          y: pos.y - 20,
          opacity: isHidden ? 0 : 1,
          scale: isPointer ? 1.8 : 1,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 30 }}
      >
        <div className={`w-10 h-10 rounded-full border transition-all duration-300 ${
          isPointer ? 'border-accent-cyan/80 bg-accent-cyan/5' : 'border-white/20'
        }`} />
      </motion.div>
    </>
  )
}
