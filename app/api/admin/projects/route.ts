import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json() as {
    title: string;
    slug?: string;
    category: string;
    description: string;
    longDescription?: string;
    techStack: string;
    githubUrl?: string;
    liveUrl?: string;
    year: number;
    semester?: string;
    featured?: boolean;
    orderIndex?: number;
  };

  const slug = body.slug ?? body.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  const project = await prisma.project.create({
    data: { ...body, slug },
  });

  return NextResponse.json(project, { status: 201 });
}
