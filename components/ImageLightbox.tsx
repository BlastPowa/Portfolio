'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxImage {
  url: string;
  alt: string;
}

interface ImageLightboxProps {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function ImageLightbox({ images, index, onClose, onNavigate }: ImageLightboxProps) {
  const open = index !== null && images[index] !== undefined;

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate((index! - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') onNavigate((index! + 1) % images.length);
    }
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, index, images.length, onClose, onNavigate]);

  const current = open ? images[index!] : null;

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{ position: 'fixed', inset: 0, zIndex: 400, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
        >
          <button onClick={onClose} aria-label="Close" style={closeBtnStyle}>
            <X size={22} />
          </button>

          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate((index! - 1 + images.length) % images.length);
              }}
              aria-label="Previous image"
              style={{ ...navBtnStyle, left: 24 }}
            >
              <ChevronLeft size={22} />
            </button>
          )}

          <div onClick={(e) => e.stopPropagation()} style={{ position: 'relative', width: '90vw', height: '80vh', maxWidth: 1400 }}>
            <Image src={current.url} alt={current.alt} fill sizes="90vw" quality={100} style={{ objectFit: 'contain' }} />
          </div>

          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate((index! + 1) % images.length);
              }}
              aria-label="Next image"
              style={{ ...navBtnStyle, right: 24 }}
            >
              <ChevronRight size={22} />
            </button>
          )}

          {images.length > 1 && (
            <div style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
              {index! + 1} / {images.length}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const closeBtnStyle: React.CSSProperties = {
  position: 'absolute',
  top: 24,
  right: 24,
  width: 44,
  height: 44,
  borderRadius: '50%',
  background: 'rgba(255,255,255,0.08)',
  border: '0.5px solid rgba(255,255,255,0.16)',
  color: '#ffffff',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 2,
};

const navBtnStyle: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  width: 48,
  height: 48,
  borderRadius: '50%',
  background: 'rgba(255,255,255,0.08)',
  border: '0.5px solid rgba(255,255,255,0.16)',
  color: '#ffffff',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 2,
};
