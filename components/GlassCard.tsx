'use client';

import { motion } from 'framer-motion';
import { useRef, type ReactNode, type MouseEvent as ReactMouseEvent } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  gradient?: string;
  onClick?: () => void;
  tilt?: boolean;
  style?: React.CSSProperties;
}

export default function GlassCard({
  children,
  className,
  gradient,
  onClick,
  tilt = true,
  style,
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: ReactMouseEvent<HTMLDivElement>) {
    if (!tilt || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
    const mouseY = ((e.clientY - rect.top) / rect.height) * 100;
    const rotateX = Math.max(-8, Math.min(8, (mouseY - 50) * -0.08));
    const rotateY = Math.max(-8, Math.min(8, (mouseX - 50) * 0.08));
    ref.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  function handleMouseLeave() {
    if (!ref.current) return;
    ref.current.style.transform = 'none';
  }

  const hoverBorderColor = gradient ? 'rgba(99,102,241,0.4)' : 'var(--border-glow)';

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.01 }}
      className={className}
      style={{
        background: 'var(--bg-card)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '0.5px solid var(--border-subtle)',
        borderRadius: 16,
        overflow: 'hidden',
        transition: 'border-color 0.3s ease, transform 0.3s ease',
        position: 'relative',
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = hoverBorderColor;
      }}
    >
      {children}
    </motion.div>
  );
}
