import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const scripts = await prisma.robloxScript.findMany({
    orderBy: { orderIndex: 'asc' },
  });

  return NextResponse.json(scripts);
}
