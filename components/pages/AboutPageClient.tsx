'use client';

import { useState } from 'react';
import Image from 'next/image';
import GradientText from '@/components/GradientText';
import SectionHeader from '@/components/SectionHeader';
import GlassCard from '@/components/GlassCard';
import { ExternalLink, Code2, ChevronDown, ChevronUp } from 'lucide-react';
import type { TimelineEntry, SkillGroup, Certification, CvProject } from '@/lib/about-content';

interface AboutPageClientProps {
  contactEmail: string;
  githubUrl: string;
  youtubeUrl: string;
  instagramUrl: string;
  avatarUrl: string;
  timeline: TimelineEntry[];
  skillGroups: SkillGroup[];
  certifications: Certification[];
  cvProjects: CvProject[];
}

const COLLAPSED_COUNT = 6;

export default function AboutPageClient({
  contactEmail,
  githubUrl,
  youtubeUrl,
  instagramUrl,
  avatarUrl,
  timeline,
  skillGroups,
  certifications,
  cvProjects,
}: AboutPageClientProps) {
  const [expanded, setExpanded] = useState(false);
  const socials = [
    { label: 'GitHub', href: githubUrl },
    { label: 'YouTube', href: youtubeUrl },
    { label: 'Instagram', href: instagramUrl },
  ].filter((s) => s.href);

  const visibleProjects = expanded ? cvProjects : cvProjects.slice(0, COLLAPSED_COUNT);
  const canExpand = cvProjects.length > COLLAPSED_COUNT;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', color: 'var(--text-primary)', padding: '120px 32px 80px' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gap: 52 }}>
        <header style={{ display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap' }}>
          {avatarUrl && (
            <div style={{ position: 'relative', width: 96, height: 96, borderRadius: 999, overflow: 'hidden', border: '0.5px solid rgba(255,255,255,0.14)', flexShrink: 0 }}>
              <Image src={avatarUrl} alt="Paul Adelabu" fill sizes="96px" style={{ objectFit: 'cover' }} />
            </div>
          )}
          <div style={{ display: 'grid', gap: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 12, letterSpacing: '0.24em', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>About</span>
              <GradientText style={{ fontFamily: 'var(--font-display)', fontSize: 14 }}>Timeline and skills</GradientText>
            </div>
            <div>
              <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 48, lineHeight: 1.05 }}>Career timeline and the tools that power the build.</h1>
              <p style={{ margin: '18px 0 0', color: 'var(--text-secondary)', fontSize: 17, lineHeight: 1.8 }}>Direct story, product context, and contact information for real work.</p>
            </div>
          </div>
        </header>

        <section style={{ display: 'grid', gap: 32 }}>
          <SectionHeader title="Timeline" subtitle="The path from school work to Roblox and AI products." />
          <div style={{ display: 'grid', gap: 18 }}>
            {timeline.map((entry, i) => (
              <GlassCard key={`${entry.title}-${i}`} style={{ padding: 24, display: 'grid', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.16em', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{entry.year}</span>
                  <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 22 }}>{entry.title}</h2>
                </div>
                <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{entry.detail}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        <section style={{ display: 'grid', gap: 24 }}>
          <SectionHeader title="Skills" subtitle="Core technologies and systems across the stack." />
          <div style={{ display: 'grid', gap: 22, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            {skillGroups.map((group) => (
              <GlassCard key={group.category} style={{ padding: 22, display: 'grid', gap: 14 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                  {group.category}
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {group.items.map((skill) => (
                    <span key={skill} style={{ padding: '8px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.06)', color: '#ffffff', fontSize: 13, border: '0.5px solid rgba(255,255,255,0.12)' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        <section style={{ display: 'grid', gap: 24 }}>
          <SectionHeader title="Certifications" subtitle="Coursework and hands-on credentials." />
          <div style={{ display: 'grid', gap: 14 }}>
            {certifications.map((cert, i) => (
              <GlassCard key={`${cert.title}-${i}`} style={{ padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                <div>
                  <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 17 }}>{cert.title}</h3>
                  <p style={{ margin: '6px 0 0', color: 'var(--text-secondary)', fontSize: 13 }}>
                    {cert.issuer}
                    {cert.detail ? ` — ${cert.detail}` : ''}
                  </p>
                </div>
                {cert.url && (
                  <a href={cert.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#38bdf8', textDecoration: 'none', flexShrink: 0 }}>
                    View certificate <ExternalLink size={14} />
                  </a>
                )}
              </GlassCard>
            ))}
          </div>
        </section>

        <section style={{ display: 'grid', gap: 24 }}>
          <SectionHeader title="Projects I've built" subtitle="College modules and personal work, all in one place." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
            {visibleProjects.map((project, i) => (
              <GlassCard key={`${project.title}-${i}`} style={{ padding: 20, display: 'grid', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <span
                      style={{
                        padding: '3px 10px',
                        borderRadius: 999,
                        fontSize: 10,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        fontFamily: 'var(--font-mono)',
                        background: project.tag === 'College Module' ? 'rgba(0,212,255,0.14)' : 'rgba(0,255,136,0.14)',
                        color: project.tag === 'College Module' ? '#38bdf8' : '#4ade80',
                      }}
                    >
                      {project.tag}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>{project.year}</span>
                  </div>
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="View source" style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--text-secondary)', textDecoration: 'none', flexShrink: 0 }}>
                      <Code2 size={16} />
                    </a>
                  )}
                </div>
                <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 16 }}>{project.title}</h3>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.6 }}>{project.detail}</p>
              </GlassCard>
            ))}
          </div>
          {canExpand && (
            <button
              type="button"
              onClick={() => setExpanded((e) => !e)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                justifySelf: 'center',
                padding: '10px 20px',
                borderRadius: 999,
                background: 'rgba(255,255,255,0.06)',
                border: '0.5px solid rgba(255,255,255,0.14)',
                color: '#ffffff',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {expanded ? 'Show less' : `Show all ${cvProjects.length} projects`}
              {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          )}
        </section>

        <section style={{ display: 'grid', gap: 24 }}>
          <SectionHeader title="Contact" subtitle="Reach out with a direct ask." />
          <GlassCard style={{ padding: 40, background: 'linear-gradient(135deg, rgba(0,212,255,0.18), rgba(123,47,190,0.16))', border: '0.5px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'grid', gap: 18, maxWidth: 760 }}>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 32 }}>Email for dev work, collabs, or studio updates.</h2>
              <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
                <a href={`mailto:${contactEmail}`} style={{ padding: '16px 24px', borderRadius: 16, background: 'rgba(255,255,255,0.08)', color: '#ffffff', textDecoration: 'none' }}>
                  {contactEmail}
                </a>
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ padding: '16px 24px', borderRadius: 16, background: 'rgba(255,255,255,0.08)', color: '#ffffff', textDecoration: 'none' }}
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </GlassCard>
        </section>
      </div>
    </div>
  );
}
