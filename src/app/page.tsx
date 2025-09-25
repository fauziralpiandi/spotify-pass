'use client';

import { useState } from 'react';

const SCOPES = [
  // Images
  'ugc-image-upload',

  // Spotify Connect
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',

  // Playback
  'app-remote-control',
  'streaming',

  // Playlists
  'playlist-read-private',
  'playlist-read-collaborative',
  'playlist-modify-private',
  'playlist-modify-public',

  // Follow
  'user-follow-modify',
  'user-follow-read',

  // Listening History
  'user-read-playback-position',
  'user-top-read',
  'user-read-recently-played',

  // Library
  'user-library-modify',
  'user-library-read',

  // Users
  'user-read-email',
  'user-read-private',
  'user-personalized',

  // Open Access
  'user-soa-link',
  'user-soa-unlink',
  'soa-manage-entitlements',
  'soa-manage-partner',
  'soa-create-partner',
];

export default function App() {
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [selectedScopes, setSelectedScopes] = useState<string[]>([]);
  const handleScopeChange = (scope: string) => {
    setSelectedScopes(prev =>
      prev.includes(scope) ? prev.filter(s => s !== scope) : [...prev, scope],
    );
  };
  const handleSubmit = () => {
    if (!clientId || !clientSecret) {
      return alert('Please enter both Client ID and Client Secret');
    }

    if (selectedScopes.length === 0) {
      return alert('Please select at least one scope');
    }

    localStorage.setItem('client_id', clientId);
    localStorage.setItem('client_secret', clientSecret);

    const redirectUri = encodeURIComponent(
      `${process.env.NEXT_PUBLIC_BASE_URL}/callback`,
    );
    const scopeParam = encodeURIComponent(selectedScopes.join(' '));
    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scopeParam}&redirect_uri=${redirectUri}`;

    window.location.href = authUrl;
  };

  return (
    <>
      <p className="mb-6 text-sm text-neutral-200">
        Make sure this url{' '}
        <span className="text-accent select-text">
          https://spotify-pass.vercel.app/callback
        </span>{' '}
        is set as redirect URI in your Spotify App.
      </p>
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Client ID"
          value={clientId}
          onChange={e => setClientId(e.target.value)}
          className="focus:outline-accent block w-full rounded bg-neutral-900 px-4 py-2 outline-1 -outline-offset-1 outline-neutral-800 placeholder:text-neutral-500 focus:outline-2 focus:-outline-offset-2"
        />
        <input
          type="text"
          placeholder="Client Secret"
          value={clientSecret}
          onChange={e => setClientSecret(e.target.value)}
          className="focus:outline-accent block w-full rounded bg-neutral-900 px-4 py-2 outline-1 -outline-offset-1 outline-neutral-800 placeholder:text-neutral-500 focus:outline-2 focus:-outline-offset-2"
        />
        <div className="my-6 flex grid grid-cols-1 space-y-2 px-2 md:grid-cols-2">
          {SCOPES.map(scope => (
            <label
              key={scope}
              className="flex cursor-pointer items-center gap-2"
            >
              <input
                type="checkbox"
                checked={selectedScopes.includes(scope)}
                onChange={() => handleScopeChange(scope)}
                className="accent-neutral-600"
              />
              <span className="text-sm">{scope}</span>
            </label>
          ))}
        </div>
        <div>
          <button
            onClick={handleSubmit}
            className="focus-visible:outline-accent text-accent flex w-full items-center justify-center rounded bg-neutral-900 py-3 font-semibold outline-1 -outline-offset-1 outline-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Generate
          </button>
        </div>
      </div>
    </>
  );
}
