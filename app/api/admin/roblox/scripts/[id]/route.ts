import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { pickDefined } from '@/lib/api-helpers';

type Params = { params: Promise<{ id: string }> };

const SCRIPT_FIELDS = ['title', 'category', 'description', 'codePreview', 'imageUrl', 'githubUrl', 'language', 'orderIndex'] as const;

type ScriptData = {
  title: string;
  category: string;
  description: string;
  codePreview?: string | null;
  imageUrl?: string | null;
  githubUrl?: string | null;
  language: string;
  orderIndex: number;
};

export async function PUT(request: NextRequest, { params }: Params) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json() as Record<string, unknown>;
  const data = pickDefined<ScriptData>(body, [...SCRIPT_FIELDS]);

  const script = await prisma.robloxScript.update({ where: { id }, data });
  return NextResponse.json(script);
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  await prisma.robloxScript.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
