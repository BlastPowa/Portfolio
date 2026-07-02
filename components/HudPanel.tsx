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
        background: 'rgba(18,10,28,0.55)',
        border: '1px solid rgba(168,85,247,0.38)',
        boxShadow: '0 0 0 1px rgba(168,85,247,0.06), 0 0 30px rgba(139,47,190,0.16), inset 0 0 44px rgba(168,85,247,0.05)',
        clipPath: `polygon(${NOTCH}px 0, 100% 0, 100% calc(100% - ${NOTCH}px), calc(100% - ${NOTCH}px) 100%, 0 100%, 0 ${NOTCH}px)`,
        padding: 32,
        ...style,
      }}
    >
      <span style={{ position: 'absolute', top: 10, right: 10, width: 14, height: 14, borderTop: '2px solid rgba(192,132,252,0.65)', borderRight: '2px solid rgba(192,132,252,0.65)' }} />
      <span style={{ position: 'absolute', bottom: 10, left: 10, width: 14, height: 14, borderBottom: '2px solid rgba(192,132,252,0.65)', borderLeft: '2px solid rgba(192,132,252,0.65)' }} />
      {title && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
          <span style={{ width: 6, height: 6, background: '#a855f7', boxShadow: '0 0 8px #a855f7', borderRadius: '50%' }} />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#d8b4fe',
              textShadow: '0 0 12px rgba(168,85,247,0.55)',
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
