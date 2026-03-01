'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { techCategories } from '@/lib/data'

type Category = keyof typeof techCategories

const categoryLabels: Record<Category, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Databases',
  devops: 'DevOps & Cloud',
}

const categoryColors: Record<Category, string> = {
  frontend: '#00d9ff',
  backend: '#7c3aed',
  database: '#10b981',
  devops: '#f59e0b',
}

function TechBadge({ name, icon, color, index }: { name: string; icon: string; color: string; index: number }) {
  return (
    <motion.div
      className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl glass border border-white/5 hover:border-white/15 cursor-default"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ scale: 1.05, y: -2 }}
    >
      <span
        className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
        style={{ background: `${color}20`, color, border: `1px solid ${color}30` }}
      >
        {icon}
      </span>
      <span className="font-mono text-xs text-text-secondary group-hover:text-text-primary transition-colors whitespace-nowrap">
        {name}
      </span>

      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{ boxShadow: `0 0 20px ${color}15` }}
      />
    </motion.div>
  )
}

// Central orbit visualization
function TechOrbit({ active }: { active: Category }) {
  const items = techCategories[active]
  const color = categoryColors[active]
  const centerLabel = categoryLabels[active]

  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      {/* Rings */}
      {[1, 0.7, 0.4].map((scale, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-white/5"
          style={{ width: `${scale * 100}%`, height: `${scale * 100}%` }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 20 + i * 10, repeat: Infinity, ease: 'linear' }}
        />
      ))}

      {/* Center */}
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center z-10 glass"
        style={{ border: `1px solid ${color}40`, boxShadow: `0 0 30px ${color}20` }}
      >
        <span className="font-display font-bold text-xs text-center" style={{ color }}>
          {centerLabel}
        </span>
      </div>

      {/* Orbiting items */}
      {items.slice(0, 5).map((tech, i) => {
        const angle = (i * 360) / Math.min(items.length, 5)
        const radius = 90
        const x = Math.cos((angle * Math.PI) / 180) * radius
        const y = Math.sin((angle * Math.PI) / 180) * radius

        return (
          <motion.div
            key={tech.name}
            className="absolute w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold glass"
            style={{
              left: `calc(50% + ${x}px - 20px)`,
              top: `calc(50% + ${y}px - 20px)`,
              background: `${tech.color}15`,
              border: `1px solid ${tech.color}30`,
              color: tech.color,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
            title={tech.name}
          >
            {tech.icon}
          </motion.div>
        )
      })}
    </div>
  )
}

export default function TechStackSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeCategory, setActiveCategory] = useState<Category>('frontend')

  const categories = Object.keys(techCategories) as Category[]

  return (
    <section id="stack" ref={ref} className="py-32 bg-bg-surface relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-accent-violet/4 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-accent-violet" />
            <span className="font-mono text-xs text-accent-violet uppercase tracking-widest">02. Tech Stack</span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-text-primary">
            Built on the{' '}
            <span className="gradient-text">Right Tools</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Orbit visualization */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <TechOrbit active={activeCategory} />
          </motion.div>

          {/* Category tabs + grid */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`font-mono text-xs px-4 py-2 rounded-lg border transition-all ${activeCategory === cat
                    ? 'text-bg-base font-semibold'
                    : 'border-white/10 text-text-muted hover:text-text-secondary'
                    }`}
                  style={
                    activeCategory === cat
                      ? { background: categoryColors[cat], borderColor: categoryColors[cat] }
                      : {}
                  }
                >
                  {categoryLabels[cat]}
                </button>
              ))}
            </div>

            {/* Badges grid */}
            <div className="flex flex-wrap gap-3">
              {techCategories[activeCategory].map((tech, i) => (
                <TechBadge key={tech.name} {...tech} index={i} />
              ))}
            </div>

            {/* Description */}
            <motion.p
              key={activeCategory}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-text-secondary text-sm leading-relaxed font-body"
            >
              {activeCategory === 'frontend' && 'React 18 with TypeScript, Next.js App Router, and Framer Motion. Built 50+ responsive interfaces with pixel-perfect design systems and performance-first architecture.'}
              {activeCategory === 'backend' && 'ASP.NET Core for enterprise-grade APIs, Node.js for real-time services. OAuth 2.0, RBAC, rate limiting, structured logging — production hardened across 25+ APIs.'}
              {activeCategory === 'database' && 'SQL Server with optimized stored procedures, MongoDB aggregation pipelines, Redis caching. Consistently achieving 35–50% query performance improvements.'}
              {activeCategory === 'devops' && 'Azure DevOps CI/CD pipelines, Docker containerization, IIS reverse proxy configuration, Cloudinary media optimization. Infrastructure as code mindset.'}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}
