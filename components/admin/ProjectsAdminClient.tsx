'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import GradientText from '@/components/GradientText';
import SectionHeader from '@/components/SectionHeader';
import FormModal from './FormModal';
import { TextField, TextArea, SelectField, CheckboxField } from './fields';
import TagInput from './TagInput';
import ImageUpload from './ImageUpload';
import ConfirmDialog from './ConfirmDialog';
import Toast, { type ToastType } from './Toast';
import { parseTechStack, parseYoutubeId } from '@/lib/types';
import type { Project } from '@/lib/types';

interface ProjectsAdminClientProps {
  initialProjects: Project[];
}

type ImageDraft = { url: string; alt: string };

interface FormState {
  title: string;
  slug: string;
  category: string;
  description: string;
  longDescription: string;
  readme: string;
  story: string;
  demoYoutubeId: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  year: string;
  semester: string;
  featured: boolean;
  orderIndex: string;
  images: ImageDraft[];
}

function emptyForm(): FormState {
  return {
    title: '',
    slug: '',
    category: 'school',
    description: '',
    longDescription: '',
    readme: '',
    story: '',
    demoYoutubeId: '',
    techStack: [],
    githubUrl: '',
    liveUrl: '',
    year: String(new Date().getFullYear()),
    semester: '',
    featured: false,
    orderIndex: '0',
    images: [],
  };
}

function toFormState(project: Project): FormState {
  return {
    title: project.title,
    slug: project.slug,
    category: project.category,
    description: project.description,
    longDescription: project.longDescription ?? '',
    readme: project.readme ?? '',
    story: project.story ?? '',
    demoYoutubeId: project.demoYoutubeId ?? '',
    techStack: parseTechStack(project.techStack),
    githubUrl: project.githubUrl ?? '',
    liveUrl: project.liveUrl ?? '',
    year: String(project.year),
    semester: project.semester ?? '',
    featured: project.featured,
    orderIndex: String(project.orderIndex),
    images: project.images.map((img) => ({ url: img.url, alt: img.alt })),
  };
}

function slugify(title: string): string {
  return title.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export default function ProjectsAdminClient({ initialProjects }: ProjectsAdminClientProps) {
  const router = useRouter();
  const [editing, setEditing] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm());
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState<Project | null>(null);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function openCreate() {
    setEditing(null);
    setForm(emptyForm());
    setShowForm(true);
  }

  function openEdit(project: Project) {
    setEditing(project);
    setForm(toFormState(project));
    setShowForm(true);
  }

  function addImage(url: string) {
    updateField('images', [...form.images, { url, alt: form.title }]);
  }

  function removeImage(index: number) {
    updateField('images', form.images.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        title: form.title,
        slug: form.slug || slugify(form.title),
        category: form.category,
        description: form.description,
        longDescription: form.longDescription || undefined,
        readme: form.readme || undefined,
        story: form.story || undefined,
        demoYoutubeId: parseYoutubeId(form.demoYoutubeId) || undefined,
        techStack: JSON.stringify(form.techStack),
        githubUrl: form.githubUrl || undefined,
        liveUrl: form.liveUrl || undefined,
        year: Number(form.year),
        semester: form.semester || undefined,
        featured: form.featured,
        orderIndex: Number(form.orderIndex),
        images: form.images,
      };

      const res = await fetch(editing ? `/api/admin/projects/${editing.id}` : '/api/admin/projects', {
        method: editing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? 'Failed to save project');
      }

      setToast({ message: editing ? 'Project updated' : 'Project created', type: 'success' });
      setShowForm(false);
      router.refresh();
    } catch (err) {
      setToast({ message: (err as Error).message, type: 'error' });
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!deleting) return;
    const target = deleting;
    setDeleting(null);
    try {
      const res = await fetch(`/api/admin/projects/${target.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete project');
      setToast({ message: 'Project deleted', type: 'success' });
      router.refresh();
    } catch (err) {
      setToast({ message: (err as Error).message, type: 'error' });
    }
  }

  return (
    <div style={{ display: 'grid', gap: 28 }}>
      <SectionHeader title="Projects" subtitle="School and personal projects in one place." />
      <GlassCard style={{ padding: 28, display: 'grid', gap: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <GradientText style={{ fontSize: 24, fontWeight: 700 }}>Project library</GradientText>
            <p style={{ margin: '10px 0 0', color: 'var(--text-secondary)' }}>
              Add, edit, and remove projects from the portfolio feed.
            </p>
          </div>
          <button type="button" onClick={openCreate} style={primaryChip}>
            New project
          </button>
        </div>
      </GlassCard>

      {initialProjects.length === 0 ? (
        <GlassCard style={{ padding: 40, textAlign: 'center' }}>
          <p style={{ margin: 0, color: 'var(--text-muted)' }}>No projects yet. Click &ldquo;New project&rdquo; to add your first one.</p>
        </GlassCard>
      ) : (
        <div style={{ display: 'grid', gap: 18 }}>
          {initialProjects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -3 }}
              style={{ display: 'grid', gap: 16, padding: 24, borderRadius: 20, background: 'var(--bg-card)', border: '0.5px solid var(--border-subtle)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>{project.category}</div>
                  <h2 style={{ margin: '8px 0 0', fontFamily: 'var(--font-display)', fontSize: 24 }}>{project.title}</h2>
                </div>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <button type="button" onClick={() => openEdit(project)} style={actionChip}>
                    Edit
                  </button>
                  <button type="button" onClick={() => setDeleting(project)} style={{ ...actionChip, background: 'rgba(255,68,68,0.18)', color: '#ff7c7c' }}>
                    Delete
                  </button>
                </div>
              </div>
              <p style={{ margin: 0, color: 'var(--text-secondary)' }}>{project.description}</p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <span style={metaBadge}>Year {project.year}</span>
                <span style={metaBadge}>{project.semester ?? 'Personal'}</span>
                {project.featured && <span style={metaBadge}>Featured</span>}
                <span style={metaBadge}>{project.images.length} image{project.images.length === 1 ? '' : 's'}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <FormModal
        open={showForm}
        title={editing ? 'Edit project' : 'New project'}
        onClose={() => setShowForm(false)}
        onSubmit={handleSubmit}
        submitting={submitting}
      >
        <TextField label="Title" required value={form.title} onChange={(e) => updateField('title', e.target.value)} />
        <TextField label="Slug" value={form.slug} onChange={(e) => updateField('slug', e.target.value)} placeholder={slugify(form.title) || 'auto-generated-from-title'} />
        <SelectField
          label="Category"
          required
          value={form.category}
          onChange={(e) => updateField('category', e.target.value)}
          options={[
            { value: 'school', label: 'School' },
            { value: 'personal', label: 'Personal' },
          ]}
        />
        <TextArea label="Description" required rows={2} value={form.description} onChange={(e) => updateField('description', e.target.value)} />
        <TextArea label="Long description" rows={4} value={form.longDescription} onChange={(e) => updateField('longDescription', e.target.value)} />

        <label style={{ display: 'grid', gap: 6 }}>
          <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Tech stack
          </span>
          <TagInput tags={form.techStack} onChange={(tags) => updateField('techStack', tags)} />
        </label>

        <TextField label="GitHub URL" value={form.githubUrl} onChange={(e) => updateField('githubUrl', e.target.value)} />
        <TextField label="Live URL" value={form.liveUrl} onChange={(e) => updateField('liveUrl', e.target.value)} />
        <TextField
          label="Demo video (YouTube URL or ID)"
          value={form.demoYoutubeId}
          onChange={(e) => updateField('demoYoutubeId', e.target.value)}
          placeholder="https://youtu.be/… or the 11-char ID"
        />
        <TextArea
          label="Project story"
          rows={3}
          value={form.story}
          onChange={(e) => updateField('story', e.target.value)}
          placeholder="Why you built it — shows as its own section on the project page"
        />
        <TextArea
          label="README (markdown)"
          rows={8}
          value={form.readme}
          onChange={(e) => updateField('readme', e.target.value)}
          placeholder="## How it works — supports markdown: headers, **bold**, `code`, lists, tables"
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <TextField label="Year" type="number" required value={form.year} onChange={(e) => updateField('year', e.target.value)} />
          <TextField label="Semester" value={form.semester} onChange={(e) => updateField('semester', e.target.value)} placeholder="e.g. Semester 2" />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <CheckboxField label="Featured" checked={form.featured} onChange={(e) => updateField('featured', e.target.checked)} />
          <div style={{ flex: 1 }}>
            <TextField label="Order index" type="number" value={form.orderIndex} onChange={(e) => updateField('orderIndex', e.target.value)} />
          </div>
        </div>

        <label style={{ display: 'grid', gap: 10 }}>
          <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Images
          </span>
          {form.images.length > 0 && (
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {form.images.map((img, i) => (
                <div key={img.url} style={{ position: 'relative', width: 90, height: 64 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.url} alt={img.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8, border: '0.5px solid rgba(255,255,255,0.12)' }} />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    aria-label="Remove image"
                    style={{
                      position: 'absolute',
                      top: -6,
                      right: -6,
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      background: '#ff4444',
                      border: 'none',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
          <ImageUpload onUpload={addImage} onError={(message) => setToast({ message, type: 'error' })} />
        </label>
      </FormModal>

      <ConfirmDialog
        open={!!deleting}
        message={`Delete "${deleting?.title}"? This can't be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
      />
      <Toast message={toast?.message ?? null} type={toast?.type} onDone={() => setToast(null)} />
    </div>
  );
}

const actionChip: React.CSSProperties = {
  padding: '12px 18px',
  borderRadius: 14,
  background: 'rgba(255,255,255,0.08)',
  color: '#ffffff',
  cursor: 'pointer',
  fontSize: 14,
  fontFamily: 'var(--font-body)',
  border: 'none',
};

const primaryChip: React.CSSProperties = {
  padding: '14px 22px',
  borderRadius: 16,
  background: 'var(--grad-primary)',
  color: '#000',
  cursor: 'pointer',
  fontWeight: 700,
  border: 'none',
  fontFamily: 'var(--font-body)',
};

const metaBadge: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '6px 12px',
  borderRadius: 999,
  background: 'rgba(255,255,255,0.06)',
  color: 'var(--text-secondary)',
  fontSize: 12,
};
