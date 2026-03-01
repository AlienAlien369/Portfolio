'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { Github, Star, GitFork, Code2 } from 'lucide-react'

const githubUsername = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'AlienAlien369'

const stats = [
  { icon: Github, label: 'Public Repos', value: '20+' },
  { icon: Star, label: 'Total Stars', value: '50+' },
  { icon: GitFork, label: 'Contributions', value: '365+' },
  { icon: Code2, label: 'Top Language', value: 'C# / TS' },
]

export default function GithubSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const statsUrl = `https://github-profile-summary-cards.vercel.app/api/cards/stats?username=${githubUsername}&theme=github_dark`
  const langsUrl = `https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=${githubUsername}&theme=github_dark`
  const fallbackStatsUrl = `https://github-profile-summary-cards.vercel.app/api/cards/stats?username=${githubUsername}&theme=nord_dark`
  const fallbackLangsUrl = `https://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=${githubUsername}&theme=github_dark`
  const streakUrl = `https://streak-stats.demolab.com?user=${githubUsername}&theme=transparent&hide_border=true&ring=00d9ff&fire=3b82f6&currStreakLabel=00d9ff&sideLabels=94a3b8&dates=475569`
  const [statsImageSrc, setStatsImageSrc] = useState(statsUrl)
  const [langsImageSrc, setLangsImageSrc] = useState(langsUrl)

  return (
    <section id="github" ref={ref} className="py-32 bg-bg-surface relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-accent-cyan/3 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-accent-cyan" />
            <span className="font-mono text-xs text-accent-cyan uppercase tracking-widest">06. GitHub</span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-text-primary">
            Code in the{' '}
            <span className="gradient-text">Open</span>
          </h2>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
        >
          {stats.map(({ icon: Icon, label, value }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="glass rounded-xl p-5 border border-white/5 hover:border-accent-cyan/20 group transition-colors text-center"
              whileHover={{ y: -3 }}
            >
              <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center mx-auto mb-3 group-hover:bg-accent-cyan/20 transition-colors">
                <Icon size={18} className="text-accent-cyan" />
              </div>
              <div className="font-display font-bold text-xl gradient-text mb-1">{value}</div>
              <div className="font-mono text-xs text-text-muted">{label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* GitHub stats images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl border border-white/5 p-6 hover:border-white/10 transition-colors"
          >
            <div className="font-mono text-xs text-text-muted mb-4 uppercase tracking-wider">GitHub Stats</div>
            <div className="relative w-full h-40">
              <Image
                src={statsImageSrc}
                alt="GitHub Stats"
                fill
                unoptimized
                className="object-contain object-left"
                onError={() => {
                  if (statsImageSrc !== fallbackStatsUrl) setStatsImageSrc(fallbackStatsUrl)
                }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="glass rounded-2xl border border-white/5 p-6 hover:border-white/10 transition-colors"
          >
            <div className="font-mono text-xs text-text-muted mb-4 uppercase tracking-wider">Top Languages</div>
            <div className="relative w-full h-40">
              <Image
                src={langsImageSrc}
                alt="Top Languages"
                fill
                unoptimized
                className="object-contain object-left"
                onError={() => {
                  if (langsImageSrc !== fallbackLangsUrl) setLangsImageSrc(fallbackLangsUrl)
                }}
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="glass rounded-2xl border border-white/5 p-6 hover:border-white/10 transition-colors mb-10"
        >
          <div className="font-mono text-xs text-text-muted mb-4 uppercase tracking-wider">Contribution Streak</div>
          <div className="relative w-full h-32">
            <Image
              src={streakUrl}
              alt="GitHub Streak"
              fill
              unoptimized
              className="object-contain object-left"
            />
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <a
            href={`https://github.com/${githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm px-6 py-3 rounded-xl bg-gradient-to-r from-accent-cyan/15 to-accent-blue/15 border border-accent-cyan/25 text-accent-cyan hover:from-accent-cyan/25 hover:to-accent-blue/25 transition-all"
          >
            <Github size={16} />
            github.com/{githubUsername}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
