'use client';

import GlassCard from '@/components/GlassCard';
import type { RobloxGame, RobloxScript } from '@/lib/types';

interface RobloxGridProps {
  games: RobloxGame[];
  scripts: RobloxScript[];
}

export default function RobloxGrid({ games, scripts }: RobloxGridProps) {
  return (
    <div style={{ display: 'grid', gap: 32 }}>
      <div style={{ display: 'grid', gap: 18, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        {games.map((game) => (
          <GlassCard key={game.id} style={{ padding: 24, display: 'grid', gap: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 22 }}>{game.title}</h2>
              <span style={{ padding: '6px 12px', borderRadius: 999, background: 'rgba(255,255,255,0.08)', color: 'var(--text-secondary)', fontSize: 12 }}>{game.status}</span>
            </div>
            <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{game.description}</p>
            <span style={{ padding: '8px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.08)', color: '#ffffff', fontSize: 12 }}>{game.playerCount}</span>
          </GlassCard>
        ))}
      </div>
      <div style={{ display: 'grid', gap: 18, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        {scripts.map((script) => (
          <GlassCard key={script.id} style={{ padding: 24, display: 'grid', gap: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 22 }}>{script.title}</h2>
              <span style={{ padding: '6px 12px', borderRadius: 999, background: 'rgba(255,255,255,0.08)', color: 'var(--text-secondary)', fontSize: 12 }}>{script.language}</span>
            </div>
            <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{script.description}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
