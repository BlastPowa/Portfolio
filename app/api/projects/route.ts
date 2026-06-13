import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const featuredParam = searchParams.get('featured');

  const where: Record<string, unknown> = {};
  if (category) where.category = category;
  if (featuredParam === 'true') where.featured = true;

  const projects = await prisma.project.findMany({
    where,
    include: { images: { orderBy: { orderIndex: 'asc' } } },
    orderBy: [{ orderIndex: 'asc' }, { createdAt: 'desc' }],
  });

  return NextResponse.json(projects);
}
