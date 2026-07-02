'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import ProjectHero from '../ProjectHero'
import ProjectCard from '../ProjectCard'
import ScrollReveal from '../ScrollReveal'
import EmptyState from '../EmptyState'
import SectionHeader from '../SectionHeader'
import { FolderOpen } from 'lucide-react'
import type { Project } from '@/lib/types'

interface PersonalPageClientProps {
  projects: Project[]
}

export default function PersonalPageClient({ projects }: PersonalPageClientProps) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', color: 'var(--text-primary)', paddingTop: 120 }}>
      <section style={{ padding: '0 32px 48px', maxWidth: 1200, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 3, height: 24, background: 'var(--grad-personal)', borderRadius: 2 }} />
            <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em' }}>
              Personal Work
            </span>
          </div>
          <h1 style={{ fontSize: 56, fontWeight: 700, fontFamily: 'var(--font-display)', margin: 0, marginBottom: 12 }}>Personal Projects</h1>
          <p style={{ fontSize: 16, color: 'var(--text-secondary)', margin: 0, maxWidth: 600, lineHeight: 1.6 }}>
            Side projects, experiments, and shipped ideas
          </p>
          <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 0.8, delay: 0.2 }} style={{ height: 2, background: 'var(--grad-personal)', borderRadius: 1, marginTop: 20, maxWidth: 400 }} />
        </motion.div>
      </section>

      <section style={{ padding: '0 32px 80px', maxWidth: 1200, margin: '0 auto' }}>
        {projects.length === 0 ? (
          <EmptyState icon={<FolderOpen size={32} />} title="No personal projects yet" message="Projects added through the admin dashboard will appear here." />
        ) : (
          <ScrollReveal>
            <div style={{ display: 'grid', gap: 40 }}>
              <ProjectHero projects={projects} gradient="var(--grad-personal)" eyebrow="Featured" />

              <div>
                <SectionHeader title="All personal projects" subtitle={`${projects.length} project${projects.length === 1 ? '' : 's'}`} />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20, marginTop: 8 }}>
                  {projects.map((project) => (
                    <Link key={project.id} href={`/projects/${project.slug}`} style={{ textDecoration: 'none' }}>
                      <ProjectCard project={project} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}
      </section>
    </div>
  )
}
