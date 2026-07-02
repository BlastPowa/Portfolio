'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import GradientText from '@/components/GradientText';
import SectionHeader from '@/components/SectionHeader';
import ProjectCard from '@/components/ProjectCard';
import HorizontalCarousel from '@/components/HorizontalCarousel';
import InfiniteMarquee from '@/components/InfiniteMarquee';
import type { Project, RobloxGame } from '@/lib/types';
import { gradientForCategory } from '@/lib/types';

const techItems = [
  { name: 'Next.js' },
  { name: 'TypeScript' },
  { name: 'Framer Motion' },
  { name: 'Tailwind CSS' },
  { name: 'PostgreSQL' },
  { name: 'Supabase' },
  { name: 'Prisma' },
  { name: 'Node.js' },
  { name: 'Phaser 3' },
  { name: 'Mapbox' },
  { name: 'AWS' },
  { name: 'DynamoDB' },
];

interface HomePageClientProps {
  featuredProjects: Project[];
  schoolProjects: Project[];
  personalProjects: Project[];
  robloxGames: RobloxGame[];
  statsProjects: string;
  statsTechnologies: string;
  statsRoblox: string;
  contactEmail: string;
}

export default function HomePageClient({
  featuredProjects,
  schoolProjects,
  personalProjects,
  robloxGames,
  statsProjects,
  statsTechnologies,
  statsRoblox,
  contactEmail,
}: HomePageClientProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (featuredProjects.length <= 1 || paused) return;
    const id = setInterval(() => setActiveIndex((i) => (i + 1) % featuredProjects.length), 7000);
    return () => clearInterval(id);
  }, [featuredProjects.length, paused]);

  const spotlight = featuredProjects[activeIndex] ?? null;
  const spotlightImage = spotlight?.images[0]?.url;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      <section
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 32px 80px', position: 'relative', overflow: 'hidden' }}
      >
        <AnimatePresence mode="sync">
          {spotlightImage && (
            <motion.div
              key={spotlight!.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9 }}
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${spotlightImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.32,
                filter: 'blur(6px) saturate(1.1)',
                transform: 'scale(1.08)',
              }}
            />
          )}
        </AnimatePresence>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,8,8,0.55), rgba(8,8,8,0.85) 60%, var(--bg-base))' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 20% 30%, rgba(0,212,255,0.18), transparent 22%), radial-gradient(circle at 80% 20%, rgba(123,47,190,0.16), transparent 20%), radial-gradient(circle at 50% 80%, rgba(255,45,85,0.12), transparent 24%)' }} />
        <div className="home-hero-grid" style={{ position: 'relative', width: '100%', maxWidth: 1200, display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 40, alignItems: 'center' }}>
          <div style={{ zIndex: 1 }}>
            <p style={{ margin: 0, color: 'var(--text-secondary)', letterSpacing: '0.24em', textTransform: 'uppercase', fontSize: 12 }}>Paul Adelabu — TU Dublin ’26</p>
            <h1 style={{ margin: '22px 0 18px', fontSize: 64, lineHeight: 1.02, maxWidth: 700, fontFamily: 'var(--font-display)' }}>
              Cinematic product portfolio for games, AI tools, and Roblox systems.
            </h1>
            <p style={{ margin: 0, maxWidth: 620, color: 'var(--text-secondary)', fontSize: 18, lineHeight: 1.8 }}>
              Head developer on Roblox titles, creator of Drift and Reverie, and maker of cinematic product experiences.
            </p>
            <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', marginTop: 32 }}>
              <a href="/projects/school" className="cta-btn" style={ctaButton}>School projects</a>
              <a href="/projects/personal" className="cta-btn" style={ctaButtonSecondary}>Personal work</a>
            </div>
          </div>

          <div style={{ position: 'relative', minHeight: 420, borderRadius: 32, overflow: 'hidden', border: '0.5px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(22px)' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(255,255,255,0.08), transparent 35%)' }} />
            <div style={{ position: 'absolute', top: 24, left: 24, right: 24, padding: 24, borderRadius: 24, background: 'rgba(8,8,8,0.85)', border: '0.5px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Now viewing</div>
                  <AnimatePresence mode="wait">
                    <motion.h2
                      key={spotlight?.id ?? 'none'}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ margin: '10px 0 0', fontFamily: 'var(--font-display)', fontSize: 24 }}
                    >
                      {spotlight?.title ?? 'No featured projects yet'}
                    </motion.h2>
                  </AnimatePresence>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>Live dev loop</div>
              </div>
            </div>
            <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20, padding: 24, borderRadius: 24, background: 'rgba(8,8,8,0.75)', border: '0.5px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'grid', gap: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 16, height: 16, borderRadius: '50%', background: spotlight ? gradientForCategory(spotlight.category) : 'var(--grad-primary)' }} />
                  <div style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', fontSize: 12, color: 'var(--text-muted)' }}>Featured title</div>
                </div>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={spotlight?.id ?? 'none'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                  >
                    {spotlight?.description ?? 'Add a featured project through the admin dashboard to spotlight it here.'}
                  </motion.p>
                </AnimatePresence>
                {spotlight && (
                  <Link href={`/projects/${spotlight.slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#ffffff', textDecoration: 'none', width: 'fit-content' }}>
                    View more <ArrowRight size={14} />
                  </Link>
                )}
                {featuredProjects.length > 1 && (
                  <div style={{ display: 'flex', gap: 6, marginTop: 2 }}>
                    {featuredProjects.map((p, i) => (
                      <button
                        key={p.id}
                        onClick={() => setActiveIndex(i)}
                        aria-label={`Show ${p.title}`}
                        style={{
                          width: i === activeIndex ? 20 : 6,
                          height: 6,
                          borderRadius: 3,
                          border: 'none',
                          padding: 0,
                          cursor: 'pointer',
                          background: i === activeIndex ? '#ffffff' : 'rgba(255,255,255,0.25)',
                          transition: 'width 0.2s, background 0.2s',
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <main style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px', display: 'grid', gap: 64 }}>
        <section>
          <SectionHeader title="Featured projects" subtitle="Work that defines the portfolio." />
          {featuredProjects.length === 0 ? (
            <GlassCard style={{ padding: 40, textAlign: 'center' }}>
              <p style={{ margin: 0, color: 'var(--text-muted)' }}>No featured projects yet. Add some through the admin dashboard.</p>
            </GlassCard>
          ) : (
            <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
              {featuredProjects.map((project) => (
                <Link key={project.id} href={`/projects/${project.slug}`} style={{ textDecoration: 'none' }}>
                  <ProjectCard project={project} />
                </Link>
              ))}
            </div>
          )}
        </section>

        <section>
          <SectionHeader title="About" subtitle="Product-level portfolio with dark cinematic polish." />
          <div className="home-about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'center' }}>
            <GlassCard style={{ padding: 28, display: 'grid', gap: 16 }}>
              <div style={{ display: 'grid', gap: 18 }}>
                <div style={{ width: 120, height: 120, borderRadius: 999, border: '0.5px solid rgba(255,255,255,0.12)', overflow: 'hidden', background: '#111111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Avatar</span>
                </div>
                <div>
                  <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 28 }}>Paul Adelabu</h2>
                  <p style={{ margin: '10px 0 0', color: 'var(--text-secondary)', lineHeight: 1.8 }}>Computing student at TU Dublin, graduating 2027. Head developer on Roblox titles and creator of AI-first tools.</p>
                </div>
              </div>
            </GlassCard>
            <div style={{ display: 'grid', gap: 16 }}>
              <div style={statCard}>
                <span style={statNumber}>{statsProjects}</span>
                <span style={statLabel}>Projects</span>
              </div>
              <div style={statCard}>
                <span style={statNumber}>{statsTechnologies}</span>
                <span style={statLabel}>Technologies</span>
              </div>
              <div style={statCard}>
                <span style={statNumber}>{statsRoblox}</span>
                <span style={statLabel}>Roblox games</span>
              </div>
            </div>
          </div>
        </section>

        <section>
          <SectionHeader title="Categories" subtitle="School, personal, Roblox." />
          <div style={{ display: 'grid', gap: 24 }}>
            <HorizontalCarousel title="School projects" subtitle="TU Dublin work" gradient="var(--grad-school)" viewAllHref="/projects/school">
              {schoolProjects.map((project) => (
                <Link key={project.id} href={`/projects/${project.slug}`} style={{ width: 360, textDecoration: 'none', flexShrink: 0 }}>
                  <ProjectCard project={project} />
                </Link>
              ))}
            </HorizontalCarousel>

            <HorizontalCarousel title="Personal projects" subtitle="Drift, Reverie, and more" gradient="var(--grad-personal)" viewAllHref="/projects/personal">
              {personalProjects.map((project) => (
                <Link key={project.id} href={`/projects/${project.slug}`} style={{ width: 360, textDecoration: 'none', flexShrink: 0 }}>
                  <ProjectCard project={project} />
                </Link>
              ))}
            </HorizontalCarousel>

            <HorizontalCarousel title="Roblox" subtitle="Games and scripts" gradient="var(--grad-roblox)" viewAllHref="/roblox">
              {robloxGames.map((game) => (
                <div key={game.id} style={{ width: 360 }}>
                  <GlassCard style={{ padding: 20, minHeight: 260, display: 'grid', gap: 16 }}>
                    <span style={{ fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>{game.status}</span>
                    <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 20 }}>{game.title}</h3>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{game.description}</p>
                    {game.playerCount && <span style={badge}>Players {game.playerCount}</span>}
                  </GlassCard>
                </div>
              ))}
            </HorizontalCarousel>
          </div>
        </section>

        <section>
          <SectionHeader title="Tech stack" subtitle="Tools and systems used across the portfolio." />
          <div style={{ display: 'grid', gap: 14 }}>
            <InfiniteMarquee items={techItems} speed={28} />
            <InfiniteMarquee items={techItems} speed={32} reverse />
          </div>
        </section>

        <section>
          <GlassCard style={{ padding: 40, background: 'linear-gradient(135deg, rgba(0,212,255,0.18), rgba(123,47,190,0.16))', border: '0.5px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'grid', gap: 18, textAlign: 'center' }}>
              <GradientText style={{ fontSize: 32, fontWeight: 800 }}>Let’s build the next product together.</GradientText>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8 }}>Contact Paul directly and show work that feels cinematic.</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 18, flexWrap: 'wrap' }}>
                <a href={`mailto:${contactEmail}`} className="cta-btn" style={ctaButton}>Email Paul</a>
              </div>
            </div>
          </GlassCard>
        </section>
      </main>

    </div>
  );
}

const ctaButton: React.CSSProperties = {
  padding: '16px 28px',
  borderRadius: 999,
  background: 'var(--grad-primary)',
  color: '#000',
  textDecoration: 'none',
  fontWeight: 700,
};

const ctaButtonSecondary: React.CSSProperties = {
  padding: '16px 28px',
  borderRadius: 999,
  background: 'rgba(255,255,255,0.08)',
  color: '#ffffff',
  textDecoration: 'none',
  fontWeight: 700,
};

const statCard: React.CSSProperties = {
  padding: '28px',
  borderRadius: 24,
  background: 'rgba(255,255,255,0.04)',
  border: '0.5px solid rgba(255,255,255,0.08)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'var(--font-display)',
  fontSize: 40,
  color: '#ffffff',
};

const badge: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '8px 14px',
  borderRadius: 999,
  background: 'rgba(255,255,255,0.08)',
  color: '#ffffff',
  fontSize: 12,
  fontWeight: 600,
};
