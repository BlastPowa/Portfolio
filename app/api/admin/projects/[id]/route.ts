import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: Params) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json() as Record<string, unknown>;

  const project = await prisma.project.update({ where: { id }, data: body });
  return NextResponse.json(project);
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
