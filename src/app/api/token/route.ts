import { NextResponse, type NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { code, clientId, clientSecret } = await req.json();
    const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/callback`;
    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
    });
    const res = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });

    if (!res.ok) {
      throw new Error(res.statusText || 'Failed to fetch token');
    }

    const result = await res.json();

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch token' },
      { status: 500 },
    );
  }
}
