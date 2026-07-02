'use client';

import { useState } from 'react';
import type { Video } from '@/lib/types';
import VideoCard from '@/components/VideoCard';
import VideoModal from '@/components/VideoModal';

interface VideoGalleryProps {
  videos: Video[];
}

export default function VideoGallery({ videos }: VideoGalleryProps) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [activeTitle, setActiveTitle] = useState<string>('');

  function openVideo(video: Video) {
    setActiveVideo(video.youtubeId);
    setActiveTitle(video.title);
  }

  function closeVideo() {
    setActiveVideo(null);
    setActiveTitle('');
  }

  return (
    <>
      <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} onClick={() => openVideo(video)} />
        ))}
      </div>
      <VideoModal youtubeId={activeVideo} title={activeTitle} onClose={closeVideo} />
    </>
  );
}
