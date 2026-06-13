import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json() as { name?: string; email?: string; message?: string };
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  if (process.env.RESEND_API_KEY) {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'portfolio@blastpowa.dev',
        to: process.env.CONTACT_EMAIL,
        subject: `Portfolio contact from ${name}`,
        html: `<p><strong>From:</strong> ${name} (${email})</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br>')}</p>`,
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true });
}
