'use client';

import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fine = window.matchMedia('(pointer: fine)').matches;
    setEnabled(fine);
    if (!fine) return;

    function onMove(e: MouseEvent) {
      setPos({ x: e.clientX, y: e.clientY });
    }

    function onOver(e: MouseEvent) {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const interactive = t.closest('a, button, [data-cursor="hover"], input, textarea, select');
      setHovering(Boolean(interactive));
    }

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, []);

  if (!mounted || !enabled) return null;

  const ringSize = hovering ? 48 : 32;

  return (
    <>
      <div
        style={{
          position: 'fixed',
          left: pos.x - 4,
          top: pos.y - 4,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#ffffff',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      />
      <div
        style={{
          position: 'fixed',
          left: pos.x - ringSize / 2,
          top: pos.y - ringSize / 2,
          width: ringSize,
          height: ringSize,
          borderRadius: '50%',
          background: 'transparent',
          border: hovering ? '1.5px solid rgba(99,102,241,0.8)' : '1.5px solid rgba(255,255,255,1)',
          boxShadow: hovering ? '0 0 12px rgba(123,47,190,0.4)' : 'none',
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'left 0.1s ease, top 0.1s ease, width 0.2s ease, height 0.2s ease, border-color 0.2s ease',
        }}
      />
    </>
  );
}
