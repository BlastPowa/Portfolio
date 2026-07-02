import { prisma } from '@/lib/prisma';
import VideosAdminClient from '@/components/admin/VideosAdminClient';
import type { Video } from '@/lib/types';

export const dynamic = 'force-dynamic';

async function getVideos(): Promise<Video[]> {
  const videos = await prisma.video.findMany({
    orderBy: [{ orderIndex: 'asc' }, { createdAt: 'desc' }],
  });

  return videos.map((video) => ({
    id: video.id,
    title: video.title,
    youtubeId: video.youtubeId,
    thumbnailUrl: video.thumbnailUrl,
    description: video.description,
    playlist: video.playlist,
    featured: video.featured,
    orderIndex: video.orderIndex,
    createdAt: video.createdAt.toISOString(),
  }));
}

export default async function AdminVideosPage() {
  const videos = await getVideos();
  return <VideosAdminClient initialVideos={videos} />;
}
