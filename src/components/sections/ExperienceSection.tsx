'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase, MapPin, Calendar, CheckCircle } from 'lucide-react'
import { experiences } from '@/lib/data'

export default function ExperienceSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="experience" ref={ref} className="py-32 bg-bg-base relative overflow-hidden">
      <div className="absolute right-0 bottom-0 w-96 h-96 rounded-full bg-accent-blue/3 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-accent-blue" />
            <span className="font-mono text-xs text-accent-blue uppercase tracking-widest">03. Experience</span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-text-primary">
            Where I&apos;ve{' '}
            <span className="gradient-text">Shipped</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            className="absolute left-4 md:left-8 top-0 w-px bg-gradient-to-b from-accent-blue via-accent-violet to-transparent"
            initial={{ scaleY: 0, originY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            style={{ height: '100%' }}
          />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.2, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                className="relative pl-16 md:pl-24"
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-0 md:left-4 top-0 w-8 h-8 rounded-full flex items-center justify-center glass border"
                  style={{ borderColor: `${exp.color}40`, boxShadow: `0 0 20px ${exp.color}20` }}
                >
                  <Briefcase size={14} style={{ color: exp.color }} />
                </div>

                {/* Card */}
                <div className="glass rounded-2xl p-6 md:p-8 border border-white/5 hover:border-white/10 transition-colors group">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
                    <div>
                      <h3 className="font-display font-bold text-xl text-text-primary mb-1">{exp.role}</h3>
                      <div
                        className="font-mono text-sm font-semibold"
                        style={{ color: exp.color }}
                      >
                        {exp.company}
                      </div>
                    </div>
                    <div className="flex flex-col sm:items-end gap-1.5">
                      <div className="flex items-center gap-1.5 text-text-muted font-mono text-xs">
                        <Calendar size={12} />
                        {exp.period}
                      </div>
                      <div className="flex items-center gap-1.5 text-text-muted font-mono text-xs">
                        <MapPin size={12} />
                        {exp.location}
                      </div>
                    </div>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-3 mb-6">
                    {exp.highlights.map((highlight, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.5 + index * 0.2 + i * 0.05 }}
                        className="flex gap-3 text-text-secondary text-sm leading-relaxed"
                      >
                        <CheckCircle
                          size={14}
                          className="flex-shrink-0 mt-0.5"
                          style={{ color: exp.color }}
                        />
                        <span>{highlight}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map(t => (
                      <span
                        key={t}
                        className="font-mono text-xs px-2.5 py-1 rounded-md"
                        style={{
                          background: `${exp.color}10`,
                          border: `1px solid ${exp.color}25`,
                          color: exp.color,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="relative pl-16 md:pl-24"
            >
              <div className="absolute left-0 md:left-4 top-0 w-8 h-8 rounded-full flex items-center justify-center glass border border-accent-emerald/40">
                <span className="text-accent-emerald text-xs">🎓</span>
              </div>

              <div className="glass rounded-2xl p-6 md:p-8 border border-white/5">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div>
                    <h3 className="font-display font-bold text-xl text-text-primary mb-1">B.Tech — Information Technology</h3>
                    <div className="font-mono text-sm font-semibold text-accent-emerald">Guru Gobind Singh Indraprastha University</div>
                  </div>
                  <div className="flex flex-col sm:items-end gap-1.5">
                    <span className="font-mono text-xs text-text-muted">Aug 2020 – Jul 2024</span>
                    <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-accent-emerald/10 border border-accent-emerald/25 text-accent-emerald">CGPA: 9.0/10</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

