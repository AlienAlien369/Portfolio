'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Github, ExternalLink, ChevronDown, TrendingUp, Zap, Target } from 'lucide-react'
import { projects } from '@/lib/data'
import type { Project } from '@/types'

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Frontend', value: 'frontend' },
  { label: 'Backend', value: 'backend' },
  { label: 'Database', value: 'database' },
  // { label: 'DevOps', value: 'devops' },
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className={`glass rounded-2xl border border-white/5 hover:border-white/10 transition-colors overflow-hidden ${project.featured ? 'ring-1 ring-accent-cyan/10' : ''
        }`}
    >
      {/* Card header */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            {project.featured && (
              <span className="inline-block font-mono text-xs px-2 py-0.5 rounded bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 mb-2">
                * Featured
              </span>
            )}
            <h3 className="font-display font-bold text-lg text-text-primary">{project.title}</h3>
            <p className="font-mono text-xs text-text-muted mt-0.5">{project.tagline}</p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-white/10 text-text-muted hover:text-text-primary hover:border-white/20 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={14} />
              </motion.a>
            )}
            {project.live && (
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-white/10 text-text-muted hover:text-accent-cyan hover:border-accent-cyan/30 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={14} />
              </motion.a>
            )}
          </div>
        </div>

        {/* Metrics */}
        <div className="flex gap-3 mb-5">
          {project.metrics.map(m => (
            <div key={m.label} className="flex-1 bg-bg-base rounded-xl px-3 py-2.5 text-center border border-white/5">
              <div className="font-display font-bold text-sm gradient-text">{m.value}</div>
              <div className="font-mono text-xs text-text-muted mt-0.5 leading-tight">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map(t => (
            <span key={t} className="font-mono text-xs px-2 py-0.5 rounded bg-bg-elevated text-text-muted border border-white/5">
              {t}
            </span>
          ))}
        </div>

        {/* Expand button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 font-mono text-xs text-accent-cyan hover:text-accent-blue transition-colors"
        >
          {expanded ? 'Show less' : 'Deep dive'}
          <motion.div animate={{ rotate: expanded ? 180 : 0 }}>
            <ChevronDown size={12} />
          </motion.div>
        </button>
      </div>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="px-6 pb-6 border-t border-white/5 pt-5 space-y-4">
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Target size={12} className="text-red-400" />
                </div>
                <div>
                  <div className="font-mono text-xs text-text-muted mb-1">Problem</div>
                  <p className="text-sm text-text-secondary leading-relaxed">{project.problem}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-lg bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Zap size={12} className="text-accent-blue" />
                </div>
                <div>
                  <div className="font-mono text-xs text-text-muted mb-1">Solution</div>
                  <p className="text-sm text-text-secondary leading-relaxed">{project.solution}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-lg bg-accent-emerald/10 border border-accent-emerald/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <TrendingUp size={12} className="text-accent-emerald" />
                </div>
                <div>
                  <div className="font-mono text-xs text-text-muted mb-1">Impact</div>
                  <p className="text-sm text-text-secondary leading-relaxed">{project.impact}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function ProjectsSection() {
  const githubProfileUrl = process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/AlienAlien369'
  const pinnedProjectIds = (process.env.NEXT_PUBLIC_PROJECT_IDS || 'capture-call,library-system')
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean)

  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeFilter, setActiveFilter] = useState('all')

  const pinnedProjects = projects.filter((p) => pinnedProjectIds.includes(p.id))
  const filtered = pinnedProjects.filter(p =>
    activeFilter === 'all' || p.category.includes(activeFilter)
  )

  return (
    <section id="projects" ref={ref} className="py-32 bg-bg-surface relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent-violet/3 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-accent-emerald" />
            <span className="font-mono text-xs text-accent-emerald uppercase tracking-widest">04. Projects</span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-text-primary mb-4">
            Systems I&apos;ve{' '}
            <span className="gradient-text">Engineered</span>
          </h2>
          <p className="text-text-secondary max-w-xl">
            Each project below addresses a real engineering challenge. Click &quot;deep dive&quot; to see the problem, solution, and measured impact.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`font-mono text-xs px-4 py-2 rounded-lg border transition-all ${activeFilter === f.value
                ? 'bg-accent-cyan/15 border-accent-cyan/40 text-accent-cyan'
                : 'border-white/10 text-text-muted hover:text-text-secondary hover:border-white/20'
                }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Project grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* GitHub link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href={githubProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm text-text-secondary hover:text-accent-cyan transition-colors border border-white/10 hover:border-accent-cyan/30 px-6 py-3 rounded-xl"
          >
            <Github size={16} />
            View all repositories on GitHub
            <ExternalLink size={12} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

