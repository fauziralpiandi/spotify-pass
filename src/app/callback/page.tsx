'use client';

import { useEffect, useState } from 'react';

export default function Callback() {
  const [refreshToken, setRefreshToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const clientId = localStorage.getItem('spotify_client_id');
    const clientSecret = localStorage.getItem('spotify_client_secret');

    if (!code || !clientId || !clientSecret) {
      setError('Missing code, client ID, or client secret.');
      setLoading(false);

      return;
    }

    fetch('/api/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, clientId, clientSecret }),
    })
      .then(async res => {
        const result = await res.json();

        if (res.ok) {
          if (result.refresh_token) {
            setRefreshToken(result.refresh_token);
          } else {
            setError('No refresh token found in response.');
          }
        } else {
          setError(JSON.stringify(result, null, 2));
        }
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>loading</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      <textarea
        className="font-code w-full rounded border p-2"
        value={refreshToken}
        rows={5}
        readOnly
      />
      <button
        onClick={() => navigator.clipboard.writeText(refreshToken)}
        className="rounded border px-4 py-2"
      >
        Copy Refresh Token
      </button>
    </div>
  );
}
