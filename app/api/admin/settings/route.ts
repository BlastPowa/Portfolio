import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

export async function PUT(request: NextRequest) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json() as { key: string; value: string };
  const { key, value } = body;

  if (!key || value === undefined) {
    return NextResponse.json({ error: 'Key and value are required' }, { status: 400 });
  }

  const setting = await prisma.setting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });

  return NextResponse.json(setting);
}
