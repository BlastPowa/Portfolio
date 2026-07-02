import RobloxPageClient from '@/components/pages/RobloxPageClient'
import { prisma } from '@/lib/prisma'

export const metadata = {
  title: 'Roblox Projects - Paul Adelabu',
  description: 'Games, scripts, and VFX built in Luau',
}

export const dynamic = 'force-dynamic'

export default async function RobloxPage() {
  const [games, scripts] = await Promise.all([
    prisma.robloxGame.findMany({ orderBy: { orderIndex: 'asc' } }),
    prisma.robloxScript.findMany({ orderBy: { orderIndex: 'asc' } }),
  ])

  return <RobloxPageClient games={games} scripts={scripts} />
}
