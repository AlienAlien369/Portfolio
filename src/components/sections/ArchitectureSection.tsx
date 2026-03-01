'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Globe, Shield, Cpu, Database, Cloud, BarChart3, ArrowRight, ChevronRight } from 'lucide-react'

const architectureNodes = [
  { id: 'client', label: 'Client Apps', sub: 'React / Next.js / Mobile', icon: Globe, color: '#00d9ff', x: 0 },
  { id: 'gateway', label: 'API Gateway', sub: 'Rate Limiting + JWT Auth', icon: Shield, color: '#3b82f6', x: 1 },
  { id: 'services', label: 'Microservices', sub: 'ASP.NET Core', icon: Cpu, color: '#7c3aed', x: 2 },
  { id: 'cache', label: 'Cache Layer', sub: 'Redis', icon: BarChart3, color: '#f59e0b', x: 3 },
  { id: 'database', label: 'Data Layer', sub: 'SQL Server / MongoDB', icon: Database, color: '#10b981', x: 4 },
  { id: 'cloud', label: 'Cloud Storage', sub: 'Azure / Cloudinary', icon: Cloud, color: '#ec4899', x: 5 },
]

const designPrinciples = [
  {
    title: 'Security by Default',
    desc: 'JWT/OAuth 2.0 at the gateway, RBAC at every service layer, zero-trust internal communication.',
    icon: '🔐',
    color: '#3b82f6',
  },
  {
    title: 'Performance First',
    desc: 'Redis caching, connection pooling, indexed queries, CDN-served assets. Every layer optimized.',
    icon: '⚡',
    color: '#f59e0b',
  },
  {
    title: 'Observable Systems',
    desc: 'Structured logging, distributed tracing, health checks, and alerting built from day one.',
    icon: '📊',
    color: '#10b981',
  },
  {
    title: 'Resilient by Design',
    desc: 'Circuit breakers, retry policies, graceful degradation, and chaos-tested failure modes.',
    icon: '🛡',
    color: '#ec4899',
  },
]

export default function ArchitectureSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeFlow, setActiveFlow] = useState<number | null>(null)
  const [showCode, setShowCode] = useState(false)

  return (
    <section id="architecture" ref={ref} className="py-32 bg-bg-base relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent-violet/3 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-accent-violet" />
            <span className="font-mono text-xs text-accent-violet uppercase tracking-widest">05. Architecture</span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-text-primary mb-4">
            System Design{' '}
            <span className="gradient-text">Mindset</span>
          </h2>
          <p className="text-text-secondary max-w-2xl">
            I don&apos;t just write code — I architect systems. Every component is designed with security, performance, and observability as first-class concerns.
          </p>
        </motion.div>

        {/* Architecture flow diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="glass rounded-2xl border border-white/5 p-8 mb-12 overflow-x-auto"
        >
          <div className="font-mono text-xs text-text-muted mb-6 uppercase tracking-widest">
            ⬡ Request Flow Architecture
          </div>

          <div className="flex items-center gap-0 min-w-max mx-auto w-fit">
            {architectureNodes.map((node, i) => {
              const Icon = node.icon
              return (
                <div key={node.id} className="flex items-center">
                  <motion.div
                    className="flex flex-col items-center gap-2 cursor-pointer group"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    onHoverStart={() => setActiveFlow(i)}
                    onHoverEnd={() => setActiveFlow(null)}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300"
                      style={{
                        background: `${node.color}15`,
                        border: `1px solid ${activeFlow === i ? node.color + '60' : node.color + '25'}`,
                        boxShadow: activeFlow === i ? `0 0 30px ${node.color}25` : 'none',
                      }}
                    >
                      <Icon size={22} style={{ color: node.color }} />
                    </div>
                    <div className="text-center">
                      <div className="font-mono text-xs text-text-primary whitespace-nowrap">{node.label}</div>
                      <div className="font-mono text-xs text-text-muted whitespace-nowrap">{node.sub}</div>
                    </div>
                  </motion.div>

                  {i < architectureNodes.length - 1 && (
                    <motion.div
                      className="flex items-center mx-2 mb-8"
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      <div className="w-8 h-px bg-gradient-to-r from-white/10 to-white/20" />
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                      >
                        <ChevronRight size={12} className="text-white/30" />
                      </motion.div>
                    </motion.div>
                  )}
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Design principles grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {designPrinciples.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="glass rounded-xl p-5 border border-white/5 hover:border-white/10 group transition-colors"
              whileHover={{ y: -3 }}
            >
              <div className="text-2xl mb-3">{p.icon}</div>
              <div className="font-display font-semibold text-sm text-text-primary mb-2">{p.title}</div>
              <p className="text-xs text-text-secondary leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

