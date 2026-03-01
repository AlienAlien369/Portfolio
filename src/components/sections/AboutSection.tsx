'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code2, Cpu, Globe, Zap } from 'lucide-react'
import { metrics } from '@/lib/data'
import { useCountUp } from '@/hooks/useAnimations'

function MetricCard({ metric, isInView }: { metric: typeof metrics[0]; isInView: boolean }) {
  const numericValue = parseFloat(metric.value.replace(/[^0-9.]/g, ''))
  const count = useCountUp(numericValue, 1800, isInView)
  const hasK = metric.value.includes('K')
  
  return (
    <motion.div
      className="glass rounded-2xl p-6 border border-white/5 hover:border-accent-cyan/20 transition-colors group"
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <div className="text-2xl mb-3">{metric.icon}</div>
      <div className="font-display font-bold text-3xl gradient-text mb-1">
        {hasK ? `${count}K` : count}{metric.suffix}
      </div>
      <div className="font-mono text-xs text-text-muted uppercase tracking-wider mb-2">{metric.label}</div>
      <div className="text-xs text-text-secondary">{metric.description}</div>
      
      {/* Glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-cyan/0 to-accent-blue/0 group-hover:from-accent-cyan/5 group-hover:to-accent-blue/5 transition-all pointer-events-none" />
    </motion.div>
  )
}

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const pillars = [
    { icon: Globe, label: 'Cloud Architecture', desc: 'Designing for resilience, scalability, and zero-downtime deployments' },
    { icon: Zap, label: 'Performance Engineering', desc: '45% query optimization, 30% API latency reduction — measured impact' },
    { icon: Code2, label: 'Full-Stack Depth', desc: '.NET backend to React frontend, end-to-end ownership' },
    { icon: Cpu, label: 'System Design', desc: 'RBAC, reverse proxies, event-driven pipelines, observability' },
  ]

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  }
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
  }

  return (
    <section id="about" ref={ref} className="py-32 bg-bg-base relative overflow-hidden">
      {/* Subtle bg decoration */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-accent-blue/3 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
        >
          {/* Section header */}
          <motion.div variants={fadeUp} className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-accent-cyan" />
              <span className="font-mono text-xs text-accent-cyan uppercase tracking-widest">01. About</span>
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-text-primary mb-6">
              Engineered for{' '}
              <span className="gradient-text">Impact</span>
            </h2>
            <div className="max-w-3xl space-y-4 text-text-secondary leading-relaxed">
              <p>
                I&apos;m a Full-Stack Engineer who builds enterprise systems that don&apos;t just work — they <span className="text-text-primary font-medium">scale under pressure</span>, remain secure under attack, and deliver measurable performance gains in production.
              </p>
              <p>
                With experience spanning <span className="text-text-primary font-medium">ASP.NET Core microservices</span> to <span className="text-text-primary font-medium">React TypeScript dashboards</span>, I take ownership of the full stack. My engineering decisions are driven by data: I&apos;ve reduced query execution time by 45%, cut API latency by 30%, and maintained 99.9% uptime across systems serving 5,000+ active users.
              </p>
              <p>
                I thrive at the intersection of <span className="text-text-primary font-medium">system design</span> and <span className="text-text-primary font-medium">product execution</span> — architecting authentication frameworks, reverse proxy configurations, real-time data pipelines, and cloud-native deployments with equal confidence.
              </p>
            </div>
          </motion.div>

          {/* Pillars */}
          <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
            {pillars.map(({ icon: Icon, label, desc }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="glass rounded-xl p-5 border border-white/5 hover:border-accent-cyan/20 group transition-colors"
                whileHover={{ y: -3 }}
              >
                <div className="w-10 h-10 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center mb-4 group-hover:bg-accent-cyan/20 transition-colors">
                  <Icon size={18} className="text-accent-cyan" />
                </div>
                <div className="font-display font-semibold text-sm text-text-primary mb-2">{label}</div>
                <div className="text-xs text-text-secondary leading-relaxed">{desc}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Metrics grid */}
          <motion.div variants={fadeUp} className="mb-4">
            <h3 className="font-display font-bold text-xl text-text-primary mb-8">
              Performance Dashboard
            </h3>
          </motion.div>
          <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {metrics.map(metric => (
              <motion.div key={metric.label} variants={fadeUp} className="relative">
                <MetricCard metric={metric} isInView={isInView} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

