import { prisma } from '@/lib/prisma';
import CommentsAdminClient from '@/components/admin/CommentsAdminClient';

export const dynamic = 'force-dynamic';

export default async function AdminCommentsPage() {
  const comments = await prisma.comment.findMany({
    orderBy: { createdAt: 'desc' },
    include: { project: { select: { title: true, slug: true } } },
  });

  return (
    <CommentsAdminClient
      initialComments={comments.map((c) => ({
        id: c.id,
        projectId: c.projectId,
        name: c.name,
        message: c.message,
        createdAt: c.createdAt.toISOString(),
        project: c.project,
      }))}
    />
  );
}
