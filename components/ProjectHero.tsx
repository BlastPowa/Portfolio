'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import TechBadge from './TechBadge';
import { parseTechStack } from '@/lib/types';
import type { Project } from '@/lib/types';

interface ProjectHeroProps {
  projects: Project[];
  gradient: string;
  eyebrow: string;
}

export default function ProjectHero({ projects, gradient, eyebrow }: ProjectHeroProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (projects.length <= 1 || paused) return;
    const id = setInterval(() => setActive((i) => (i + 1) % projects.length), 7000);
    return () => clearInterval(id);
  }, [projects.length, paused]);

  if (projects.length === 0) return null;

  const current = projects[active];
  const image = current.images[0]?.url;
  const tech = parseTechStack(current.techStack).slice(0, 5);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ borderRadius: 24, overflow: 'hidden', border: '0.5px solid rgba(255,255,255,0.1)' }}
    >
      <div style={{ position: 'relative', minHeight: 440, display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <AnimatePresence mode="sync">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              style={{ position: 'absolute', inset: 0 }}
            >
              {image ? (
                <Image src={image} alt={current.title} fill priority sizes="(max-width: 1200px) 100vw, 1200px" quality={90} style={{ objectFit: 'cover' }} />
              ) : (
                <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 80% 25%, rgba(255,255,255,0.06), transparent 55%), ${gradient}`, opacity: 0.45 }} />
              )}
            </motion.div>
          </AnimatePresence>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,8,0.97) 10%, rgba(8,8,8,0.5) 55%, transparent)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(8,8,8,0.82), transparent 62%)' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 2, padding: '48px', maxWidth: 640 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 999, background: gradient, color: '#fff', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', fontFamily: 'var(--font-mono)', marginBottom: 18 }}>
            {eyebrow}
          </span>
          <AnimatePresence mode="wait">
            <motion.div key={current.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 46, lineHeight: 1.04 }}>{current.title}</h2>
              <p style={{ margin: '16px 0 0', fontSize: 15, color: 'var(--text-secondary)', maxWidth: 520, lineHeight: 1.7, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {current.description}
              </p>
            </motion.div>
          </AnimatePresence>
          {tech.length > 0 && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 20 }}>
              {tech.map((t) => (
                <TechBadge key={t} label={t} />
              ))}
            </div>
          )}
          <Link href={`/projects/${current.slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 26, padding: '12px 22px', borderRadius: 12, background: gradient, color: '#fff', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
            View project <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {projects.length > 1 && (
        <div style={{ display: 'flex', gap: 10, padding: 16, background: 'rgba(255,255,255,0.02)', borderTop: '0.5px solid rgba(255,255,255,0.08)', overflowX: 'auto' }}>
          {projects.map((p, i) => {
            const thumb = p.images[0]?.url;
            return (
              <button
                key={p.id}
                onClick={() => setActive(i)}
                aria-label={`Show ${p.title}`}
                style={{
                  position: 'relative',
                  flexShrink: 0,
                  width: 128,
                  height: 74,
                  borderRadius: 10,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  padding: 0,
                  border: i === active ? '2px solid #fff' : '1px solid rgba(255,255,255,0.14)',
                  opacity: i === active ? 1 : 0.5,
                  transition: 'opacity 0.2s',
                }}
              >
                {thumb ? (
                  <Image src={thumb} alt={p.title} fill sizes="128px" quality={90} style={{ objectFit: 'cover' }} />
                ) : (
                  <div style={{ position: 'absolute', inset: 0, background: gradient, opacity: 0.4 }} />
                )}
                <span style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '10px 8px 6px', fontSize: 11, fontWeight: 600, color: '#fff', textAlign: 'left', background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {p.title}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
