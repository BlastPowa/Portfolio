'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Music2, X } from 'lucide-react';

const PLAYLIST_ID = '3MGBZBB8o0mxH5hhotYpTn';

export default function SpotifyWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 200 }}>
      <AnimatePresence mode="wait">
        {open ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.9, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              width: 420,
              maxWidth: 'calc(100vw - 48px)',
              borderRadius: 20,
              background: 'rgba(20,20,24,0.65)',
              backdropFilter: 'blur(24px) saturate(1.4)',
              WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
              border: '0.5px solid rgba(255,255,255,0.14)',
              boxShadow: '0 20px 48px rgba(0,0,0,0.45)',
              overflow: 'hidden',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px 8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                <Music2 size={14} /> Now playing
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Collapse player"
                style={{ width: 26, height: 26, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <X size={14} />
              </button>
            </div>

            <iframe
              title="Spotify playlist"
              src={`https://open.spotify.com/embed/playlist/${PLAYLIST_ID}?utm_source=generator&theme=0`}
              width="100%"
              height="380"
              style={{ border: 'none', display: 'block' }}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </motion.div>
        ) : (
          <motion.button
            key="collapsed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.06 }}
            onClick={() => setOpen(true)}
            aria-label="Open music player"
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'rgba(20,20,24,0.55)',
              backdropFilter: 'blur(20px) saturate(1.4)',
              WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
              border: '0.5px solid rgba(255,255,255,0.16)',
              boxShadow: '0 12px 32px rgba(0,0,0,0.4)',
              color: '#1DB954',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <Music2 size={22} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
