import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { pickDefined } from '@/lib/api-helpers';

const SCRIPT_FIELDS = ['title', 'category', 'description', 'codePreview', 'imageUrl', 'githubUrl', 'language', 'orderIndex'] as const;

type ScriptData = {
  title: string;
  category: string;
  description: string;
  codePreview?: string;
  imageUrl?: string;
  githubUrl?: string;
  language?: string;
  orderIndex?: number;
};

export async function POST(request: NextRequest) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json() as Record<string, unknown>;
  const data = pickDefined<ScriptData>(body, [...SCRIPT_FIELDS]);

  if (!data.title || !data.category || !data.description) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const script = await prisma.robloxScript.create({ data: data as ScriptData });
  return NextResponse.json(script, { status: 201 });
}
