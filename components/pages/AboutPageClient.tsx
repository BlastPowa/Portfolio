'use client';

import GradientText from '@/components/GradientText';
import SectionHeader from '@/components/SectionHeader';
import GlassCard from '@/components/GlassCard';
import { ExternalLink, Code2 } from 'lucide-react';

const timeline = [
  { year: '2026', title: 'Campus Quest', detail: 'Final-year project for indoor navigation and gamified campus wayfinding at TU Dublin.' },
  { year: '2026', title: 'Drift', detail: 'Released an AI tab tracker Chrome extension with re-entry briefs.' },
  { year: '2027', title: 'Graduation', detail: 'Completing TU Dublin BSc (Hons) Computing and launching the portfolio.' },
];

const skillGroups = [
  { category: 'Languages', items: ['Python', 'Java', 'JavaScript', 'PHP', 'C#', 'HTML / CSS', 'HLSL', 'ShaderLab', 'Lua'] },
  { category: 'Web & Backend', items: ['Django', 'Symfony', 'Node.js', 'REST APIs', 'Server-Side Development', 'GUI Programming'] },
  { category: 'Databases', items: ['MongoDB', 'Supabase', 'MySQL', 'SQLite'] },
  { category: 'Cloud & Deploy', items: ['AWS S3', 'Railway', 'PythonAnywhere', 'Vercel'] },
  { category: 'Game Dev', items: ['Unity (C#)', 'Roblox / Lua', 'HLSL / ShaderLab', 'Blender'] },
  { category: 'AI & LLMs', items: ['ChatGPT / OpenAI', 'Gemini', 'Copilot', 'Codex', 'Prompt Engineering'] },
  { category: 'Design & Media', items: ['Figma', 'Canva', 'Photoshop', 'PIXLR', 'Premiere Pro', 'DaVinci Resolve', 'CapCut', 'Filmora'] },
  { category: 'Networking', items: ['WAN', 'LAN Switching', 'Wireless', 'IP Troubleshooting'] },
  { category: 'Hardware & OS', items: ['Device Diagnostics', 'OS Management', 'Arduino / Embedded Systems'] },
];

const certifications = [
  { title: 'PHP & Symfony Web Development', issuer: 'SymfonyCasts', url: 'https://symfonycasts.com/certificates/844C932DEC49' },
  { title: 'Symfony API & Advanced Features', issuer: 'SymfonyCasts', url: 'https://symfonycasts.com/certificates/A3381F809C47' },
  { title: 'Symfony Security', issuer: 'SymfonyCasts', url: 'https://symfonycasts.com/certificates/D3ED4C19EC43' },
  { title: 'Game Tester — Where Winds Meet', issuer: 'Independent', detail: 'Played and evaluated an early build, logging bugs and gameplay feedback.' },
];

const cvProjects = [
  { title: 'Campus Navigation Web App (Campus Quest)', tag: 'College Module', year: '2026', detail: 'Indoor navigation and gamification app for TU Dublin Blanchardstown.' },
  { title: 'Drift', tag: 'Personal', year: '2026', detail: 'AI-powered browser tab tracker with re-entry briefs.' },
  { title: 'Recruiting Web App with Auto CV Fill', tag: 'College Module', year: '2026', detail: 'Recruiting platform for hospitality venues with automatic CV parsing.', githubUrl: 'https://github.com/BlastPowa/WebFrameworkProject' },
  { title: 'E-Commerce Shopping Site', tag: 'College Module', year: '2025', detail: 'Online shop with product listings, cart, checkout, and order tracking.' },
  { title: 'Pandemic Virus Simulator', tag: 'College Module', year: '2025', detail: 'Multi-threaded simulation of virus spread across a global population.' },
  { title: 'Huffman Coding Binary Tree', tag: 'College Module', year: '2025', detail: 'Reference-based binary tree assigning Huffman bit codes per character.' },
  { title: 'Fast Food Ordering Website', tag: 'College Module', year: '2025', detail: 'Dynamic food ordering site with live menu, cart, and CRUD order handling.' },
  { title: 'Arduino Maze-Navigating Robot', tag: 'Personal', year: '2023–2024', detail: 'Programmed a robot to navigate a physical maze using rear-mounted sensors.' },
];

interface AboutPageClientProps {
  contactEmail: string;
  githubUrl: string;
  youtubeUrl: string;
  instagramUrl: string;
}

export default function AboutPageClient({ contactEmail, githubUrl, youtubeUrl, instagramUrl }: AboutPageClientProps) {
  const socials = [
    { label: 'GitHub', href: githubUrl },
    { label: 'YouTube', href: youtubeUrl },
    { label: 'Instagram', href: instagramUrl },
  ].filter((s) => s.href);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', color: 'var(--text-primary)', padding: '120px 32px 80px' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gap: 52 }}>
        <header style={{ display: 'grid', gap: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 12, letterSpacing: '0.24em', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>About</span>
            <GradientText style={{ fontFamily: 'var(--font-display)', fontSize: 14 }}>Timeline and skills</GradientText>
          </div>
          <div>
            <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 48, lineHeight: 1.05 }}>Career timeline and the tools that power the build.</h1>
            <p style={{ margin: '18px 0 0', color: 'var(--text-secondary)', fontSize: 17, lineHeight: 1.8 }}>Direct story, product context, and contact information for real work.</p>
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
            {certifications.map((cert) => (
              <GlassCard key={cert.title} style={{ padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                <div>
                  <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 17 }}>{cert.title}</h3>
                  <p style={{ margin: '6px 0 0', color: 'var(--text-secondary)', fontSize: 13 }}>
                    {cert.issuer}
                    {cert.detail ? ` — ${cert.detail}` : ''}
                  </p>
                </div>
                {'url' in cert && cert.url && (
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
          <GlassCard style={{ padding: 8, display: 'grid' }}>
            {cvProjects.map((project, i) => (
              <div
                key={project.title}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 16,
                  flexWrap: 'wrap',
                  padding: '18px 20px',
                  borderBottom: i === cvProjects.length - 1 ? 'none' : '0.5px solid rgba(255,255,255,0.08)',
                }}
              >
                <div style={{ display: 'grid', gap: 6, minWidth: 240, flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 16 }}>{project.title}</h3>
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
                  <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.6 }}>{project.detail}</p>
                </div>
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="View source" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', textDecoration: 'none', flexShrink: 0 }}>
                    <Code2 size={16} />
                  </a>
                )}
              </div>
            ))}
          </GlassCard>
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
