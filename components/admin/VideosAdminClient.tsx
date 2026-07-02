'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import GlassCard from '@/components/GlassCard';
import GradientText from '@/components/GradientText';
import SectionHeader from '@/components/SectionHeader';
import FormModal from './FormModal';
import { TextField, TextArea, CheckboxField } from './fields';
import ConfirmDialog from './ConfirmDialog';
import Toast, { type ToastType } from './Toast';
import type { Video } from '@/lib/types';

interface VideosAdminClientProps {
  initialVideos: Video[];
}

interface FormState {
  title: string;
  youtubeId: string;
  thumbnailUrl: string;
  description: string;
  playlist: string;
  featured: boolean;
  orderIndex: string;
}

function emptyForm(): FormState {
  return { title: '', youtubeId: '', thumbnailUrl: '', description: '', playlist: '', featured: false, orderIndex: '0' };
}

function toFormState(video: Video): FormState {
  return {
    title: video.title,
    youtubeId: video.youtubeId,
    thumbnailUrl: video.thumbnailUrl ?? '',
    description: video.description ?? '',
    playlist: video.playlist ?? '',
    featured: video.featured,
    orderIndex: String(video.orderIndex),
  };
}

export default function VideosAdminClient({ initialVideos }: VideosAdminClientProps) {
  const router = useRouter();
  const [editing, setEditing] = useState<Video | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm());
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState<Video | null>(null);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function openCreate() {
    setEditing(null);
    setForm(emptyForm());
    setShowForm(true);
  }

  function openEdit(video: Video) {
    setEditing(video);
    setForm(toFormState(video));
    setShowForm(true);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        title: form.title,
        youtubeId: form.youtubeId,
        thumbnailUrl: form.thumbnailUrl || `https://img.youtube.com/vi/${form.youtubeId}/hqdefault.jpg`,
        description: form.description || undefined,
        playlist: form.playlist || undefined,
        featured: form.featured,
        orderIndex: Number(form.orderIndex),
      };

      const res = await fetch(editing ? `/api/admin/videos/${editing.id}` : '/api/admin/videos', {
        method: editing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? 'Failed to save video');
      }

      setToast({ message: editing ? 'Video updated' : 'Video created', type: 'success' });
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
      const res = await fetch(`/api/admin/videos/${target.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete video');
      setToast({ message: 'Video deleted', type: 'success' });
      router.refresh();
    } catch (err) {
      setToast({ message: (err as Error).message, type: 'error' });
    }
  }

  return (
    <div style={{ display: 'grid', gap: 28 }}>
      <SectionHeader title="Videos" subtitle="Publish and reorder YouTube content." />
      <GlassCard style={{ padding: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div>
          <GradientText style={{ fontSize: 24, fontWeight: 700 }}>Video library</GradientText>
          <p style={{ margin: '10px 0 0', color: 'var(--text-secondary)' }}>The list updates the public YouTube feed automatically.</p>
        </div>
        <button type="button" onClick={openCreate} style={buttonStyle}>
          New video
        </button>
      </GlassCard>

      {initialVideos.length === 0 ? (
        <GlassCard style={{ padding: 40, textAlign: 'center' }}>
          <p style={{ margin: 0, color: 'var(--text-muted)' }}>No videos yet. Click &ldquo;New video&rdquo; to add your first one.</p>
        </GlassCard>
      ) : (
        <div style={{ display: 'grid', gap: 18 }}>
          {initialVideos.map((video) => (
            <motion.div key={video.id} whileHover={{ y: -3 }} style={{ padding: 24, borderRadius: 20, background: 'var(--bg-card)', border: '0.5px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                <div>
                  <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 22 }}>{video.title}</h2>
                  <div style={{ marginTop: 8, color: 'var(--text-secondary)', fontSize: 14 }}>{video.playlist || 'No playlist'}</div>
                </div>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <button type="button" onClick={() => openEdit(video)} style={actionChip}>
                    Edit
                  </button>
                  <button type="button" onClick={() => setDeleting(video)} style={{ ...actionChip, background: 'rgba(255,68,68,0.18)', color: '#ff7c7c' }}>
                    Delete
                  </button>
                </div>
              </div>
              <div style={{ marginTop: 16, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {video.featured && <span style={metaBadge}>Featured</span>}
                <span style={metaBadge}>{video.youtubeId}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <FormModal
        open={showForm}
        title={editing ? 'Edit video' : 'New video'}
        onClose={() => setShowForm(false)}
        onSubmit={handleSubmit}
        submitting={submitting}
      >
        <TextField label="Title" required value={form.title} onChange={(e) => updateField('title', e.target.value)} />
        <TextField label="YouTube video ID" required value={form.youtubeId} onChange={(e) => updateField('youtubeId', e.target.value)} placeholder="e.g. dQw4w9WgXcQ" />
        <TextField label="Thumbnail URL" value={form.thumbnailUrl} onChange={(e) => updateField('thumbnailUrl', e.target.value)} placeholder="Auto-generated from YouTube ID if blank" />
        <TextArea label="Description" rows={3} value={form.description} onChange={(e) => updateField('description', e.target.value)} />
        <TextField label="Playlist" value={form.playlist} onChange={(e) => updateField('playlist', e.target.value)} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <CheckboxField label="Featured" checked={form.featured} onChange={(e) => updateField('featured', e.target.checked)} />
          <div style={{ flex: 1 }}>
            <TextField label="Order index" type="number" value={form.orderIndex} onChange={(e) => updateField('orderIndex', e.target.value)} />
          </div>
        </div>
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

const buttonStyle: React.CSSProperties = {
  padding: '14px 22px',
  borderRadius: 16,
  background: 'var(--grad-youtube)',
  color: '#000',
  cursor: 'pointer',
  fontFamily: 'var(--font-body)',
  fontWeight: 700,
  border: 'none',
};

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

const metaBadge: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '6px 12px',
  borderRadius: 999,
  background: 'rgba(255,255,255,0.06)',
  color: 'var(--text-secondary)',
  fontSize: 12,
};
