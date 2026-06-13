'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { X, ExternalLink, Code2 } from 'lucide-react';
import type { Project } from '@/lib/types';
import { gradientForCategory, parseTechStack } from '@/lib/types';
import TechBadge from './TechBadge';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [selectedIdx, setSelectedIdx] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIdx(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!project) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              zIndex: 200,
            }}
          />

          <motion.div
            initial={{ y: '100vh' }}
            animate={{ y: 0 }}
            exit={{ y: '100vh' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'fixed',
              left: 0,
              right: 0,
              bottom: 0,
              height: '90vh',
              background: '#111111',
              borderTop: '0.5px solid rgba(255,255,255,0.1)',
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              overflowY: 'auto',
              zIndex: 201,
              padding: 32,
            }}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)',
                border: '0.5px solid rgba(255,255,255,0.12)',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 5,
              }}
            >
              <X size={20} />
            </button>

            <div className="project-modal-grid">
              <div>
                {project.images.length > 0 ? (
                  <>
                    <div ref={emblaRef} style={{ overflow: 'hidden', borderRadius: 16 }}>
                      <div style={{ display: 'flex' }}>
                        {project.images.map((img) => (
                          <div
                            key={img.id}
                            style={{
                              flex: '0 0 100%',
                              minWidth: 0,
                              position: 'relative',
                              aspectRatio: '4/3',
                            }}
                          >
                            <Image src={img.url} alt={img.alt} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 800px" />
                          </div>
                        ))}
                      </div>
                    </div>
                    {project.images.length > 1 && (
                      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 16 }}>
                        {project.images.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => emblaApi?.scrollTo(i)}
                            aria-label={`Image ${i + 1}`}
                            style={{
                              width: i === selectedIdx ? 24 : 8,
                              height: 8,
                              borderRadius: 4,
                              background: i === selectedIdx ? '#ffffff' : 'rgba(255,255,255,0.3)',
                              border: 'none',
                              cursor: 'pointer',
                              transition: 'all 0.2s',
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '4/3',
                      borderRadius: 16,
                      background: gradientForCategory(project.category),
                      opacity: 0.5,
                    }}
                  />
                )}
              </div>

              <div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 16 }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      padding: '4px 10px',
                      borderRadius: 12,
                      background: gradientForCategory(project.category),
                      color: '#ffffff',
                      fontWeight: 600,
                    }}
                  >
                    {project.category}
                  </span>
                  <TechBadge label={String(project.year)} />
                  {project.semester && <TechBadge label={project.semester} />}
                </div>

                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 36,
                    fontWeight: 800,
                    margin: 0,
                    marginBottom: 16,
                  }}
                >
                  {project.title}
                </h2>

                <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 16 }}>
                  {project.description}
                </p>

                {project.longDescription && (
                  <div style={{ marginBottom: 24 }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, marginBottom: 8 }}>
                      What I learned
                    </h3>
                    <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                      {project.longDescription}
                    </p>
                  </div>
                )}

                <div style={{ marginBottom: 24 }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, marginBottom: 12 }}>Tech stack</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {parseTechStack(project.techStack).map((t) => (
                      <TechBadge key={t} label={t} />
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" style={pillBtn}>
                      <Code2 size={14} /> GitHub
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" style={pillBtn}>
                      <ExternalLink size={14} /> Live site
                    </a>
                  )}
                </div>
              </div>
            </div>

            <style jsx>{`
              .project-modal-grid {
                display: grid;
                grid-template-columns: 55% 45%;
                gap: 32px;
                margin-top: 24px;
              }
              @media (max-width: 768px) {
                .project-modal-grid { grid-template-columns: 1fr; }
              }
            `}</style>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

const pillBtn: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  padding: '10px 18px',
  borderRadius: 999,
  border: '0.5px solid rgba(255,255,255,0.16)',
  background: 'rgba(255,255,255,0.04)',
  color: '#ffffff',
  fontFamily: 'var(--font-body)',
  fontSize: 14,
  textDecoration: 'none',
};
