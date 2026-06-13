import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const games = await prisma.robloxGame.findMany({
    orderBy: { orderIndex: 'asc' },
  });

  return NextResponse.json(games);
}
