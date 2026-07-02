import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
  const code = request.nextUrl.searchParams.get('code');
  const state = request.nextUrl.searchParams.get('state');
  const storedState = request.cookies.get('spotify_oauth_state')?.value;
  const returnTo = request.cookies.get('spotify_return_to')?.value || '/';

  if (!clientId || !clientSecret || !redirectUri) {
    return NextResponse.redirect(new URL('/?spotify_error=config', request.url));
  }
  if (!code || !state || state !== storedState) {
    return NextResponse.redirect(new URL('/?spotify_error=state', request.url));
  }

  const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
    },
    body: new URLSearchParams({ grant_type: 'authorization_code', code, redirect_uri: redirectUri }),
  });

  if (!tokenRes.ok) {
    return NextResponse.redirect(new URL('/?spotify_error=token', request.url));
  }

  const tokenData = (await tokenRes.json()) as { access_token: string; refresh_token?: string; expires_in: number };

  const secure = process.env.NODE_ENV === 'production';
  const response = NextResponse.redirect(new URL(returnTo, request.url));
  response.cookies.set('spotify_access_token', tokenData.access_token, { httpOnly: true, secure, sameSite: 'lax', maxAge: tokenData.expires_in, path: '/' });
  response.cookies.set('spotify_token_expires', String(Date.now() + tokenData.expires_in * 1000), { httpOnly: true, secure, sameSite: 'lax', maxAge: tokenData.expires_in, path: '/' });
  if (tokenData.refresh_token) {
    response.cookies.set('spotify_refresh_token', tokenData.refresh_token, { httpOnly: true, secure, sameSite: 'lax', maxAge: 60 * 60 * 24 * 365, path: '/' });
  }
  response.cookies.delete('spotify_oauth_state');
  response.cookies.delete('spotify_return_to');
  return response;
}
