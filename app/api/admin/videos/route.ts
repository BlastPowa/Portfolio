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
    youtubeId: string;
    thumbnailUrl?: string;
    description?: string;
    playlist?: string;
    featured?: boolean;
    orderIndex?: number;
  };

  const video = await prisma.video.create({ data: body });
  return NextResponse.json(video, { status: 201 });
}
