'use client';

import { useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Code2, ExternalLink, Send } from 'lucide-react';
import TechBadge from '../TechBadge';
import Markdown from '../Markdown';
import HorizontalCarousel from '../HorizontalCarousel';
import ProjectCard from '../ProjectCard';
import HudPanel from '../HudPanel';
import ImageLightbox from '../ImageLightbox';
import { gradientForCategory, parseTechStack } from '@/lib/types';
import type { Project, Comment } from '@/lib/types';

interface Props {
  project: Project;
  related: Project[];
  comments: Comment[];
}

export default function ProjectDetailPageClient({ project, related, comments }: Props) {
  const images = project.images;
  const tech = parseTechStack(project.techStack);
  const gradient = gradientForCategory(project.category);
  const backHref = project.category === 'school' ? '/projects/school' : project.category === 'personal' ? '/projects/personal' : '/roblox';

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const [commentList, setCommentList] = useState<Comment[]>(comments);
  const [commentName, setCommentName] = useState('');
  const [commentMessage, setCommentMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [commentSubmitting, setCommentSubmitting] = useState(false);
  const [commentError, setCommentError] = useState<string | null>(null);

  useEffect(() => {
    if (images.length <= 1 || paused) return;
    const id = setInterval(() => setActive((i) => (i + 1) % images.length), 6000);
    return () => clearInterval(id);
  }, [images.length, paused]);

  const activeImage = images[active];

  async function handleCommentSubmit(e: FormEvent) {
    e.preventDefault();
    if (!commentName.trim() || !commentMessage.trim()) return;
    setCommentSubmitting(true);
    setCommentError(null);
    try {
      const res = await fetch(`/api/projects/${project.slug}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: commentName, message: commentMessage, website: honeypot }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? 'Failed to post comment');
      }
      const created = (await res.json()) as Comment;
      setCommentList((list) => [created, ...list]);
      setCommentName('');
      setCommentMessage('');
    } catch (err) {
      setCommentError((err as Error).message);
    } finally {
      setCommentSubmitting(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      <section
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{ position: 'relative', minHeight: '78vh', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}
      >
        <div style={{ position: 'absolute', inset: 0 }}>
          <AnimatePresence mode="sync">
            {activeImage ? (
              <motion.div
                key={activeImage.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9 }}
                style={{ position: 'absolute', inset: 0 }}
              >
                <Image src={activeImage.url} alt={activeImage.alt || project.title} fill priority style={{ objectFit: 'cover' }} />
              </motion.div>
            ) : (
              <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 78% 22%, rgba(255,255,255,0.06), transparent 55%), ${gradient}`, opacity: 0.5 }} />
            )}
          </AnimatePresence>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,8,0.98) 12%, rgba(8,8,8,0.55) 55%, rgba(8,8,8,0.35))' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(8,8,8,0.85), transparent 60%)' }} />
        </div>

        <div style={{ position: 'relative', width: '100%', maxWidth: 1200, margin: '0 auto', padding: '140px 32px 40px', zIndex: 2 }}>
          <Link href={backHref} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 14, marginBottom: 28 }}>
            <ArrowLeft size={16} /> Back to {project.category === 'roblox' ? 'Roblox' : project.category} projects
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, flexWrap: 'wrap' }}>
            <span style={{ padding: '5px 12px', borderRadius: 999, background: gradient, color: '#fff', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-mono)' }}>
              {project.category}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)' }}>{project.year}</span>
            {project.semester && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)' }}>{project.semester}</span>}
          </div>

          <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 60, lineHeight: 1.02, maxWidth: 800 }}>{project.title}</h1>

          <p style={{ margin: '20px 0 0', fontSize: 17, color: 'var(--text-secondary)', maxWidth: 640, lineHeight: 1.7 }}>{project.description}</p>

          {tech.length > 0 && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 24 }}>
              {tech.map((t) => (
                <TechBadge key={t} label={t} />
              ))}
            </div>
          )}

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 28 }}>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" style={{ ...ctaBtn, background: gradient, color: '#fff' }}>
                <ExternalLink size={16} /> Live site
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" style={{ ...ctaBtn, background: 'rgba(255,255,255,0.08)', border: '0.5px solid rgba(255,255,255,0.16)', color: '#fff' }}>
                <Code2 size={16} /> View source
              </a>
            )}
          </div>

          {images.length > 1 && (
            <div style={{ display: 'flex', gap: 10, marginTop: 32, overflowX: 'auto', paddingBottom: 4 }}>
              {images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setActive(i)}
                  aria-label={`Show image ${i + 1}`}
                  style={{
                    position: 'relative',
                    flexShrink: 0,
                    width: 104,
                    height: 62,
                    borderRadius: 8,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    padding: 0,
                    border: i === active ? '2px solid #fff' : '1px solid rgba(255,255,255,0.14)',
                    opacity: i === active ? 1 : 0.55,
                    transition: 'opacity 0.2s',
                  }}
                >
                  <Image src={img.url} alt={img.alt || project.title} fill sizes="104px" style={{ objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 32px 96px', display: 'grid', gap: 56 }}>
        {project.story && (
          <HudPanel title="// LOG: Why I built this">
            <p style={{ margin: 0, maxWidth: 820, fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)' }}>{project.story}</p>
          </HudPanel>
        )}

        {images.length > 0 && (
          <HudPanel title="// Gallery">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14 }}>
              {images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`View image ${i + 1} full size`}
                  style={{ position: 'relative', aspectRatio: '16/10', borderRadius: 8, overflow: 'hidden', cursor: 'pointer', padding: 0, border: '1px solid rgba(56,189,248,0.2)' }}
                >
                  <Image src={img.url} alt={img.alt || project.title} fill sizes="220px" style={{ objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          </HudPanel>
        )}

        {project.demoYoutubeId && (
          <HudPanel title="// How it works">
            <div style={{ position: 'relative', aspectRatio: '16/9', borderRadius: 8, overflow: 'hidden', background: '#000' }}>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${project.demoYoutubeId}`}
                title={`${project.title} demo`}
                allow="encrypted-media; picture-in-picture"
                allowFullScreen
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
              />
            </div>
          </HudPanel>
        )}

        {project.readme ? (
          <HudPanel title="// README">
            <div style={{ maxWidth: 820 }}>
              <Markdown>{project.readme}</Markdown>
            </div>
          </HudPanel>
        ) : project.longDescription ? (
          <HudPanel title="// Overview">
            <p style={{ margin: 0, maxWidth: 820, fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)' }}>{project.longDescription}</p>
          </HudPanel>
        ) : null}

        <HudPanel title={`// Comments (${commentList.length})`}>
          <form onSubmit={handleCommentSubmit} style={{ display: 'grid', gap: 12, marginBottom: 28, maxWidth: 560 }}>
            <input
              value={commentName}
              onChange={(e) => setCommentName(e.target.value)}
              placeholder="Your name"
              maxLength={60}
              required
              style={hudInputStyle}
            />
            <textarea
              value={commentMessage}
              onChange={(e) => setCommentMessage(e.target.value)}
              placeholder="Leave a thought or review…"
              maxLength={1000}
              rows={3}
              required
              style={{ ...hudInputStyle, resize: 'vertical', fontFamily: 'var(--font-body)' }}
            />
            <input
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              name="website"
              autoComplete="off"
              tabIndex={-1}
              aria-hidden="true"
              style={{ position: 'absolute', left: -9999, width: 1, height: 1, opacity: 0 }}
            />
            {commentError && <p style={{ margin: 0, color: '#ff7c7c', fontSize: 13 }}>{commentError}</p>}
            <button
              type="submit"
              disabled={commentSubmitting}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                width: 'fit-content',
                padding: '10px 20px',
                borderRadius: 8,
                background: 'rgba(56,189,248,0.15)',
                border: '1px solid rgba(56,189,248,0.5)',
                color: '#7dd3fc',
                fontSize: 14,
                fontWeight: 600,
                cursor: commentSubmitting ? 'default' : 'pointer',
                opacity: commentSubmitting ? 0.6 : 1,
              }}
            >
              <Send size={14} /> {commentSubmitting ? 'Posting…' : 'Post comment'}
            </button>
          </form>

          {commentList.length === 0 ? (
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: 14 }}>No comments yet — be the first to share your thoughts.</p>
          ) : (
            <div style={{ display: 'grid', gap: 16 }}>
              {commentList.map((c) => (
                <div key={c.id} style={{ paddingBottom: 16, borderBottom: '1px solid rgba(56,189,248,0.12)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{c.name}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
                      {new Date(c.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>{c.message}</p>
                </div>
              ))}
            </div>
          )}
        </HudPanel>

        {related.length > 0 && (
          <section>
            <HorizontalCarousel title="More like this" subtitle={`Other ${project.category} projects`} gradient={gradient} viewAllHref={backHref}>
              {related.map((r) => (
                <Link key={r.id} href={`/projects/${r.slug}`} style={{ width: 260, flexShrink: 0, textDecoration: 'none' }}>
                  <ProjectCard project={r} />
                </Link>
              ))}
            </HorizontalCarousel>
          </section>
        )}
      </div>

      <ImageLightbox
        images={images.map((img) => ({ url: img.url, alt: img.alt || project.title }))}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
}

const ctaBtn: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  padding: '12px 20px',
  borderRadius: 12,
  fontSize: 14,
  fontWeight: 600,
  textDecoration: 'none',
  cursor: 'pointer',
};

const hudInputStyle: React.CSSProperties = {
  padding: '10px 14px',
  borderRadius: 8,
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(56,189,248,0.25)',
  color: '#ffffff',
  fontSize: 14,
  outline: 'none',
};
