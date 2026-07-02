import { prisma } from '@/lib/prisma';
import DashboardClient from '@/components/admin/DashboardClient';

export const dynamic = 'force-dynamic';

const actions = [
  { label: 'Manage projects', href: '/admin/projects' },
  { label: 'Manage videos', href: '/admin/videos' },
  { label: 'Manage Roblox', href: '/admin/roblox' },
  { label: 'Manage settings', href: '/admin/settings' },
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
