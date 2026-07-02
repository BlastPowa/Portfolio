import { NextRequest, NextResponse } from 'next/server';

interface RefreshedToken {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
}

async function refreshAccessToken(refreshToken: string): Promise<RefreshedToken | null> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!clientId || !clientSecret) return null;

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
    },
    body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refreshToken }),
  });

  if (!res.ok) return null;
  return (await res.json()) as RefreshedToken;
}

export async function GET(request: NextRequest) {
  const refreshToken = request.cookies.get('spotify_refresh_token')?.value;
  if (!refreshToken) {
    return NextResponse.json({ connected: false, isPlaying: false });
  }

  let accessToken = request.cookies.get('spotify_access_token')?.value;
  const expiresAt = Number(request.cookies.get('spotify_token_expires')?.value || 0);
  let refreshed: RefreshedToken | null = null;

  if (!accessToken || Date.now() > expiresAt - 5000) {
    refreshed = await refreshAccessToken(refreshToken);
    if (!refreshed) {
      const res = NextResponse.json({ connected: false, isPlaying: false });
      res.cookies.delete('spotify_access_token');
      res.cookies.delete('spotify_refresh_token');
      res.cookies.delete('spotify_token_expires');
      return res;
    }
    accessToken = refreshed.access_token;
  }

  const playbackRes = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  let isPlaying = false;
  if (playbackRes.status === 200) {
    const data = (await playbackRes.json().catch(() => null)) as { is_playing?: boolean } | null;
    isPlaying = Boolean(data?.is_playing);
  }

  const response = NextResponse.json({ connected: true, isPlaying });
  if (refreshed) {
    const secure = process.env.NODE_ENV === 'production';
    response.cookies.set('spotify_access_token', refreshed.access_token, { httpOnly: true, secure, sameSite: 'lax', maxAge: refreshed.expires_in, path: '/' });
    response.cookies.set('spotify_token_expires', String(Date.now() + refreshed.expires_in * 1000), { httpOnly: true, secure, sameSite: 'lax', maxAge: refreshed.expires_in, path: '/' });
    if (refreshed.refresh_token) {
      response.cookies.set('spotify_refresh_token', refreshed.refresh_token, { httpOnly: true, secure, sameSite: 'lax', maxAge: 60 * 60 * 24 * 365, path: '/' });
    }
  }
  return response;
}
