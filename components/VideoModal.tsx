'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface VideoModalProps {
  youtubeId: string | null;
  title: string;
  onClose: () => void;
}

export default function VideoModal({ youtubeId, title, onClose }: VideoModalProps) {
  useEffect(() => {
    if (!youtubeId) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [youtubeId, onClose]);

  return (
    <AnimatePresence>
      {youtubeId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 300,
            background: 'rgba(0,0,0,0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}
        >
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
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
            }}
          >
            <X size={22} />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '90vw',
              maxWidth: 1280,
              aspectRatio: '16/9',
              borderRadius: 12,
              overflow: 'hidden',
              background: '#000000',
              border: '0.5px solid rgba(255,255,255,0.1)',
            }}
          >
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
              title={title}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
