import type { ReactNode } from 'react';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  message?: string;
}

export default function EmptyState({ icon, title, message }: EmptyStateProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: 12,
        padding: '56px 32px',
        borderRadius: 20,
        background: 'rgba(255,255,255,0.02)',
        border: '1px dashed rgba(255,255,255,0.1)',
      }}
    >
      {icon && <div style={{ color: 'var(--text-muted)', marginBottom: 4 }}>{icon}</div>}
      <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 20, color: '#ffffff' }}>{title}</h3>
      {message && <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: 14, maxWidth: 380, lineHeight: 1.6 }}>{message}</p>}
    </div>
  );
}
