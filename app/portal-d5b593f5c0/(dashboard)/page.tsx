import { prisma } from '@/lib/prisma';
import DashboardClient from '@/components/admin/DashboardClient';
import { ADMIN_BASE } from '@/lib/admin-path';

export const dynamic = 'force-dynamic';

const actions = [
  { label: 'Manage projects', href: `${ADMIN_BASE}/projects` },
  { label: 'Manage videos', href: `${ADMIN_BASE}/videos` },
  { label: 'Manage Roblox', href: `${ADMIN_BASE}/roblox` },
  { label: 'Manage settings', href: `${ADMIN_BASE}/settings` },
];

export default async function AdminDashboardPage() {
  const [projectCount, videoCount, gameCount, scriptCount, settingCount] = await prisma.$transaction([
    prisma.project.count(),
    prisma.video.count(),
    prisma.robloxGame.count(),
    prisma.robloxScript.count(),
    prisma.setting.count(),
  ]);

  const stats = [
    { label: 'Projects', value: String(projectCount) },
    { label: 'Videos', value: String(videoCount) },
    { label: 'Roblox entries', value: String(gameCount + scriptCount) },
    { label: 'Settings keys', value: String(settingCount) },
  ];

  return <DashboardClient stats={stats} actions={actions} />;
}
