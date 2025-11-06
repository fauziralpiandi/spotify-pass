const IS_DEV = window.location.hostname === 'localhost';

const MOCK = IS_DEV
  ? {
      access_token:
        'BQCv-gS3gL2Yx5A3gK9gL1hY2aZ3jX5fW6vU7tX8rE9iZ0bA1cE3dF5gH7jK9lM',
      refresh_token:
        'AQB-pY7z_jX9fW6vU7tX8rE9iZ0bA1cE3dF5gH7jK9lM3jX5fW6vU7tX8rE9iZ0bA1cE3dF5gH7jK9lM',
      token_type: 'Bearer',
      expires_in: 3600,
      timestamp: Date.now(),
      scope:
        'user-top-read user-read-currently-playing user-read-recently-played',
    }
  : null;

const SCOPES: Record<
  string,
  {
    value: string;
    label: string;
    description: string;
  }[]
> = {
  Images: [
    {
      value: 'ugc-image-upload',
      label: 'Upload Images',
      description: 'Upload images to Spotify on your behalf',
    },
  ],
  'Listening History': [
    {
      value: 'user-read-playback-state',
      label: 'Playback State',
      description: "Read access to user's player state",
    },
    {
      value: 'user-modify-playback-state',
      label: 'Modify Playback',
      description: 'Control playback state',
    },
    {
      value: 'user-read-currently-playing',
      label: 'Currently Playing',
      description: 'Read currently playing content',
    },
    {
      value: 'user-read-recently-played',
      label: 'Recently Played',
      description: 'Access recently played items',
    },
  ],
  Playlists: [
    {
      value: 'playlist-read-private',
      label: 'Read Private',
      description: 'Access private playlists',
    },
    {
      value: 'playlist-read-collaborative',
      label: 'Read Collaborative',
      description: 'Access collaborative playlists',
    },
    {
      value: 'playlist-modify-private',
      label: 'Modify Private',
      description: 'Manage private playlists',
    },
    {
      value: 'playlist-modify-public',
      label: 'Modify Public',
      description: 'Manage public playlists',
    },
  ],
  Playback: [
    {
      value: 'app-remote-control',
      label: 'Remote Control',
      description: 'Remote control playback of Spotify',
    },
    {
      value: 'streaming',
      label: 'Streaming',
      description: 'Play content and control playback',
    },
  ],
  Users: [
    {
      value: 'user-read-email',
      label: 'Email',
      description: 'Get real email address',
    },
    {
      value: 'user-read-private',
      label: 'Private Info',
      description: 'Access subscription details',
    },
    {
      value: 'user-top-read',
      label: 'Top Content',
      description: 'Read top artists and content',
    },
    {
      value: 'user-read-playback-position',
      label: 'Playback Position',
      description: 'Read position in shows/episodes',
    },
  ],
  Follow: [
    {
      value: 'user-follow-modify',
      label: 'Modify Following',
      description: 'Manage who you are following',
    },
    {
      value: 'user-follow-read',
      label: 'Read Following',
      description: 'Access followers and following',
    },
  ],
  Library: [
    {
      value: 'user-library-modify',
      label: 'Modify Library',
      description: 'Manage saved content',
    },
    {
      value: 'user-library-read',
      label: 'Read Library',
      description: 'Access saved content',
    },
  ],
  'Open Access': [
    {
      value: 'user-soa-link',
      label: 'Link Partner Account',
      description: 'Link partner accounts to Spotify',
    },
    {
      value: 'user-soa-unlink',
      label: 'Unlink Partner Account',
      description: 'Unlink partner accounts from Spotify',
    },
    {
      value: 'soa-manage-entitlements',
      label: 'Manage Entitlements',
      description: 'Manage entitlements for linked users',
    },
  ],
};

export { MOCK, SCOPES };
