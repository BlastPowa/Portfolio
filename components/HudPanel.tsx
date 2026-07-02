import type { ReactNode, CSSProperties } from 'react';

interface HudPanelProps {
  title?: string;
  children: ReactNode;
  style?: CSSProperties;
}

const NOTCH = 18;

export default function HudPanel({ title, children, style }: HudPanelProps) {
  return (
    <div
      style={{
        position: 'relative',
        background: 'rgba(6,16,20,0.55)',
        border: '1px solid rgba(56,189,248,0.35)',
        boxShadow: '0 0 0 1px rgba(56,189,248,0.06), 0 0 28px rgba(56,189,248,0.12), inset 0 0 40px rgba(56,189,248,0.04)',
        clipPath: `polygon(${NOTCH}px 0, 100% 0, 100% calc(100% - ${NOTCH}px), calc(100% - ${NOTCH}px) 100%, 0 100%, 0 ${NOTCH}px)`,
        padding: 32,
        ...style,
      }}
    >
      <span style={{ position: 'absolute', top: 10, right: 10, width: 14, height: 14, borderTop: '2px solid rgba(56,189,248,0.6)', borderRight: '2px solid rgba(56,189,248,0.6)' }} />
      <span style={{ position: 'absolute', bottom: 10, left: 10, width: 14, height: 14, borderBottom: '2px solid rgba(56,189,248,0.6)', borderLeft: '2px solid rgba(56,189,248,0.6)' }} />
      {title && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
          <span style={{ width: 6, height: 6, background: '#38bdf8', boxShadow: '0 0 8px #38bdf8', borderRadius: '50%' }} />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#7dd3fc',
              textShadow: '0 0 12px rgba(56,189,248,0.5)',
            }}
          >
            {title}
          </span>
        </div>
      )}
      {children}
    </div>
  );
}
