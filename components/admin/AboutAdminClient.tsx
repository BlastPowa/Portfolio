'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, X } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import GradientText from '@/components/GradientText';
import SectionHeader from '@/components/SectionHeader';
import { TextField, TextArea, SelectField } from './fields';
import TagInput from './TagInput';
import ImageUpload from './ImageUpload';
import Toast, { type ToastType } from './Toast';
import type { TimelineEntry, SkillGroup, Certification, CvProject } from '@/lib/about-content';

interface AboutAdminClientProps {
  avatarUrl: string;
  timeline: TimelineEntry[];
  skillGroups: SkillGroup[];
  certifications: Certification[];
  cvProjects: CvProject[];
}

async function saveSetting(key: string, value: string) {
  const res = await fetch('/api/admin/settings', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key, value }),
  });
  if (!res.ok) throw new Error(`Failed to save ${key}`);
}

export default function AboutAdminClient({
  avatarUrl: initialAvatarUrl,
  timeline: initialTimeline,
  skillGroups: initialSkillGroups,
  certifications: initialCertifications,
  cvProjects: initialCvProjects,
}: AboutAdminClientProps) {
  const router = useRouter();
  const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl);
  const [timeline, setTimeline] = useState<TimelineEntry[]>(initialTimeline);
  const [skillGroups, setSkillGroups] = useState<SkillGroup[]>(initialSkillGroups);
  const [certifications, setCertifications] = useState<Certification[]>(initialCertifications);
  const [cvProjects, setCvProjects] = useState<CvProject[]>(initialCvProjects);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  async function handleSaveAll() {
    setSubmitting(true);
    try {
      await Promise.all([
        saveSetting('about_avatar_url', avatarUrl),
        saveSetting('about_timeline', JSON.stringify(timeline)),
        saveSetting('about_skills', JSON.stringify(skillGroups)),
        saveSetting('about_certifications', JSON.stringify(certifications)),
        saveSetting('about_projects_list', JSON.stringify(cvProjects)),
      ]);
      setToast({ message: 'About page saved', type: 'success' });
      router.refresh();
    } catch (err) {
      setToast({ message: (err as Error).message, type: 'error' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ display: 'grid', gap: 28 }}>
      <SectionHeader title="About page" subtitle="Avatar, timeline, skills, certifications, and project highlights." />

      <GlassCard style={{ padding: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div>
          <GradientText style={{ fontSize: 24, fontWeight: 700 }}>Edit About content</GradientText>
          <p style={{ margin: '10px 0 0', color: 'var(--text-secondary)' }}>Everything here appears on the home page and the About page.</p>
        </div>
        <button type="button" onClick={() => void handleSaveAll()} disabled={submitting} style={{ ...buttonStyle, opacity: submitting ? 0.6 : 1, cursor: submitting ? 'default' : 'pointer' }}>
          {submitting ? 'Saving…' : 'Save all'}
        </button>
      </GlassCard>

      <GlassCard style={{ padding: 28, display: 'grid', gap: 16 }}>
        <GradientText style={{ fontSize: 20, fontWeight: 700 }}>Avatar</GradientText>
        {avatarUrl && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={avatarUrl} alt="Avatar preview" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '0.5px solid rgba(255,255,255,0.14)' }} />
            <button type="button" onClick={() => setAvatarUrl('')} style={removeChip}>
              Remove
            </button>
          </div>
        )}
        <ImageUpload multiple={false} onUpload={(url) => setAvatarUrl(url)} onError={(message) => setToast({ message, type: 'error' })} />
      </GlassCard>

      <GlassCard style={{ padding: 28, display: 'grid', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <GradientText style={{ fontSize: 20, fontWeight: 700 }}>Timeline</GradientText>
          <button type="button" onClick={() => setTimeline((t) => [...t, { year: '', title: '', detail: '' }])} style={addChip}>
            <Plus size={14} /> Add entry
          </button>
        </div>
        {timeline.map((entry, i) => (
          <div key={i} style={rowStyle}>
            <button type="button" onClick={() => setTimeline((t) => t.filter((_, idx) => idx !== i))} aria-label="Remove entry" style={removeIconStyle}>
              <X size={14} />
            </button>
            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 12 }}>
              <TextField label="Year" value={entry.year} onChange={(e) => setTimeline((t) => t.map((x, idx) => (idx === i ? { ...x, year: e.target.value } : x)))} />
              <TextField label="Title" value={entry.title} onChange={(e) => setTimeline((t) => t.map((x, idx) => (idx === i ? { ...x, title: e.target.value } : x)))} />
            </div>
            <TextArea label="Detail" rows={2} value={entry.detail} onChange={(e) => setTimeline((t) => t.map((x, idx) => (idx === i ? { ...x, detail: e.target.value } : x)))} />
          </div>
        ))}
      </GlassCard>

      <GlassCard style={{ padding: 28, display: 'grid', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <GradientText style={{ fontSize: 20, fontWeight: 700 }}>Skills</GradientText>
          <button type="button" onClick={() => setSkillGroups((g) => [...g, { category: '', items: [] }])} style={addChip}>
            <Plus size={14} /> Add category
          </button>
        </div>
        {skillGroups.map((group, i) => (
          <div key={i} style={rowStyle}>
            <button type="button" onClick={() => setSkillGroups((g) => g.filter((_, idx) => idx !== i))} aria-label="Remove category" style={removeIconStyle}>
              <X size={14} />
            </button>
            <TextField label="Category" value={group.category} onChange={(e) => setSkillGroups((g) => g.map((x, idx) => (idx === i ? { ...x, category: e.target.value } : x)))} />
            <label style={{ display: 'grid', gap: 6 }}>
              <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Skills</span>
              <TagInput tags={group.items} onChange={(items) => setSkillGroups((g) => g.map((x, idx) => (idx === i ? { ...x, items } : x)))} placeholder="Add a skill, press Enter" />
            </label>
          </div>
        ))}
      </GlassCard>

      <GlassCard style={{ padding: 28, display: 'grid', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <GradientText style={{ fontSize: 20, fontWeight: 700 }}>Certifications</GradientText>
          <button type="button" onClick={() => setCertifications((c) => [...c, { title: '', issuer: '', url: '', detail: '' }])} style={addChip}>
            <Plus size={14} /> Add certification
          </button>
        </div>
        {certifications.map((cert, i) => (
          <div key={i} style={rowStyle}>
            <button type="button" onClick={() => setCertifications((c) => c.filter((_, idx) => idx !== i))} aria-label="Remove certification" style={removeIconStyle}>
              <X size={14} />
            </button>
            <TextField label="Title" value={cert.title} onChange={(e) => setCertifications((c) => c.map((x, idx) => (idx === i ? { ...x, title: e.target.value } : x)))} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <TextField label="Issuer" value={cert.issuer} onChange={(e) => setCertifications((c) => c.map((x, idx) => (idx === i ? { ...x, issuer: e.target.value } : x)))} />
              <TextField label="Certificate URL" value={cert.url ?? ''} onChange={(e) => setCertifications((c) => c.map((x, idx) => (idx === i ? { ...x, url: e.target.value } : x)))} />
            </div>
            <TextField label="Note (optional)" value={cert.detail ?? ''} onChange={(e) => setCertifications((c) => c.map((x, idx) => (idx === i ? { ...x, detail: e.target.value } : x)))} />
          </div>
        ))}
      </GlassCard>

      <GlassCard style={{ padding: 28, display: 'grid', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <GradientText style={{ fontSize: 20, fontWeight: 700 }}>Projects I've built</GradientText>
          <button type="button" onClick={() => setCvProjects((p) => [...p, { title: '', tag: 'College Module', year: '', detail: '', githubUrl: '' }])} style={addChip}>
            <Plus size={14} /> Add project
          </button>
        </div>
        {cvProjects.map((project, i) => (
          <div key={i} style={rowStyle}>
            <button type="button" onClick={() => setCvProjects((p) => p.filter((_, idx) => idx !== i))} aria-label="Remove project" style={removeIconStyle}>
              <X size={14} />
            </button>
            <TextField label="Title" value={project.title} onChange={(e) => setCvProjects((p) => p.map((x, idx) => (idx === i ? { ...x, title: e.target.value } : x)))} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px', gap: 12 }}>
              <SelectField
                label="Tag"
                value={project.tag}
                onChange={(e) => setCvProjects((p) => p.map((x, idx) => (idx === i ? { ...x, tag: e.target.value } : x)))}
                options={[
                  { value: 'College Module', label: 'College Module' },
                  { value: 'Personal', label: 'Personal' },
                ]}
              />
              <TextField label="Year" value={project.year} onChange={(e) => setCvProjects((p) => p.map((x, idx) => (idx === i ? { ...x, year: e.target.value } : x)))} />
            </div>
            <TextArea label="Detail" rows={2} value={project.detail} onChange={(e) => setCvProjects((p) => p.map((x, idx) => (idx === i ? { ...x, detail: e.target.value } : x)))} />
            <TextField label="GitHub URL (optional)" value={project.githubUrl ?? ''} onChange={(e) => setCvProjects((p) => p.map((x, idx) => (idx === i ? { ...x, githubUrl: e.target.value } : x)))} />
          </div>
        ))}
      </GlassCard>

      <Toast message={toast?.message ?? null} type={toast?.type} onDone={() => setToast(null)} />
    </div>
  );
}

const buttonStyle: React.CSSProperties = {
  padding: '14px 22px',
  borderRadius: 16,
  background: 'var(--grad-primary)',
  color: '#000',
  fontFamily: 'var(--font-body)',
  fontWeight: 700,
  border: 'none',
};

const addChip: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  padding: '8px 14px',
  borderRadius: 999,
  background: 'rgba(255,255,255,0.08)',
  color: '#ffffff',
  fontSize: 13,
  fontWeight: 600,
  border: 'none',
  cursor: 'pointer',
};

const removeChip: React.CSSProperties = {
  padding: '8px 14px',
  borderRadius: 999,
  background: 'rgba(255,68,68,0.14)',
  color: '#ff7c7c',
  fontSize: 13,
  fontWeight: 600,
  border: 'none',
  cursor: 'pointer',
};

const removeIconStyle: React.CSSProperties = {
  position: 'absolute',
  top: 14,
  right: 14,
  width: 26,
  height: 26,
  borderRadius: '50%',
  background: 'rgba(255,68,68,0.14)',
  color: '#ff7c7c',
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
};

const rowStyle: React.CSSProperties = {
  position: 'relative',
  display: 'grid',
  gap: 12,
  padding: 20,
  borderRadius: 14,
  background: 'rgba(255,255,255,0.03)',
  border: '0.5px solid rgba(255,255,255,0.08)',
};
