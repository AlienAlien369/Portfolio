export interface Project {
  id: string
  title: string
  tagline: string
  problem: string
  solution: string
  impact: string
  tech: string[]
  category: string[]
  github?: string
  live?: string
  metrics: { label: string; value: string }[]
  featured?: boolean
}

export interface Experience {
  company: string
  role: string
  period: string
  location: string
  type: 'fulltime' | 'contract'
  highlights: string[]
  tech: string[]
  color: string
}

export interface TechItem {
  name: string
  icon: string
  category: 'frontend' | 'backend' | 'database' | 'devops'
  color: string
}

export interface Metric {
  label: string
  value: string
  suffix?: string
  description: string
  icon: string
}
