'use client';

import type { ReactNode, CSSProperties } from 'react';

interface GradientBorderProps {
  children: ReactNode;
  gradient?: string;
  borderRadius?: number;
  className?: string;
  style?: CSSProperties;
}

export default function GradientBorder({
  children,
  gradient = 'var(--grad-primary)',
  borderRadius = 16,
  className,
  style,
}: GradientBorderProps) {
  return (
    <div
      className={`gradient-border ${className ?? ''}`}
      style={{
        position: 'relative',
        borderRadius,
        ...style,
      }}
    >
      <span
        aria-hidden
        style={{
          position: 'absolute',
          inset: -1,
          borderRadius,
          background: gradient,
          opacity: 0.7,
          zIndex: -1,
          animation: 'gradient-rotate 3s linear infinite',
        }}
      />
      <div style={{ position: 'relative', borderRadius, overflow: 'hidden' }}>{children}</div>

      <style jsx>{`
        @keyframes gradient-rotate {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
