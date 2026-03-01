'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Loader() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(timer); return 100 }
        return p + Math.random() * 15
      })
    }, 100)
    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-bg-base flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo animation */}
      <motion.div
        className="relative mb-12"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-20 h-20 relative">
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-accent-cyan/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-2 rounded-xl border-2 border-accent-blue/50"
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display font-bold text-2xl gradient-text">LG</span>
          </div>
        </div>
      </motion.div>

      {/* Loading text */}
      <motion.div
        className="font-mono text-xs text-text-muted mb-4 tracking-widest uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Initializing system
      </motion.div>

      {/* Progress bar */}
      <div className="w-48 h-px bg-bg-overlay relative overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-accent-cyan to-accent-blue"
          style={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ duration: 0.1 }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{ x: [-192, 192] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <motion.div
        className="font-mono text-xs text-accent-cyan mt-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {Math.min(Math.floor(progress), 100)}%
      </motion.div>
    </motion.div>
  )
}
