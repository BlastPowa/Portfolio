import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type Params = { params: Promise<{ slug: string }> };

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const postLog = new Map<string, { count: number; windowStart: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = postLog.get(ip);
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    postLog.set(ip, { count: 1, windowStart: now });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

export async function GET(_request: NextRequest, { params }: Params) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug }, select: { id: true } });
  if (!project) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const comments = await prisma.comment.findMany({
    where: { projectId: project.id },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(comments);
}

export async function POST(request: NextRequest, { params }: Params) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug }, select: { id: true } });
  if (!project) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many comments — try again later' }, { status: 429 });
  }

  const body = await request.json() as { name?: string; message?: string; website?: string };

  if (body.website) {
    return NextResponse.json({ error: 'Rejected' }, { status: 400 });
  }

  const name = (body.name ?? '').trim();
  const message = (body.message ?? '').trim();

  if (!name || !message) {
    return NextResponse.json({ error: 'Name and message are required' }, { status: 400 });
  }
  if (name.length > 60) {
    return NextResponse.json({ error: 'Name is too long' }, { status: 400 });
  }
  if (message.length > 1000) {
    return NextResponse.json({ error: 'Message is too long' }, { status: 400 });
  }

  const comment = await prisma.comment.create({
    data: { projectId: project.id, name, message },
  });

  return NextResponse.json(comment, { status: 201 });
}
