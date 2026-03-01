'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      setProgress(scrollTop / (scrollHeight - clientHeight))
    }
    window.addEventListener('scroll', update)
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-violet"
      style={{ scaleX: progress }}
    />
  )
}
