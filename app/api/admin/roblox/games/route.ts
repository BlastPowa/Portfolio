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
    description: string;
    thumbnailUrl?: string;
    robloxUrl?: string;
    status?: string;
    playerCount?: string;
    orderIndex?: number;
  };

  const game = await prisma.robloxGame.create({ data: body });
  return NextResponse.json(game, { status: 201 });
}
