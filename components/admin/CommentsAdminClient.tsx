'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import GlassCard from '@/components/GlassCard';
import GradientText from '@/components/GradientText';
import SectionHeader from '@/components/SectionHeader';
import ConfirmDialog from './ConfirmDialog';
import Toast, { type ToastType } from './Toast';
import type { Comment } from '@/lib/types';

type CommentWithProject = Comment & { project: { title: string; slug: string } };

interface CommentsAdminClientProps {
  initialComments: CommentWithProject[];
}

export default function CommentsAdminClient({ initialComments }: CommentsAdminClientProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<CommentWithProject | null>(null);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  async function handleDelete() {
    if (!deleting) return;
    const target = deleting;
    setDeleting(null);
    try {
      const res = await fetch(`/api/admin/comments/${target.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete comment');
      setToast({ message: 'Comment deleted', type: 'success' });
      router.refresh();
    } catch (err) {
      setToast({ message: (err as Error).message, type: 'error' });
    }
  }

  return (
    <div style={{ display: 'grid', gap: 28 }}>
      <SectionHeader title="Comments" subtitle="Moderate visitor comments left on project pages." />
      <GlassCard style={{ padding: 28 }}>
        <GradientText style={{ fontSize: 24, fontWeight: 700 }}>Comment moderation</GradientText>
        <p style={{ margin: '10px 0 0', color: 'var(--text-secondary)' }}>
          Comments post instantly on project pages. Delete anything spammy or inappropriate here.
        </p>
      </GlassCard>

      {initialComments.length === 0 ? (
        <GlassCard style={{ padding: 40, textAlign: 'center' }}>
          <p style={{ margin: 0, color: 'var(--text-muted)' }}>No comments yet.</p>
        </GlassCard>
      ) : (
        <div style={{ display: 'grid', gap: 16 }}>
          {initialComments.map((comment) => (
            <motion.div key={comment.id} whileHover={{ y: -3 }} style={{ padding: 22, borderRadius: 18, background: 'var(--bg-card)', border: '0.5px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
                <div style={{ display: 'grid', gap: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 700, fontFamily: 'var(--font-display)', fontSize: 16 }}>{comment.name}</span>
                    <span style={metaBadge}>{comment.project.title}</span>
                    <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {new Date(comment.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 640 }}>{comment.message}</p>
                </div>
                <button type="button" onClick={() => setDeleting(comment)} style={deleteChip}>
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!deleting}
        message={`Delete this comment from "${deleting?.name}"? This can't be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
      />
      <Toast message={toast?.message ?? null} type={toast?.type} onDone={() => setToast(null)} />
    </div>
  );
}

const metaBadge: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '4px 10px',
  borderRadius: 999,
  background: 'rgba(255,255,255,0.06)',
  color: 'var(--text-secondary)',
  fontSize: 11,
};

const deleteChip: React.CSSProperties = {
  padding: '10px 16px',
  borderRadius: 12,
  background: 'rgba(255,68,68,0.18)',
  color: '#ff7c7c',
  cursor: 'pointer',
  fontSize: 13,
  fontFamily: 'var(--font-body)',
  border: 'none',
  flexShrink: 0,
};
