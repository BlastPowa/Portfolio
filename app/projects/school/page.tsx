import SchoolPageClient from '@/components/pages/SchoolPageClient'
import { prisma } from '@/lib/prisma'
import type { Project } from '@/lib/types'

export const metadata = {
  title: 'School Projects - Paul Adelabu',
  description: 'Academic work and thesis projects at TU Dublin',
}

export const dynamic = 'force-dynamic'

async function getProjects(): Promise<Project[]> {
  const projects = await prisma.project.findMany({
    where: { category: 'school' },
    include: { images: { orderBy: { orderIndex: 'asc' } } },
    orderBy: [{ orderIndex: 'asc' }, { createdAt: 'desc' }],
  })

  return projects.map((project) => ({
    ...project,
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt.toISOString(),
  }))
}

export default async function SchoolPage() {
  const projects = await getProjects()
  return <SchoolPageClient projects={projects} />
}
