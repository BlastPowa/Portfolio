'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink, Code2 } from 'lucide-react';
import type { Project } from '@/lib/types';
import { gradientForCategory, parseTechStack } from '@/lib/types';
import TechBadge from './TechBadge';

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const techs = parseTechStack(project.techStack);
  const visibleTechs = techs.slice(0, 3);
  const extraTechs = techs.length - visibleTechs.length;
  const firstImage = project.images[0]?.url;
  const gradient = gradientForCategory(project.category);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      style={{
        position: 'relative',
        aspectRatio: '3/4',
        borderRadius: 16,
        overflow: 'hidden',
        background: '#111111',
        border: '0.5px solid var(--border-subtle)',
        cursor: onClick ? 'pointer' : 'default',
      }}
      className="project-card"
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transition: 'transform 0.4s ease',
        }}
        className="project-card-image"
      >
        {firstImage ? (
          <Image
            src={firstImage}
            alt={project.images[0]?.alt ?? project.title}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            quality={90}
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', background: gradient, opacity: 0.4 }} />
        )}
      </div>

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '60%',
          background: 'linear-gradient(to bottom, transparent, rgba(8,8,8,0.95))',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 8 }}>
        {project.githubUrl && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              window.open(project.githubUrl!, '_blank', 'noopener,noreferrer');
            }}
            aria-label="GitHub"
            style={iconBtn}
          >
            <Code2 size={14} />
          </button>
        )}
        {project.liveUrl && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              window.open(project.liveUrl!, '_blank', 'noopener,noreferrer');
            }}
            aria-label="Live site"
            style={iconBtn}
          >
            <ExternalLink size={14} />
          </button>
        )}
      </div>

      <div style={{ position: 'absolute', left: 20, right: 20, bottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              padding: '4px 10px',
              borderRadius: 12,
              background: gradient,
              color: '#ffffff',
              fontWeight: 600,
            }}
          >
            {project.category}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
            {project.year}
          </span>
        </div>

        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 18,
            margin: 0,
            marginBottom: 8,
            color: '#ffffff',
          }}
        >
          {project.title}
        </h3>

        <p
          style={{
            fontSize: 13,
            color: 'var(--text-secondary)',
            margin: 0,
            marginBottom: 12,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {project.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {visibleTechs.map((t) => (
            <TechBadge key={t} label={t} />
          ))}
          {extraTechs > 0 && <TechBadge label={`+${extraTechs} more`} />}
        </div>
      </div>

      <style jsx>{`
        .project-card:hover .project-card-image { transform: scale(1.05); }
      `}</style>
    </motion.div>
  );
}

const iconBtn: React.CSSProperties = {
  width: 32,
  height: 32,
  borderRadius: '50%',
  background: 'rgba(8,8,8,0.7)',
  backdropFilter: 'blur(8px)',
  border: '0.5px solid rgba(255,255,255,0.12)',
  color: '#ffffff',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  cursor: 'pointer',
  padding: 0,
  zIndex: 2,
};
