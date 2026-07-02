import Navbar from '@/components/Navbar';
import SpotifyWidget from '@/components/SpotifyWidget';
import type { ReactNode } from 'react';

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      <Navbar />
      {children}
      <SpotifyWidget />
    </div>
  );
}
