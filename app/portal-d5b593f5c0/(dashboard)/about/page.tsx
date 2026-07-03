import { prisma } from '@/lib/prisma';
import AboutAdminClient from '@/components/admin/AboutAdminClient';
import {
  parseJsonSetting,
  DEFAULT_TIMELINE,
  DEFAULT_SKILLS,
  DEFAULT_CERTIFICATIONS,
  DEFAULT_CV_PROJECTS,
} from '@/lib/about-content';

export const dynamic = 'force-dynamic';

export default async function AdminAboutPage() {
  const rows = await prisma.setting.findMany();
  const settings: Record<string, string> = {};
  for (const row of rows) {
    settings[row.key] = row.value;
  }

  return (
    <AboutAdminClient
      avatarUrl={settings.about_avatar_url || ''}
      timeline={parseJsonSetting(settings.about_timeline, DEFAULT_TIMELINE)}
      skillGroups={parseJsonSetting(settings.about_skills, DEFAULT_SKILLS)}
      certifications={parseJsonSetting(settings.about_certifications, DEFAULT_CERTIFICATIONS)}
      cvProjects={parseJsonSetting(settings.about_projects_list, DEFAULT_CV_PROJECTS)}
    />
  );
}
