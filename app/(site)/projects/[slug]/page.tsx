import { notFound } from 'next/navigation';
import ProjectDetailPageClient from '@/components/pages/ProjectDetailPageClient';
import { prisma } from '@/lib/prisma';
import type { Project } from '@/lib/types';

export const dynamic = 'force-dynamic';

function serialize(project: {
  createdAt: Date;
  updatedAt: Date;
  images: { id: string; projectId: string; url: string; alt: string; orderIndex: number }[];
} & Record<string, unknown>): Project {
  return {
    ...(project as unknown as Project),
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt.toISOString(),
  };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug } });
  if (!project) return { title: 'Project not found' };
  return {
    title: `${project.title} — Paul Adelabu`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const project = await prisma.project.findUnique({
    where: { slug },
    include: { images: { orderBy: { orderIndex: 'asc' } } },
  });

  if (!project) notFound();

  const related = await prisma.project.findMany({
    where: { category: project.category, id: { not: project.id } },
    include: { images: { orderBy: { orderIndex: 'asc' } } },
    orderBy: [{ orderIndex: 'asc' }, { createdAt: 'desc' }],
    take: 6,
  });

  const comments = await prisma.comment.findMany({
    where: { projectId: project.id },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <ProjectDetailPageClient
      project={serialize(project)}
      related={related.map(serialize)}
      comments={comments.map((c) => ({ ...c, createdAt: c.createdAt.toISOString() }))}
    />
  );
}
