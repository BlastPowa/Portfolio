'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import GlassCard from '@/components/GlassCard';
import GradientText from '@/components/GradientText';
import SectionHeader from '@/components/SectionHeader';
import { TextField, TextArea } from './fields';
import Toast, { type ToastType } from './Toast';
import type { Settings } from '@/lib/types';

interface SettingsAdminClientProps {
  initialSettings: Settings;
}

const KNOWN_KEYS: { key: string; label: string; multiline?: boolean }[] = [
  { key: 'bio', label: 'Bio', multiline: true },
  { key: 'contact_email', label: 'Contact email' },
  { key: 'github_url', label: 'GitHub URL' },
  { key: 'youtube_url', label: 'YouTube URL' },
  { key: 'instagram_url', label: 'Instagram URL' },
];

export default function SettingsAdminClient({ initialSettings }: SettingsAdminClientProps) {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const { key } of KNOWN_KEYS) {
      initial[key] = initialSettings[key] ?? '';
    }
    return initial;
  });
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  function updateValue(key: string, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function handleSave() {
    setSubmitting(true);
    try {
      const results = await Promise.all(
        KNOWN_KEYS.map(({ key }) =>
          fetch('/api/admin/settings', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key, value: values[key] ?? '' }),
          })
        )
      );

      if (results.some((res) => !res.ok)) {
        throw new Error('Some settings failed to save');
      }

      setToast({ message: 'Settings saved', type: 'success' });
      router.refresh();
    } catch (err) {
      setToast({ message: (err as Error).message, type: 'error' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ display: 'grid', gap: 28 }}>
      <SectionHeader title="Settings" subtitle="Site settings and global content." />
      <GlassCard style={{ padding: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div>
          <GradientText style={{ fontSize: 24, fontWeight: 700 }}>Global settings</GradientText>
          <p style={{ margin: '10px 0 0', color: 'var(--text-secondary)' }}>Update text, contact links, and content that appears across the site.</p>
        </div>
        <button
          type="button"
          onClick={() => void handleSave()}
          disabled={submitting}
          style={{ ...buttonStyle, opacity: submitting ? 0.6 : 1, cursor: submitting ? 'default' : 'pointer' }}
        >
          {submitting ? 'Saving…' : 'Save settings'}
        </button>
      </GlassCard>

      <GlassCard style={{ padding: 28, display: 'grid', gap: 20 }}>
        {KNOWN_KEYS.map(({ key, label, multiline }) =>
          multiline ? (
            <TextArea
              key={key}
              label={label}
              rows={4}
              value={values[key] ?? ''}
              onChange={(e) => updateValue(key, e.target.value)}
            />
          ) : (
            <TextField
              key={key}
              label={label}
              value={values[key] ?? ''}
              onChange={(e) => updateValue(key, e.target.value)}
            />
          )
        )}
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
