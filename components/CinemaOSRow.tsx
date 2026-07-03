'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Code2, ExternalLink } from 'lucide-react'
import TechBadge from './TechBadge'
import { gradientForCategory } from '@/lib/types'
import type { Project } from '@/lib/types'

interface CinemaOSRowProps {
  project: Project
  onClick: () => void
  delay?: number
}

export default function CinemaOSRow({ project, onClick, delay = 0 }: CinemaOSRowProps) {
  const tech = typeof project.techStack === 'string' ? JSON.parse(project.techStack) : project.techStack || []

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      onClick={onClick}
      style={{
        cursor: 'pointer',
        display: 'flex',
        gap: 24,
        padding: 20,
        background: 'rgba(255,255,255,0.02)',
        border: '0.5px solid rgba(255,255,255,0.06)',
        borderRadius: 16,
        borderLeft: '3px solid transparent',
      }}
      whileHover={{
        y: -2,
        transition: { duration: 0.2 },
      }}
      onHoverStart={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderLeftColor = 'var(--grad-primary)'
      }}
      onHoverEnd={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderLeftColor = 'transparent'
      }}
    >
      <div
        style={{
          width: 320,
          height: 180,
          borderRadius: 12,
          overflow: 'hidden',
          flexShrink: 0,
          background: 'rgba(255,255,255,0.04)',
          position: 'relative',
        }}
      >
        {project.images && project.images[0] ? (
          <motion.div style={{ position: 'relative', width: '100%', height: '100%' }} whileHover={{ scale: 1.03 }}>
            <Image src={project.images[0].url} alt={project.title} fill sizes="320px" quality={90} style={{ objectFit: 'cover' }} />
          </motion.div>
        ) : (
          <div style={{ width: '100%', height: '100%', background: gradientForCategory(project.category), opacity: 0.4 }} />
        )}
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span
            style={{
              display: 'inline-flex',
              padding: '4px 8px',
              background: 'rgba(123,47,190,0.2)',
              color: '#c084fc',
              fontSize: 11,
              fontWeight: 700,
              borderRadius: 4,
              textTransform: 'uppercase',
              fontFamily: 'var(--font-mono)',
              whiteSpace: 'nowrap',
            }}
          >
            {project.category}
          </span>
          <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
            {project.year}
          </span>
        </div>

        <h2 style={{ fontSize: 28, fontWeight: 700, margin: 0, fontFamily: 'var(--font-display)', color: '#ffffff' }}>
          {project.title}
        </h2>

        <p
          style={{
            fontSize: 14,
            color: 'var(--text-secondary)',
            margin: 0,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {project.description}
        </p>

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', margin: '4px 0' }}>
          {tech.slice(0, 4).map((t: string) => (
            <TechBadge key={t} label={t} />
          ))}
          {tech.length > 4 && (
            <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>+{tech.length - 4}</span>
          )}
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 10px',
                background: 'rgba(255,255,255,0.06)',
                border: '0.5px solid rgba(255,255,255,0.1)',
                borderRadius: 6,
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: 12,
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
              }}
            >
              <Code2 size={14} />
              Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 10px',
                background: 'rgba(255,255,255,0.06)',
                border: '0.5px solid rgba(255,255,255,0.1)',
                borderRadius: 6,
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: 12,
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
              }}
            >
              <ExternalLink size={14} />
              Live
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
