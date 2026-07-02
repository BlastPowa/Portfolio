import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { pickDefined } from '@/lib/api-helpers';

type Params = { params: Promise<{ id: string }> };

const GAME_FIELDS = ['title', 'description', 'thumbnailUrl', 'robloxUrl', 'status', 'playerCount', 'orderIndex'] as const;

type GameData = {
  title: string;
  description: string;
  thumbnailUrl?: string | null;
  robloxUrl?: string | null;
  status: string;
  playerCount?: string | null;
  orderIndex: number;
};

export async function PUT(request: NextRequest, { params }: Params) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json() as Record<string, unknown>;
  const data = pickDefined<GameData>(body, [...GAME_FIELDS]);

  const game = await prisma.robloxGame.update({ where: { id }, data });
  return NextResponse.json(game);
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  await prisma.robloxGame.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
