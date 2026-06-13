'use client';

interface InfiniteMarqueeProps {
  items: { name: string }[];
  speed?: number;
  reverse?: boolean;
}

export default function InfiniteMarquee({ items, speed = 30, reverse = false }: InfiniteMarqueeProps) {
  if (items.length === 0) return null;
  const doubled = [...items, ...items];

  return (
    <div style={{ overflow: 'hidden', width: '100%' }} className="marquee-wrapper">
      <div
        className="marquee-track"
        style={{
          display: 'flex',
          width: 'max-content',
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
              color: 'var(--text-muted)',
              padding: '0 24px',
              whiteSpace: 'nowrap',
            }}
          >
            <span>{item.name}</span>
            <span style={{ marginLeft: 24, opacity: 0.5 }}>·</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-wrapper:hover .marquee-track { animation-play-state: paused; }
      `}</style>
    </div>
  );
}
