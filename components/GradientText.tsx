'use client';

import type { ReactNode, CSSProperties } from 'react';

interface GradientTextProps {
  children: ReactNode;
  gradient?: string;
  className?: string;
  style?: CSSProperties;
}

export default function GradientText({
  children,
  gradient = 'var(--grad-primary)',
  className,
  style,
}: GradientTextProps) {
  return (
    <span
      className={className}
      style={{
        background: gradient,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        display: 'inline-block',
        ...style,
      }}
    >
      {children}
    </span>
  );
}
