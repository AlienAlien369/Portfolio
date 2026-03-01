'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Send, Mail, MapPin, Phone, Github, Linkedin, CheckCircle, Loader2 } from 'lucide-react'

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [feedback, setFeedback] = useState('')
  const [focused, setFocused] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'loading') return

    setStatus('loading')
    setFeedback('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json().catch(() => ({} as { error?: string; message?: string }))

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      setStatus('success')
      setFeedback(data.message || 'Message sent successfully.')
      setForm({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => {
        setStatus('idle')
        setFeedback('')
      }, 3000)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to send message'
      setStatus('error')
      setFeedback(message)
    }
  }

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'groverlakshya.25.lg@gmail.com', href: 'mailto:groverlakshya.25.lg@gmail.com' },
    { icon: MapPin, label: 'Location', value: 'Gurugram, Haryana, India', href: null },
    { icon: Phone, label: 'Phone', value: '+91-8800191819', href: 'tel:+918800191819' },
  ]

  const socials = [
    { icon: Github, href: 'https://github.com/AlienAlien369', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/lakshya-grover', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:groverlakshya.25.lg@gmail.com', label: 'Email' },
  ]

  const inputClasses = (field: string) => `
    w-full bg-bg-elevated border rounded-xl px-4 py-3 font-mono text-sm text-text-primary
    placeholder:text-text-muted outline-none transition-all duration-300
    ${focused === field ? 'border-accent-cyan/50 shadow-[0_0_0_3px_rgba(0,217,255,0.06)]' : 'border-white/10 hover:border-white/15'}
  `

  return (
    <section id="contact" ref={ref} className="py-32 bg-bg-base relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-80 h-80 rounded-full bg-accent-blue/4 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-accent-blue" />
            <span className="font-mono text-xs text-accent-blue uppercase tracking-widest">07. Contact</span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-text-primary mb-4">
            Let&apos;s Build Something{' '}
            <span className="gradient-text">Great</span>
          </h2>
          <p className="text-text-secondary max-w-xl">
            Open to senior full-stack roles, cloud architecture opportunities, and interesting engineering challenges. Let&apos;s talk.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left - info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="font-display font-semibold text-lg text-text-primary mb-6">Get in touch</h3>
              <div className="space-y-4">
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-accent-cyan" />
                    </div>
                    <div>
                      <div className="font-mono text-xs text-text-muted mb-1">{label}</div>
                      {href ? (
                        <a href={href} className="text-sm text-text-secondary hover:text-accent-cyan transition-colors">
                          {value}
                        </a>
                      ) : (
                        <div className="text-sm text-text-secondary">{value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Socials */}
            <div>
              <h3 className="font-mono text-xs text-text-muted uppercase tracking-wider mb-4">Find me online</h3>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-text-muted hover:text-accent-cyan hover:border-accent-cyan/30 transition-all"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={16} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Status badge */}
            <div className="glass rounded-xl p-4 border border-accent-emerald/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
                <span className="font-mono text-xs text-accent-emerald">Available for work</span>
              </div>
              <p className="text-xs text-text-muted">
                Currently open to full-time senior engineering roles and select consulting opportunities.
              </p>
            </div>
          </motion.div>

          {/* Right - form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass rounded-2xl border border-white/5 p-6 md:p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="font-mono text-xs text-text-muted uppercase tracking-wider block mb-2">Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                    className={inputClasses('name')}
                    required
                  />
                </div>
                <div>
                  <label className="font-mono text-xs text-text-muted uppercase tracking-wider block mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    className={inputClasses('email')}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-xs text-text-muted uppercase tracking-wider block mb-2">Subject</label>
                <input
                  type="text"
                  placeholder="What's this about?"
                  value={form.subject}
                  onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                  onFocus={() => setFocused('subject')}
                  onBlur={() => setFocused(null)}
                  className={inputClasses('subject')}
                  required
                />
              </div>

              <div>
                <label className="font-mono text-xs text-text-muted uppercase tracking-wider block mb-2">Message</label>
                <textarea
                  rows={5}
                  placeholder="Tell me about the opportunity or project..."
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  className={`${inputClasses('message')} resize-none`}
                  required
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === 'loading'}
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-mono font-semibold text-sm transition-all ${status === 'success'
                    ? 'bg-accent-emerald/20 border border-accent-emerald/40 text-accent-emerald'
                    : status === 'error'
                      ? 'bg-red-500/15 border border-red-500/40 text-red-300'
                    : 'bg-gradient-to-r from-accent-cyan to-accent-blue text-bg-base hover:opacity-90'
                  } disabled:opacity-70`}
                whileHover={status !== 'loading' ? { scale: 1.01 } : {}}
                whileTap={status !== 'loading' ? { scale: 0.99 } : {}}
              >
                <AnimatePresence mode="wait">
                  {status === 'idle' && (
                    <motion.span key="idle" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <Send size={15} />
                      Send Message
                    </motion.span>
                  )}
                  {status === 'loading' && (
                    <motion.span key="loading" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <Loader2 size={15} className="animate-spin" />
                      Sending...
                    </motion.span>
                  )}
                  {status === 'success' && (
                    <motion.span key="success" className="flex items-center gap-2" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                      <CheckCircle size={15} />
                      {feedback || 'Message sent!'}
                    </motion.span>
                  )}
                  {status === 'error' && (
                    <motion.span key="error" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      {feedback || 'Failed to send message'}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
