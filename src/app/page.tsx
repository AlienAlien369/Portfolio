'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/ui/Navbar'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import TechStackSection from '@/components/sections/TechStackSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import ArchitectureSection from '@/components/sections/ArchitectureSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import GithubSection from '@/components/sections/GithubSection'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/ui/Footer'
import Loader from '@/components/ui/Loader'
import CustomCursor from '@/components/ui/CustomCursor'
import ScrollProgress from '@/components/ui/ScrollProgress'

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <Loader />

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main className="relative">
        <HeroSection />
        <AboutSection />
        <TechStackSection />
        <ExperienceSection />
        <ProjectsSection />
        <ArchitectureSection />
        <GithubSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
