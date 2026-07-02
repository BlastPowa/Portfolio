import PersonalPageClient from '@/components/pages/PersonalPageClient'
import { prisma } from '@/lib/prisma'
import type { Project } from '@/lib/types'

export const metadata = {
  title: 'Personal Projects - Paul Adelabu',
  description: 'Side projects, experiments, and shipped ideas',
}

export const dynamic = 'force-dynamic'

async function getProjects(): Promise<Project[]> {
  const projects = await prisma.project.findMany({
    where: { category: 'personal' },
    include: { images: { orderBy: { orderIndex: 'asc' } } },
    orderBy: [{ orderIndex: 'asc' }, { createdAt: 'desc' }],
  })

  return projects.map((project) => ({
    ...project,
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt.toISOString(),
  }))
}

export default async function PersonalPage() {
  const projects = await getProjects()
  return <PersonalPageClient projects={projects} />
}
