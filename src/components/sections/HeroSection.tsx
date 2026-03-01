'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Download, Github, Linkedin, Terminal, ChevronDown } from 'lucide-react'
import { useTypewriter } from '@/hooks/useAnimations'

// Animated particle canvas
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    let w = canvas.width = window.innerWidth
    let h = canvas.height = window.innerHeight
    let animId: number

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number; color: string }[] = []
    const colors = ['#00d9ff', '#3b82f6', '#7c3aed']

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.08 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw particles
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color + Math.floor(p.alpha * 255).toString(16).padStart(2, '0')
        ctx.fill()

        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
      })

      animId = requestAnimationFrame(draw)
    }

    draw()

    const resize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-60" />
}

export default function HeroSection() {
  const resumeUrl = process.env.NEXT_PUBLIC_RESUME_URL || '/Lakshya%20Grover.pdf'
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef })
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const typewriterText = useTypewriter([
    'Scalable Cloud Systems',
    'High-Performance APIs',
    'Enterprise Applications',
    'Real-Time Data Pipelines',
    'Cloud-Native Architecture',
  ], 70, 1800)

  const staggerContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  }
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] } },
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center bg-bg-base overflow-hidden"
    >
      {/* Layered background */}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-base/50 to-bg-base" />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-accent-cyan/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent-violet/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent-blue/3 blur-3xl pointer-events-none" />

      {/* Particles */}
      <ParticleCanvas />

      {/* Content */}
      <motion.div
        className="relative max-w-6xl mx-auto px-6 pt-28 pb-20 w-full"
        style={{ y, opacity }}
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-accent-cyan/20">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse" />
              <span className="font-mono text-xs text-text-secondary">Available for opportunities</span>
            </div>
          </motion.div>

          {/* Main headline */}
          <motion.div variants={fadeUp} className="mb-4">
            <h1 className="font-display font-extrabold leading-none tracking-tight">
              <span className="block text-5xl sm:text-7xl md:text-8xl text-text-primary">
                Lakshya
              </span>
              <span className="block text-5xl sm:text-7xl md:text-8xl gradient-text">
                Grover
              </span>
            </h1>
          </motion.div>

          {/* Animated tagline */}
          <motion.div variants={fadeUp} className="mb-6 h-12 flex items-center">
            <div className="flex items-center gap-3">
              <Terminal size={16} className="text-accent-cyan flex-shrink-0" />
              <span className="font-mono text-lg sm:text-xl text-text-secondary">
                Engineering{' '}
                <span className="text-accent-cyan text-glow-cyan">{typewriterText}</span>
                <span className="cursor-blink text-accent-cyan">|</span>
              </span>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="max-w-2xl text-text-secondary text-lg leading-relaxed mb-10 font-body"
          >
            Full-Stack Engineer with deep expertise in{' '}
            <span className="text-text-primary font-medium">ASP.NET Core</span>,{' '}
            <span className="text-text-primary font-medium">React.js</span>, and{' '}
            <span className="text-text-primary font-medium">cloud-native architecture</span>.
            I build systems that handle scale, eliminate failure modes, and ship measurable performance gains.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-16">
            <motion.a
              href="#projects"
              className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-blue text-bg-base font-semibold font-mono text-sm hover:shadow-glow-cyan transition-shadow"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Projects
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              href="#contact"
              className="flex items-center gap-2 px-6 py-3 rounded-xl glass border border-white/10 text-text-primary font-mono text-sm hover:border-accent-cyan/30 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Contact Me
            </motion.a>
            <motion.a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl glass border border-white/10 text-text-secondary font-mono text-sm hover:text-text-primary hover:border-white/20 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download size={14} />
              Resume
            </motion.a>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-8 pt-8 border-t border-white/5"
          >
            {[
              { value: '30+', label: 'Apps Shipped' },
              { value: '25+', label: 'APIs Built' },
              { value: '99.9%', label: 'Uptime SLA' },
              { value: '5K+', label: 'Users Served' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="font-display font-bold text-2xl gradient-text">{value}</div>
                <div className="font-mono text-xs text-text-muted mt-0.5">{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Social links - vertical */}
      <motion.div
        className="hidden lg:flex fixed right-8 bottom-1/3 flex-col gap-4 items-center z-10"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-white/20" />
        {[
          { icon: Github, href: 'https://github.com/AlienAlien369', label: 'GitHub' },
          { icon: Linkedin, href: 'https://linkedin.com/in/lakshya-grover', label: 'LinkedIn' },
        ].map(({ icon: Icon, href, label }) => (
          <motion.a
            key={href}
            href={href}
            target="_blank"
            aria-label={label}
            className="text-text-muted hover:text-accent-cyan transition-colors p-1"
            whileHover={{ scale: 1.2, x: -3 }}
          >
            <Icon size={16} />
          </motion.a>
        ))}
        <div className="w-px h-16 bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="font-mono text-xs text-text-muted">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} className="text-text-muted" />
        </motion.div>
      </motion.div>
    </section>
  )
}
