import { prisma } from '@/lib/prisma';
import AboutPageClient from '@/components/pages/AboutPageClient';

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const rows = await prisma.setting.findMany();
  const settings: Record<string, string> = {};
  for (const row of rows) {
    settings[row.key] = row.value;
  }

  return (
    <AboutPageClient
      contactEmail={settings.contact_email || 'contact@blastpowa.dev'}
      githubUrl={settings.github_url || ''}
      youtubeUrl={settings.youtube_url || ''}
      instagramUrl={settings.instagram_url || ''}
    />
  );
}
