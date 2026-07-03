'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import type { Video } from '@/lib/types';

interface VideoCardProps {
  video: Video;
  onClick?: () => void;
}

export default function VideoCard({ video, onClick }: VideoCardProps) {
  const thumb = video.thumbnailUrl ?? `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      style={{
        position: 'relative',
        aspectRatio: '16/9',
        borderRadius: 12,
        overflow: 'hidden',
        cursor: onClick ? 'pointer' : 'default',
        background: '#111111',
        border: '0.5px solid var(--border-subtle)',
      }}
      className="video-card"
    >
      <Image src={thumb} alt={video.title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 400px" quality={90} />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 50%, rgba(8,8,8,0.95) 100%)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.12)',
          backdropFilter: 'blur(12px)',
          border: '0.5px solid rgba(255,255,255,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
        }}
        className="video-card-play"
      >
        <Play size={20} fill="#ffffff" style={{ marginLeft: 2 }} />
      </div>

      <div style={{ position: 'absolute', bottom: 12, left: 16, right: 16 }}>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 16,
            margin: 0,
            color: '#ffffff',
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {video.title}
        </h3>
        {video.playlist && (
          <span
            style={{
              display: 'inline-block',
              marginTop: 6,
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              padding: '3px 8px',
              borderRadius: 10,
              background: 'rgba(255,255,255,0.1)',
              color: 'var(--text-secondary)',
            }}
          >
            {video.playlist}
          </span>
        )}
      </div>

      <style jsx>{`
        .video-card:hover :global(.video-card-play) { background: rgba(255,255,255,0.25); }
      `}</style>
    </motion.div>
  );
}
