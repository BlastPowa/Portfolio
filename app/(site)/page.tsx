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

  let sectionOrder = ['featured', 'about', 'categories', 'techstack', 'cta'];
  if (settings.home_section_order) {
    try {
      const parsed = JSON.parse(settings.home_section_order);
      if (Array.isArray(parsed)) sectionOrder = parsed;
    } catch {
      // fall back to default order
    }
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
      heroEyebrow={settings.home_hero_eyebrow || "Paul Adelabu — TU Dublin '27"}
      heroHeading={settings.home_hero_heading || 'Cinematic product portfolio for games, AI tools, and Roblox systems.'}
      heroSubtext={settings.home_hero_subtext || 'Head developer on Roblox titles, creator of Drift, and maker of cinematic product experiences.'}
      aboutBio={settings.bio || 'Computing student at TU Dublin, graduating 2027. Head developer on Roblox titles and creator of AI-first tools.'}
      ctaHeading={settings.home_cta_heading || 'Let’s build the next product together.'}
      ctaSubtext={settings.home_cta_subtext || 'Contact Paul directly and show work that feels cinematic.'}
      sectionOrder={sectionOrder}
    />
  );
}
