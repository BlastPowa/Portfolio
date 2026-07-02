'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState, type ReactNode } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import GradientText from './GradientText';

interface HorizontalCarouselProps {
  title: string;
  subtitle?: string;
  gradient: string;
  viewAllHref: string;
  children: ReactNode;
}

export default function HorizontalCarousel({
  title,
  subtitle,
  gradient,
  viewAllHref,
  children,
}: HorizontalCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    containScroll: 'trimSnaps',
    dragFree: true,
  });

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', update);
    emblaApi.on('reInit', update);
    update();
  }, [emblaApi, update]);

  return (
    <section style={{ padding: '64px 0', position: 'relative' }}>
      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '0 32px',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: 32,
          gap: 24,
        }}
      >
        <div style={{ borderLeft: `3px solid transparent`, paddingLeft: 16, position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: 3,
              background: gradient,
              borderRadius: 2,
            }}
          />
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 24,
              margin: 0,
            }}
          >
            {title}
          </h2>
          {subtitle && (
            <p style={{ margin: 0, marginTop: 4, fontSize: 14, color: 'var(--text-secondary)' }}>{subtitle}</p>
          )}
        </div>

        <Link href={viewAllHref} style={{ textDecoration: 'none', fontFamily: 'var(--font-body)', fontSize: 14 }}>
          <GradientText gradient={gradient}>View all →</GradientText>
        </Link>
      </div>

      <div style={{ position: 'relative' }}>
        <button
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canPrev}
          aria-label="Previous"
          className="carousel-arrow carousel-arrow-btn"
          style={{ ...arrowBtn, left: 16, opacity: canPrev ? 1 : 0.3 }}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canNext}
          aria-label="Next"
          className="carousel-arrow carousel-arrow-btn"
          style={{ ...arrowBtn, right: 16, opacity: canNext ? 1 : 0.3 }}
        >
          <ChevronRight size={20} />
        </button>

        <div ref={emblaRef} style={{ overflow: 'hidden', padding: '0 32px' }}>
          <div style={{ display: 'flex', gap: 16 }}>{children}</div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          :global(.carousel-arrow) { display: none !important; }
        }
      `}</style>
    </section>
  );
}

const arrowBtn: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  width: 40,
  height: 40,
  borderRadius: '50%',
  background: 'rgba(255,255,255,0.06)',
  backdropFilter: 'blur(12px)',
  border: '0.5px solid rgba(255,255,255,0.12)',
  color: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  zIndex: 10,
};
