import { prisma } from '@/lib/prisma';
import HomePageClient from '@/components/pages/HomePageClient';
import { parseTechStack } from '@/lib/types';

export const dynamic = 'force-dynamic';

function serializeProject<T extends { createdAt: Date; updatedAt: Date }>(project: T) {
  return {
    ...project,
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt.toISOString(),
  };
}

export default async function Home() {
  const [featured, school, personal, robloxGames, settingRows, allTechStacks, projectCount, robloxCount] = await Promise.all([
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
    prisma.project.findMany({ select: { techStack: true } }),
    prisma.project.count(),
    prisma.robloxGame.count(),
  ]);

  const settings: Record<string, string> = {};
  for (const row of settingRows) {
    settings[row.key] = row.value;
  }

  const techSet = new Set<string>();
  for (const row of allTechStacks) {
    for (const t of parseTechStack(row.techStack)) techSet.add(t.trim());
  }

  return (
    <HomePageClient
      featuredProjects={featured.map(serializeProject)}
      schoolProjects={school.map(serializeProject)}
      personalProjects={personal.map(serializeProject)}
      robloxGames={robloxGames}
      statsProjects={String(projectCount)}
      statsTechnologies={String(techSet.size)}
      statsRoblox={String(robloxCount)}
      contactEmail={settings.contact_email || 'contact@blastpowa.dev'}
    />
  );
}
