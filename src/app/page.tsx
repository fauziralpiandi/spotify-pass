'use client';

import { useState } from 'react';

const scopes = [
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
    if (!clientId || !clientSecret || selectedScopes.length === 0) {
      return alert('Please fill in all fields and select at least one scope.');
    }

    localStorage.setItem('spotify_client_id', clientId);
    localStorage.setItem('spotify_client_secret', clientSecret);

    const redirectUri = encodeURIComponent(
      `${process.env.NEXT_PUBLIC_BASE_URL}/callback`,
    );
    const scopeParam = encodeURIComponent(selectedScopes.join(' '));
    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scopeParam}&redirect_uri=${redirectUri}`;

    window.location.href = authUrl;
  };

  return (
    <div className="mx-auto max-w-xl">
      <input
        type="text"
        placeholder="Client ID"
        value={clientId}
        onChange={e => setClientId(e.target.value)}
        className="font-code w-full rounded border p-2"
      />
      <input
        type="text"
        placeholder="Client Secret"
        value={clientSecret}
        onChange={e => setClientSecret(e.target.value)}
        className="font-code mt-2 w-full rounded border p-2"
      />
      <div className="my-4">
        {scopes.map(scope => (
          <label key={scope} className="font-code block">
            <input
              type="checkbox"
              checked={selectedScopes.includes(scope)}
              onChange={() => handleScopeChange(scope)}
            />{' '}
            {scope}
          </label>
        ))}
      </div>
      <button onClick={handleSubmit} className="rounded border px-4 py-2">
        Generate Token
      </button>
    </div>
  );
}
