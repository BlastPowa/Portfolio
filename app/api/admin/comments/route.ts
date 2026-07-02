import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

export async function GET(_request: NextRequest) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const comments = await prisma.comment.findMany({
    orderBy: { createdAt: 'desc' },
    include: { project: { select: { title: true, slug: true } } },
  });

  return NextResponse.json(comments);
}
