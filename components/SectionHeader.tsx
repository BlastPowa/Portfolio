'use client';

import GradientText from './GradientText';
import ScrollReveal from './ScrollReveal';

interface SectionHeaderProps {
  label?: string;
  title: string;
  gradientWord?: string;
  subtitle?: string;
  gradient?: string;
  align?: 'left' | 'center';
}

export default function SectionHeader({
  label,
  title,
  gradientWord,
  subtitle,
  gradient = 'var(--grad-primary)',
  align = 'left',
}: SectionHeaderProps) {
  function renderTitle() {
    if (!gradientWord) return title;
    const idx = title.indexOf(gradientWord);
    if (idx === -1) return title;
    return (
      <>
        {title.slice(0, idx)}
        <GradientText gradient={gradient}>{gradientWord}</GradientText>
        {title.slice(idx + gradientWord.length)}
      </>
    );
  }

  return (
    <ScrollReveal>
      <div style={{ textAlign: align, marginBottom: 32 }}>
        {label && (
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              marginBottom: 12,
            }}
          >
            <GradientText gradient={gradient}>{label}</GradientText>
          </div>
        )}
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 48,
            fontWeight: 800,
            lineHeight: 1.1,
            margin: 0,
            color: 'var(--text-primary)',
          }}
        >
          {renderTitle()}
        </h2>
        {subtitle && (
          <p
            style={{
              marginTop: 16,
              fontSize: 16,
              color: 'var(--text-secondary)',
              maxWidth: 640,
              marginLeft: align === 'center' ? 'auto' : 0,
              marginRight: align === 'center' ? 'auto' : 0,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </ScrollReveal>
  );
}
