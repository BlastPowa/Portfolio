import { prisma } from '@/lib/prisma';
import ProjectsAdminClient from '@/components/admin/ProjectsAdminClient';
import type { Project } from '@/lib/types';

export const dynamic = 'force-dynamic';

async function getProjects(): Promise<Project[]> {
  const projects = await prisma.project.findMany({
    include: { images: { orderBy: { orderIndex: 'asc' } } },
    orderBy: [{ orderIndex: 'asc' }, { createdAt: 'desc' }],
  });

  return projects.map((project) => ({
    ...project,
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt.toISOString(),
  }));
}

export default async function AdminProjectsPage() {
  const projects = await getProjects();
  return <ProjectsAdminClient initialProjects={projects} />;
}
