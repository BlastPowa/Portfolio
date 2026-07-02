import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { pickDefined } from '@/lib/api-helpers';

const GAME_FIELDS = ['title', 'description', 'thumbnailUrl', 'robloxUrl', 'status', 'playerCount', 'orderIndex'] as const;

type GameData = {
  title: string;
  description: string;
  thumbnailUrl?: string;
  robloxUrl?: string;
  status?: string;
  playerCount?: string;
  orderIndex?: number;
};

export async function POST(request: NextRequest) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json() as Record<string, unknown>;
  const data = pickDefined<GameData>(body, [...GAME_FIELDS]);

  if (!data.title || !data.description) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const game = await prisma.robloxGame.create({ data: data as GameData });
  return NextResponse.json(game, { status: 201 });
}
