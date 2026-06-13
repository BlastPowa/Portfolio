import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const settings = await prisma.setting.findMany();

  const result: Record<string, string> = {};
  for (const s of settings) {
    result[s.key] = s.value;
  }

  return NextResponse.json(result);
}
