'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import GlassCard from '@/components/GlassCard';
import GradientText from '@/components/GradientText';
import SectionHeader from '@/components/SectionHeader';
import { ADMIN_BASE } from '@/lib/admin-path';

interface StatItem {
  label: string;
  value: string;
}

interface ActionItem {
  label: string;
  href: string;
}

interface DashboardClientProps {
  stats: StatItem[];
  actions: ActionItem[];
}

export default function DashboardClient({ stats, actions }: DashboardClientProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <section>
        <SectionHeader title="Admin dashboard" subtitle="Control content, update settings, and publish fast." />
        <div style={{ display: 'grid', gap: 20, gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
          {stats.map((item) => (
            <GlassCard key={item.label} style={{ padding: 24, minHeight: 140 }}>
              <div style={{ fontSize: 14, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 12 }}>
                {item.label}
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 42 }}>{item.value}</h2>
                <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>items</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader title="Quick access" subtitle="Jump straight to any admin section." />
        <div style={{ display: 'grid', gap: 20, gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          {actions.map((item) => (
            <Link key={item.label} href={item.href} style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ y: -4 }}
                style={{
                  padding: 28,
                  borderRadius: 20,
                  background: 'var(--bg-card)',
                  border: '0.5px solid var(--border-subtle)',
                  cursor: 'pointer',
                }}
              >
                <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 10 }}>{item.label}</div>
                <GradientText style={{ fontSize: 20, fontWeight: 700 }}>{item.href.replace(`${ADMIN_BASE}/`, '') || 'dashboard'}</GradientText>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <GlassCard style={{ padding: 28, display: 'grid', gap: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
            <div>
              <GradientText style={{ fontSize: 28, fontWeight: 800 }}>BlastPowa admin</GradientText>
              <p style={{ margin: '12px 0 0', color: 'var(--text-secondary)', maxWidth: 680, lineHeight: 1.8 }}>
                Manage projects, videos, Roblox content, and site settings. Changes here go live on the public site immediately.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <div style={{ padding: '18px 22px', borderRadius: 16, background: 'rgba(255,255,255,0.04)', color: '#ffffff' }}>Live content ready</div>
              <div style={{ padding: '18px 22px', borderRadius: 16, background: 'rgba(255,255,255,0.04)', color: '#ffffff' }}>Supabase upload ready</div>
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
