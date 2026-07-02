import { prisma } from '@/lib/prisma';
import RobloxAdminClient from '@/components/admin/RobloxAdminClient';

export const dynamic = 'force-dynamic';

export default async function AdminRobloxPage() {
  const [games, scripts] = await Promise.all([
    prisma.robloxGame.findMany({ orderBy: { orderIndex: 'asc' } }),
    prisma.robloxScript.findMany({ orderBy: { orderIndex: 'asc' } }),
  ]);

  return <RobloxAdminClient initialGames={games} initialScripts={scripts} />;
}
