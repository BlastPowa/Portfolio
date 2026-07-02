'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Music2, X } from 'lucide-react';

const PLAYLIST_ID = '3MGBZBB8o0mxH5hhotYpTn';

interface NowPlayingState {
  connected: boolean;
  isPlaying: boolean;
}

export default function SpotifyWidget() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<NowPlayingState>({ connected: false, isPlaying: false });
  const [checking, setChecking] = useState(false);
  const lastCheckedRef = useRef(0);

  async function checkNowPlaying() {
    if (Date.now() - lastCheckedRef.current < 60_000) return;
    lastCheckedRef.current = Date.now();
    setChecking(true);
    try {
      const res = await fetch('/api/spotify/now-playing');
      if (res.ok) {
        const data = (await res.json()) as NowPlayingState;
        setStatus(data);
      }
    } catch {
      // ignore — falls back to default embed
    } finally {
      setChecking(false);
    }
  }

  useEffect(() => {
    checkNowPlaying();
  }, []);

  function handleOpen() {
    setOpen(true);
    checkNowPlaying();
  }

  function handleConnect() {
    const returnTo = window.location.pathname;
    window.location.href = `/api/spotify/login?returnTo=${encodeURIComponent(returnTo)}`;
  }

  async function handleDisconnect() {
    await fetch('/api/spotify/logout', { method: 'POST' });
    setStatus({ connected: false, isPlaying: false });
    lastCheckedRef.current = 0;
  }

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
              width: 320,
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

            {status.connected && status.isPlaying ? (
              <div style={{ padding: '24px 18px 20px', textAlign: 'center' }}>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.6 }}>
                  Playing on your Spotify already — enjoy.
                </p>
                <button onClick={handleDisconnect} style={linkBtnStyle}>
                  Disconnect
                </button>
              </div>
            ) : (
              <>
                <iframe
                  title="Spotify playlist"
                  src={`https://open.spotify.com/embed/playlist/${PLAYLIST_ID}?utm_source=generator&theme=0`}
                  width="100%"
                  height="152"
                  style={{ border: 'none', display: 'block' }}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
                <div style={{ padding: '10px 14px 12px', textAlign: 'center' }}>
                  {status.connected ? (
                    <button onClick={handleDisconnect} style={linkBtnStyle}>
                      Disconnect Spotify
                    </button>
                  ) : (
                    <button onClick={handleConnect} disabled={checking} style={linkBtnStyle}>
                      Connect Spotify
                    </button>
                  )}
                </div>
              </>
            )}
          </motion.div>
        ) : (
          <motion.button
            key="collapsed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.06 }}
            onClick={handleOpen}
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

const linkBtnStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: 'var(--text-muted)',
  fontSize: 12,
  cursor: 'pointer',
  textDecoration: 'underline',
  padding: 0,
};
