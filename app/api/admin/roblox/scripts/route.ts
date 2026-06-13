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
    category: string;
    description: string;
    codePreview?: string;
    githubUrl?: string;
    language?: string;
    orderIndex?: number;
  };

  const script = await prisma.robloxScript.create({ data: body });
  return NextResponse.json(script, { status: 201 });
}
