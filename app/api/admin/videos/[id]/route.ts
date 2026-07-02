import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { pickDefined } from '@/lib/api-helpers';

type Params = { params: Promise<{ id: string }> };

const VIDEO_FIELDS = ['title', 'youtubeId', 'thumbnailUrl', 'description', 'playlist', 'featured', 'orderIndex'] as const;

type VideoData = {
  title: string;
  youtubeId: string;
  thumbnailUrl?: string | null;
  description?: string | null;
  playlist?: string | null;
  featured: boolean;
  orderIndex: number;
};

export async function PUT(request: NextRequest, { params }: Params) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json() as Record<string, unknown>;
  const data = pickDefined<VideoData>(body, [...VIDEO_FIELDS]);

  const video = await prisma.video.update({ where: { id }, data });
  return NextResponse.json(video);
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  await prisma.video.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
