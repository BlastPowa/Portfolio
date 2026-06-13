import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { supabase } from '@/lib/supabase';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  if (!file.type.startsWith('image/')) {
    return NextResponse.json({ error: 'File must be an image' }, { status: 400 });
  }

  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: 'File must be under 10MB' }, { status: 400 });
  }

  const ext = file.name.split('.').pop() ?? 'jpg';
  const filename = `${crypto.randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage
    .from('portfolio-images')
    .upload(filename, buffer, { contentType: file.type, upsert: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data } = supabase.storage.from('portfolio-images').getPublicUrl(filename);

  return NextResponse.json({ url: data.publicUrl });
}
