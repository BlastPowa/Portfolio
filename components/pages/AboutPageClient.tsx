'use client';

import GradientText from '@/components/GradientText';
import SectionHeader from '@/components/SectionHeader';
import GlassCard from '@/components/GlassCard';

const timeline = [
  { year: '2024', title: 'Campus Quest', detail: 'School project for indoor navigation and gamified campus wayfinding.' },
  { year: '2025', title: 'Drift', detail: 'Released an AI tab tracker Chrome extension with re-entry briefs.' },
  { year: '2026', title: 'Graduation', detail: 'Completing TU Dublin BSc Computing and launching the portfolio.' },
];

const skills = ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Supabase', 'Prisma', 'Claude API', 'Phaser 3', 'Lua', 'PostgreSQL'];

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
            {timeline.map((entry) => (
              <GlassCard key={entry.year} style={{ padding: 24, display: 'grid', gap: 12 }}>
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
          <SectionHeader title="Skills" subtitle="Core technologies and systems." />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {skills.map((skill) => (
              <div key={skill} style={{ padding: '12px 18px', borderRadius: 999, background: 'rgba(255,255,255,0.06)', color: '#ffffff', fontSize: 14, border: '0.5px solid rgba(255,255,255,0.12)' }}>{skill}</div>
            ))}
          </div>
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
