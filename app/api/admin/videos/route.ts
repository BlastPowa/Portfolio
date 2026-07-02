import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { pickDefined } from '@/lib/api-helpers';

const VIDEO_FIELDS = ['title', 'youtubeId', 'thumbnailUrl', 'description', 'playlist', 'featured', 'orderIndex'] as const;

type VideoData = {
  title: string;
  youtubeId: string;
  thumbnailUrl?: string;
  description?: string;
  playlist?: string;
  featured?: boolean;
  orderIndex?: number;
};

export async function POST(request: NextRequest) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json() as Record<string, unknown>;
  const data = pickDefined<VideoData>(body, [...VIDEO_FIELDS]);

  if (!data.title || !data.youtubeId) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const video = await prisma.video.create({ data: data as VideoData });
  return NextResponse.json(video, { status: 201 });
}
