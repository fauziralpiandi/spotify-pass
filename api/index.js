import express from 'express';
import cors from 'cors';
import crypto from 'crypto';

const app = express();
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:5000'];

app.use(
  cors({
    origin: function (origin, callback) {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        allowedOrigins.includes('*')
      ) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());

const pkceStore = new Map();

function generateCodeVerifier() {
  return crypto.randomBytes(32).toString('base64url');
}

function generateCodeChallenge(verifier) {
  return crypto.createHash('sha256').update(verifier).digest('base64url');
}

app.post('/api/authorize', (req, res) => {
  const { clientId, scopes, redirectUri } = req.body;

  if (!clientId) {
    return res.status(400).json({ error: 'Missing client ID' });
  }

  const state = crypto.randomBytes(16).toString('hex');
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = generateCodeChallenge(codeVerifier);

  pkceStore.set(state, { codeVerifier, clientId, redirectUri });

  setTimeout(() => pkceStore.delete(state), 600000);

  const authUrl = new URL('https://accounts.spotify.com/authorize');

  authUrl.searchParams.append('client_id', clientId);
  authUrl.searchParams.append('response_type', 'code');
  authUrl.searchParams.append('redirect_uri', redirectUri);
  authUrl.searchParams.append('code_challenge_method', 'S256');
  authUrl.searchParams.append('code_challenge', codeChallenge);
  authUrl.searchParams.append('state', state);

  if (scopes && scopes.trim()) {
    authUrl.searchParams.append('scope', scopes);
  }

  res.json({ authUrl: authUrl.toString(), state });
});

app.post('/api/callback', async (req, res) => {
  const { code, state, clientId, clientSecret, redirectUri } = req.body;

  if (!code || !state) {
    return res
      .status(400)
      .json({ error: 'Missing authorization code or state' });
  }

  const stored = pkceStore.get(state);

  if (!stored) {
    return res.status(400).json({ error: 'Invalid or expired state' });
  }

  if (stored.clientId !== clientId || stored.redirectUri !== redirectUri) {
    pkceStore.delete(state);

    return res
      .status(400)
      .json({ error: 'Client ID or redirect URI mismatch' });
  }

  pkceStore.delete(state);

  try {
    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
      'base64',
    );

    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri,
      code_verifier: stored.codeVerifier,
    });

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error || 'Failed to exchange code for token',
        error_description: data.error_description || 'Unknown error',
      });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      error_description: error.message,
    });
  }
});

app.post('/api/refresh', async (req, res) => {
  const { clientId, clientSecret, refreshToken } = req.body;

  if (!clientId || !clientSecret || !refreshToken) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  try {
    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
      'base64',
    );

    const params = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    });

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error || 'Failed to refresh token',
        error_description: data.error_description || 'Unknown error',
      });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      error_description: error.message,
    });
  }
});

if (process.env.NODE_ENV !== 'production') {
  const PORT = 3000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
