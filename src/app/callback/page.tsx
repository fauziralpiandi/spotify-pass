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

            localStorage.removeItem('client_id');
            localStorage.removeItem('client_secret');
          } else {
            setError('No refresh token found in response');
          }
        } else {
          setError(JSON.stringify(result, null, 2));
        }
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-12 w-full animate-pulse rounded bg-neutral-900" />
        <div className="h-4 w-full animate-pulse rounded bg-neutral-900" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <>
      <textarea
        className="w-full rounded p-2 outline-1 -outline-offset-1 outline-neutral-800 select-none"
        value={refreshToken}
        rows={5}
        readOnly
      />
      <button
        onClick={() => navigator.clipboard.writeText(refreshToken)}
        className="focus-visible:outline-accent text-accent flex w-full items-center justify-center rounded bg-neutral-900 py-3 font-semibold outline-1 -outline-offset-1 outline-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        Copy
      </button>
    </>
  );
}
