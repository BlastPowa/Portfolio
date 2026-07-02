import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET(request: NextRequest) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return NextResponse.json({ error: 'Spotify integration not configured' }, { status: 500 });
  }

  const state = crypto.randomBytes(16).toString('hex');
  const returnTo = request.nextUrl.searchParams.get('returnTo') || '/';

  const authorizeUrl = new URL('https://accounts.spotify.com/authorize');
  authorizeUrl.searchParams.set('client_id', clientId);
  authorizeUrl.searchParams.set('response_type', 'code');
  authorizeUrl.searchParams.set('redirect_uri', redirectUri);
  authorizeUrl.searchParams.set('scope', 'user-read-playback-state user-read-currently-playing');
  authorizeUrl.searchParams.set('state', state);

  const secure = process.env.NODE_ENV === 'production';
  const response = NextResponse.redirect(authorizeUrl);
  response.cookies.set('spotify_oauth_state', state, { httpOnly: true, secure, sameSite: 'lax', maxAge: 600, path: '/' });
  response.cookies.set('spotify_return_to', returnTo, { httpOnly: true, secure, sameSite: 'lax', maxAge: 600, path: '/' });
  return response;
}
