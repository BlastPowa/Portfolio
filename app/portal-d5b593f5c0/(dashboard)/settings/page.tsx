import { prisma } from '@/lib/prisma';
import SettingsAdminClient from '@/components/admin/SettingsAdminClient';
import type { Settings } from '@/lib/types';

export const dynamic = 'force-dynamic';

async function getSettings(): Promise<Settings> {
  const rows = await prisma.setting.findMany();
  const result: Settings = {};
  for (const row of rows) {
    result[row.key] = row.value;
  }
  return result;
}

export default async function AdminSettingsPage() {
  const settings = await getSettings();
  return <SettingsAdminClient initialSettings={settings} />;
}
