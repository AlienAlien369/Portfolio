'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const resumeUrl = process.env.NEXT_PUBLIC_RESUME_URL || '/Lakshya%20Grover.pdf'
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled ? 'glass border-b border-white/5 py-3' : 'py-5'
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#"
          className="flex items-center gap-3 group"
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent-cyan/20 to-accent-blue/20 border border-accent-cyan/30 flex items-center justify-center group-hover:border-accent-cyan/60 transition-colors">
            <span className="font-display font-bold text-sm gradient-text">LG</span>
          </div>
          <span className="font-display font-semibold text-text-primary hidden sm:block">
            Lakshya<span className="text-accent-cyan">.</span>
          </span>
        </motion.a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(({ label, href }) => (
            <motion.a
              key={href}
              href={href}
              className="relative px-4 py-2 font-mono text-xs text-text-secondary hover:text-text-primary transition-colors group"
              whileHover={{ y: -1 }}
            >
              <span className="text-accent-cyan/50 group-hover:text-accent-cyan transition-colors">_</span>
              {label}
              <motion.div
                className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-accent-cyan to-accent-blue origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <motion.a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs px-4 py-2 rounded-lg border border-white/10 text-text-secondary hover:border-accent-cyan/40 hover:text-accent-cyan transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Resume
          </motion.a>
          <motion.a
            href="#contact"
            className="font-mono text-xs px-4 py-2 rounded-lg bg-gradient-to-r from-accent-cyan to-accent-blue text-bg-base font-semibold hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Hire Me
          </motion.a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-text-secondary hover:text-text-primary"
        >
          <div className="w-5 flex flex-col gap-1.5">
            <motion.span
              className="h-px bg-current block"
              animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 8 : 0 }}
            />
            <motion.span
              className="h-px bg-current block"
              animate={{ opacity: mobileOpen ? 0 : 1 }}
            />
            <motion.span
              className="h-px bg-current block"
              animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -8 : 0 }}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden glass border-t border-white/5"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {links.map(({ label, href }, i) => (
                <motion.a
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="font-mono text-sm text-text-secondary hover:text-accent-cyan py-2 transition-colors"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <span className="text-accent-cyan/50">0{i + 1}. </span>{label}
                </motion.a>
              ))}
              <div className="flex gap-3 mt-4 pt-4 border-t border-white/5">
                <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center font-mono text-xs px-3 py-2 rounded-lg border border-white/10 text-text-secondary">Resume</a>
                <a href="#contact" onClick={() => setMobileOpen(false)} className="flex-1 text-center font-mono text-xs px-3 py-2 rounded-lg bg-gradient-to-r from-accent-cyan to-accent-blue text-bg-base font-semibold">Hire Me</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

