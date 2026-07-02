import type { ReactNode, CSSProperties } from 'react';

interface HudPanelProps {
  title?: string;
  accentRgb?: string;
  accentText?: string;
  children: ReactNode;
  style?: CSSProperties;
}

export default function HudPanel({
  title,
  accentRgb = '168,85,247',
  accentText = '#d8b4fe',
  children,
  style,
}: HudPanelProps) {
  return (
    <div
      style={{
        position: 'relative',
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid rgba(${accentRgb},0.22)`,
        borderRadius: 18,
        boxShadow: `0 0 26px rgba(${accentRgb},0.07)`,
        padding: 32,
        ...style,
      }}
    >
      {title && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
          <span style={{ width: 6, height: 6, background: accentText, borderRadius: '50%' }} />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: accentText,
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
