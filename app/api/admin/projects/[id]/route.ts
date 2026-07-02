import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { pickDefined } from '@/lib/api-helpers';

type Params = { params: Promise<{ id: string }> };

const PROJECT_FIELDS = [
  'title',
  'slug',
  'category',
  'description',
  'longDescription',
  'readme',
  'demoYoutubeId',
  'techStack',
  'githubUrl',
  'liveUrl',
  'year',
  'semester',
  'featured',
  'orderIndex',
] as const;

type ProjectData = {
  title: string;
  slug: string;
  category: string;
  description: string;
  longDescription?: string | null;
  readme?: string | null;
  demoYoutubeId?: string | null;
  techStack: string;
  githubUrl?: string | null;
  liveUrl?: string | null;
  year: number;
  semester?: string | null;
  featured: boolean;
  orderIndex: number;
};

type ImageInput = { url: string; alt?: string };

export async function PUT(request: NextRequest, { params }: Params) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json() as Record<string, unknown>;
  const data = pickDefined<ProjectData>(body, [...PROJECT_FIELDS]);
  const images = Array.isArray(body.images) ? (body.images as ImageInput[]) : undefined;

  const project = await prisma.$transaction(async (tx) => {
    if (images) {
      await tx.projectImage.deleteMany({ where: { projectId: id } });
      if (images.length > 0) {
        await tx.projectImage.createMany({
          data: images.map((img, i) => ({ projectId: id, url: img.url, alt: img.alt ?? '', orderIndex: i })),
        });
      }
    }
    return tx.project.update({
      where: { id },
      data,
      include: { images: { orderBy: { orderIndex: 'asc' } } },
    });
  });

  return NextResponse.json(project);
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
