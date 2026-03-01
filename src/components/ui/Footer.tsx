'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Terminal } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/5 bg-bg-base">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-cyan/20 to-accent-blue/20 border border-accent-cyan/30 flex items-center justify-center">
              <span className="font-display font-bold text-xs gradient-text">LG</span>
            </div>
            <div>
              <p className="font-display font-semibold text-text-primary text-sm">Lakshya Grover</p>
              <p className="font-mono text-xs text-text-muted">Full-Stack Cloud Engineer</p>
            </div>
          </div>

          {/* Center */}
          <div className="flex items-center gap-1 font-mono text-xs text-text-muted">
            <Terminal size={12} className="text-accent-cyan" />
            <span className="ml-1">Built with Next.js, TypeScript & Framer Motion</span>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            {[
              { icon: Github, href: 'https://github.com/AlienAlien369', label: 'GitHub' },
              { icon: Linkedin, href: 'https://linkedin.com/in/lakshya-grover', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:groverlakshya.25.lg@gmail.com', label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-text-muted hover:text-accent-cyan transition-colors p-2"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="font-mono text-xs text-text-muted">
            © {year} Lakshya Grover. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
