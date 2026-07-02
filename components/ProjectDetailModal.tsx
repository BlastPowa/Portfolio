'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, ExternalLink, Code2 } from 'lucide-react'
import TechBadge from './TechBadge'
import type { Project } from '@/lib/types'

interface ProjectDetailModalProps {
  project: Project | null
  onClose: () => void
  isSemester?: boolean
}

export default function ProjectDetailModal({
  project,
  onClose,
  isSemester = false,
}: ProjectDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    if (!project) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [project])

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  if (!project) return null

  const images = project.images || []
  const currentImage = images[currentImageIndex]
  const hasMultipleImages = images.length > 1
  const tech = typeof project.techStack === 'string' ? JSON.parse(project.techStack) : project.techStack || []

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(8,8,8,0.96)',
          backdropFilter: 'blur(20px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'relative',
            width: '90%',
            maxWidth: 1400,
            maxHeight: '90vh',
            background: 'rgba(8,8,8,0.8)',
            border: '0.5px solid rgba(255,255,255,0.08)',
            borderRadius: 20,
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
          }}
        >
          {currentImage && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${currentImage.url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(40px) scale(1.1)',
                opacity: 0.2,
                zIndex: 0,
              }}
            />
          )}

          <div
            style={{
              position: 'relative',
              padding: '60px 40px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              zIndex: 1,
            }}
          >
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
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
                }}
              >
                {project.category}
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  textTransform: 'uppercase',
                }}
              >
                {project.year}
              </span>
              {isSemester && project.semester && (
                <span
                  style={{
                    fontSize: 11,
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)',
                    textTransform: 'uppercase',
                  }}
                >
                  {project.semester}
                </span>
              )}
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 52,
                fontWeight: 800,
                margin: 0,
                marginBottom: 20,
                lineHeight: 1.1,
                color: '#ffffff',
              }}
            >
              {project.title}
            </h1>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
              {tech.slice(0, 6).map((t: string) => (
                <TechBadge key={t} label={t} />
              ))}
            </div>

            <p
              style={{
                fontSize: 15,
                color: 'var(--text-secondary)',
                margin: 0,
                marginBottom: 24,
                lineHeight: 1.7,
                maxWidth: 500,
              }}
            >
              {project.longDescription || project.description}
            </p>

            <div style={{ display: 'flex', gap: 12 }}>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '10px 16px',
                    background: 'rgba(255,255,255,0.08)',
                    border: '0.5px solid rgba(255,255,255,0.16)',
                    borderRadius: 8,
                    color: '#ffffff',
                    textDecoration: 'none',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                  }}
                >
                  <Code2 size={16} />
                  View Source
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '10px 16px',
                    background: 'var(--grad-primary)',
                    borderRadius: 8,
                    color: '#ffffff',
                    textDecoration: 'none',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  <ExternalLink size={16} />
                  Live Demo
                </a>
              )}
            </div>
          </div>

          <div style={{ position: 'relative', padding: '40px', display: 'flex', flexDirection: 'column', gap: 16, zIndex: 1 }}>
            {images.length > 0 ? (
              <>
                <div style={{ position: 'relative', aspectRatio: '16/9', borderRadius: 12, overflow: 'hidden', background: 'rgba(255,255,255,0.04)' }}>
                  <AnimatePresence mode="wait">
                    {currentImage && (
                      <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ position: 'relative', width: '100%', height: '100%' }}
                      >
                        <Image
                          src={currentImage.url}
                          alt={`${project.title} - ${currentImageIndex + 1}`}
                          fill
                          style={{ objectFit: 'cover' }}
                          priority
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {hasMultipleImages && (
                    <>
                      <button
                        onClick={() => setCurrentImageIndex((i) => (i - 1 + images.length) % images.length)}
                        style={{
                          position: 'absolute',
                          left: 12,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: 36,
                          height: 36,
                          borderRadius: '50%',
                          background: 'rgba(255,255,255,0.1)',
                          border: '0.5px solid rgba(255,255,255,0.2)',
                          color: '#ffffff',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          zIndex: 10,
                        }}
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        onClick={() => setCurrentImageIndex((i) => (i + 1) % images.length)}
                        style={{
                          position: 'absolute',
                          right: 12,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: 36,
                          height: 36,
                          borderRadius: '50%',
                          background: 'rgba(255,255,255,0.1)',
                          border: '0.5px solid rgba(255,255,255,0.2)',
                          color: '#ffffff',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          zIndex: 10,
                        }}
                      >
                        <ChevronRight size={18} />
                      </button>
                    </>
                  )}
                </div>

                {hasMultipleImages && (
                  <div style={{ display: 'flex', gap: 8, overflow: 'auto', paddingBottom: 4 }}>
                    {images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentImageIndex(i)}
                        style={{
                          width: 72,
                          height: 48,
                          borderRadius: 8,
                          overflow: 'hidden',
                          cursor: 'pointer',
                          opacity: i === currentImageIndex ? 1 : 0.5,
                          border: i === currentImageIndex ? '2px solid #00ff88' : '1px solid rgba(255,255,255,0.1)',
                          flexShrink: 0,
                        }}
                      >
                        <Image src={img.url} alt={`Thumbnail ${i + 1}`} width={72} height={48} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div
                style={{
                  aspectRatio: '16/9',
                  borderRadius: 12,
                  background: 'var(--grad-primary)',
                  opacity: 0.3,
                }}
              />
            )}
          </div>

          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              border: '0.5px solid rgba(255,255,255,0.2)',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1001,
            }}
          >
            <X size={20} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
