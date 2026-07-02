import { prisma } from '@/lib/prisma';
import HomePageClient from '@/components/pages/HomePageClient';

export const dynamic = 'force-dynamic';

function serializeProject<T extends { createdAt: Date; updatedAt: Date }>(project: T) {
  return {
    ...project,
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt.toISOString(),
  };
}

export default async function Home() {
  const [featured, school, personal, robloxGames, settingRows] = await Promise.all([
    prisma.project.findMany({
      where: { featured: true },
      include: { images: { orderBy: { orderIndex: 'asc' } } },
      orderBy: [{ orderIndex: 'asc' }, { createdAt: 'desc' }],
      take: 3,
    }),
    prisma.project.findMany({
      where: { category: 'school' },
      include: { images: { orderBy: { orderIndex: 'asc' } } },
      orderBy: [{ orderIndex: 'asc' }, { createdAt: 'desc' }],
      take: 6,
    }),
    prisma.project.findMany({
      where: { category: 'personal' },
      include: { images: { orderBy: { orderIndex: 'asc' } } },
      orderBy: [{ orderIndex: 'asc' }, { createdAt: 'desc' }],
      take: 6,
    }),
    prisma.robloxGame.findMany({ orderBy: { orderIndex: 'asc' }, take: 6 }),
    prisma.setting.findMany(),
  ]);

  const settings: Record<string, string> = {};
  for (const row of settingRows) {
    settings[row.key] = row.value;
  }

  return (
    <HomePageClient
      featuredProjects={featured.map(serializeProject)}
      schoolProjects={school.map(serializeProject)}
      personalProjects={personal.map(serializeProject)}
      robloxGames={robloxGames}
      statsProjects={settings.stats_projects ? `${settings.stats_projects}+` : '0'}
      statsTechnologies={settings.stats_technologies ? `${settings.stats_technologies}+` : '0'}
      statsRoblox={String(robloxGames.length)}
      contactEmail={settings.contact_email || 'contact@blastpowa.dev'}
      nowPlaying={robloxGames[0] ?? null}
    />
  );
}
