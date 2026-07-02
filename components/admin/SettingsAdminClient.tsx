'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronUp, ChevronDown } from 'lucide-react';
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

const HOME_TEXT_KEYS: { key: string; label: string; multiline?: boolean; placeholder?: string }[] = [
  { key: 'home_hero_eyebrow', label: 'Hero eyebrow text', placeholder: "Paul Adelabu — TU Dublin '27" },
  { key: 'home_hero_heading', label: 'Hero heading', multiline: true, placeholder: 'Cinematic product portfolio for games, AI tools, and Roblox systems.' },
  { key: 'home_hero_subtext', label: 'Hero subtext', multiline: true, placeholder: 'Head developer on Roblox titles, creator of Drift, and maker of cinematic product experiences.' },
  { key: 'home_cta_heading', label: 'Call-to-action heading', placeholder: 'Let’s build the next product together.' },
  { key: 'home_cta_subtext', label: 'Call-to-action subtext', multiline: true, placeholder: 'Contact Paul directly and show work that feels cinematic.' },
];

const SECTION_LABELS: Record<string, string> = {
  featured: 'Featured projects',
  about: 'About',
  categories: 'Categories',
  techstack: 'Tech stack',
  cta: 'Call to action',
};

const DEFAULT_SECTION_ORDER = ['featured', 'about', 'categories', 'techstack', 'cta'];

export default function SettingsAdminClient({ initialSettings }: SettingsAdminClientProps) {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const { key } of [...KNOWN_KEYS, ...HOME_TEXT_KEYS]) {
      initial[key] = initialSettings[key] ?? '';
    }
    return initial;
  });
  const [sectionOrder, setSectionOrder] = useState<string[]>(() => {
    if (!initialSettings.home_section_order) return DEFAULT_SECTION_ORDER;
    try {
      const parsed = JSON.parse(initialSettings.home_section_order);
      if (Array.isArray(parsed) && parsed.every((k) => k in SECTION_LABELS)) {
        return [...parsed, ...DEFAULT_SECTION_ORDER.filter((k) => !parsed.includes(k))];
      }
    } catch {
      // fall through to default
    }
    return DEFAULT_SECTION_ORDER;
  });
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  function updateValue(key: string, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function moveSection(index: number, direction: -1 | 1) {
    setSectionOrder((order) => {
      const next = [...order];
      const target = index + direction;
      if (target < 0 || target >= next.length) return order;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  async function handleSave() {
    setSubmitting(true);
    try {
      const allKeys = [...KNOWN_KEYS, ...HOME_TEXT_KEYS].map(({ key }) => key);
      const results = await Promise.all([
        ...allKeys.map((key) =>
          fetch('/api/admin/settings', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key, value: values[key] ?? '' }),
          })
        ),
        fetch('/api/admin/settings', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key: 'home_section_order', value: JSON.stringify(sectionOrder) }),
        }),
      ]);

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

      <GlassCard style={{ padding: 28, display: 'grid', gap: 20 }}>
        <div>
          <GradientText style={{ fontSize: 20, fontWeight: 700 }}>Home page text</GradientText>
          <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)', fontSize: 14 }}>Leave blank to use the default copy shown below as placeholder.</p>
        </div>
        {HOME_TEXT_KEYS.map(({ key, label, multiline, placeholder }) =>
          multiline ? (
            <TextArea
              key={key}
              label={label}
              rows={3}
              value={values[key] ?? ''}
              onChange={(e) => updateValue(key, e.target.value)}
              placeholder={placeholder}
            />
          ) : (
            <TextField
              key={key}
              label={label}
              value={values[key] ?? ''}
              onChange={(e) => updateValue(key, e.target.value)}
              placeholder={placeholder}
            />
          )
        )}
      </GlassCard>

      <GlassCard style={{ padding: 28, display: 'grid', gap: 16 }}>
        <div>
          <GradientText style={{ fontSize: 20, fontWeight: 700 }}>Home page layout</GradientText>
          <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)', fontSize: 14 }}>Reorder the sections that appear below the hero banner.</p>
        </div>
        <div style={{ display: 'grid', gap: 10 }}>
          {sectionOrder.map((key, i) => (
            <div
              key={key}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 18px',
                borderRadius: 14,
                background: 'rgba(255,255,255,0.04)',
                border: '0.5px solid rgba(255,255,255,0.08)',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>{i + 1}</span>
                <span>{SECTION_LABELS[key] ?? key}</span>
              </span>
              <span style={{ display: 'flex', gap: 6 }}>
                <button
                  type="button"
                  onClick={() => moveSection(i, -1)}
                  disabled={i === 0}
                  aria-label={`Move ${SECTION_LABELS[key]} up`}
                  style={{ ...moveBtn, opacity: i === 0 ? 0.35 : 1, cursor: i === 0 ? 'default' : 'pointer' }}
                >
                  <ChevronUp size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => moveSection(i, 1)}
                  disabled={i === sectionOrder.length - 1}
                  aria-label={`Move ${SECTION_LABELS[key]} down`}
                  style={{ ...moveBtn, opacity: i === sectionOrder.length - 1 ? 0.35 : 1, cursor: i === sectionOrder.length - 1 ? 'default' : 'pointer' }}
                >
                  <ChevronDown size={16} />
                </button>
              </span>
            </div>
          ))}
        </div>
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

const moveBtn: React.CSSProperties = {
  width: 32,
  height: 32,
  borderRadius: 10,
  background: 'rgba(255,255,255,0.06)',
  border: 'none',
  color: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};
