import GradientText from '@/components/GradientText';
import SectionHeader from '@/components/SectionHeader';
import VideoGallery from '@/components/VideoGallery';
import { prisma } from '@/lib/prisma';
import type { Video as VideoType } from '@/lib/types';

export const dynamic = 'force-dynamic';

async function getVideos() {
  const videos = await prisma.video.findMany({
    orderBy: [{ featured: 'desc' }, { orderIndex: 'asc' }],
  });

  return videos.map((video) => ({
    ...video,
    createdAt: video.createdAt.toISOString(),
  }));
}

export default async function YoutubePage() {
  const videos = await getVideos();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', color: 'var(--text-primary)', padding: '120px 32px 80px' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gap: 52 }}>
        <header style={{ display: 'grid', gap: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 12, letterSpacing: '0.24em', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>YouTube</span>
            <GradientText style={{ fontFamily: 'var(--font-display)', fontSize: 14 }}>Channel showcase</GradientText>
          </div>
          <div>
            <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 48, lineHeight: 1.05 }}>Video content built around Roblox, tools, and dev systems.</h1>
            <p style={{ margin: '18px 0 0', color: 'var(--text-secondary)', fontSize: 17, lineHeight: 1.8 }}>Short, direct, and product-focused clips from the @NKTBlast channel.</p>
          </div>
        </header>

        <section style={{ display: 'grid', gap: 24 }}>
          <VideoGallery videos={videos as VideoType[]} />
        </section>
      </div>
    </div>
  );
}
