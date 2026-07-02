import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { pickDefined } from '@/lib/api-helpers';

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
  slug?: string;
  category: string;
  description: string;
  longDescription?: string;
  readme?: string;
  demoYoutubeId?: string;
  techStack: string;
  githubUrl?: string;
  liveUrl?: string;
  year: number;
  semester?: string;
  featured?: boolean;
  orderIndex?: number;
};

type ImageInput = { url: string; alt?: string };

export async function POST(request: NextRequest) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json() as Record<string, unknown>;
  const data = pickDefined<ProjectData>(body, [...PROJECT_FIELDS]);
  const images = Array.isArray(body.images) ? (body.images as ImageInput[]) : [];

  if (!data.title || !data.category || !data.description || !data.techStack || data.year === undefined) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  const validated = data as ProjectData;

  const slug = validated.slug ?? validated.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  const project = await prisma.project.create({
    data: {
      ...validated,
      slug,
      images: {
        create: images.map((img, i) => ({ url: img.url, alt: img.alt ?? '', orderIndex: i })),
      },
    },
    include: { images: { orderBy: { orderIndex: 'asc' } } },
  });

  return NextResponse.json(project, { status: 201 });
}
