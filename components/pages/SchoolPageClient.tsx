'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import CinemaOSRow from '../CinemaOSRow'
import ProjectDetailModal from '../ProjectDetailModal'
import ScrollReveal from '../ScrollReveal'
import GlassCard from '../GlassCard'
import TechBadge from '../TechBadge'
import type { Project } from '@/lib/types'

interface SchoolPageClientProps {
  projects: Project[]
}

export default function SchoolPageClient({ projects }: SchoolPageClientProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const featured = projects.find((p) => p.featured)
  const listProjects = featured ? projects.filter((p) => !p.featured) : projects

  const tech = featured ? (typeof featured.techStack === 'string' ? JSON.parse(featured.techStack) : featured.techStack || []) : []

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', color: 'var(--text-primary)', paddingTop: 120 }}>
      <section style={{ padding: '0 32px 80px', maxWidth: 1200, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 3, height: 24, background: 'var(--grad-school)', borderRadius: 2 }} />
            <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em' }}>
              School Projects
            </span>
          </div>

          <h1 style={{ fontSize: 56, fontWeight: 800, fontFamily: 'var(--font-display)', margin: 0, marginBottom: 12 }}>
            School Projects
          </h1>
          <p style={{ fontSize: 16, color: 'var(--text-secondary)', margin: 0, maxWidth: 600, lineHeight: 1.6 }}>
            Academic work and thesis projects at TU Dublin
          </p>

          <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 0.8, delay: 0.2 }} style={{ height: 2, background: 'var(--grad-school)', borderRadius: 1, marginTop: 20, maxWidth: 400 }} />
        </motion.div>
      </section>

      <section style={{ padding: '0 32px 80px', maxWidth: 1200, margin: '0 auto' }}>
        <ScrollReveal>
          {featured && (
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} onClick={() => setSelectedProject(featured)} style={{ cursor: 'pointer', marginBottom: 40 }}>
              <div style={{ position: 'relative', aspectRatio: '21/9', borderRadius: 16, overflow: 'hidden', border: '0.5px solid rgba(255,255,255,0.08)' }}>
                {featured.images && featured.images[0] ? (
                  <Image src={featured.images[0].url} alt={featured.title} fill style={{ objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: 'var(--grad-school)', opacity: 0.4 }} />
                )}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(8,8,8,0.9) 40%, transparent)' }} />

                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '40px', zIndex: 2 }}>
                  <span style={{ display: 'inline-flex', width: 'fit-content', padding: '4px 8px', background: 'rgba(0,212,255,0.2)', color: '#22d3ee', fontSize: 10, fontWeight: 700, borderRadius: 4, textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: 16 }}>
                    Featured
                  </span>

                  <h2 style={{ fontSize: 40, fontWeight: 800, fontFamily: 'var(--font-display)', margin: 0, marginBottom: 8 }}>
                    {featured.title}
                  </h2>

                  <p style={{ fontSize: 14, color: 'var(--text-secondary)', margin: 0, marginBottom: 16, maxWidth: 600 }}>
                    {featured.description}
                  </p>

                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
                    {tech.slice(0, 5).map((t: string) => (
                      <TechBadge key={t} label={t} />
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '40px 0' }} />
            </motion.div>
          )}

          {listProjects.length === 0 && !featured ? (
            <GlassCard style={{ padding: 40, textAlign: 'center' }}>
              <p style={{ fontSize: 16, color: 'var(--text-muted)', margin: 0 }}>No projects yet. Add some through the admin dashboard.</p>
            </GlassCard>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {listProjects.map((project, i) => (
                <CinemaOSRow key={project.id} project={project} onClick={() => setSelectedProject(project)} delay={i * 0.08} />
              ))}
            </div>
          )}
        </ScrollReveal>
      </section>

      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} isSemester={true} />
    </div>
  )
}
