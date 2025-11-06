import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  useEphemeralFlag,
  useEphemeralMessage,
  useTokenCountdown,
} from './hooks';
import {
  CredentialsPanel,
  GrantedScopesList,
  Layout,
  ScopePanel,
  Toast,
  TokenDisplay,
  TokenSummary,
} from './components';

interface TokenData {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  timestamp: number;
  scope: string;
  error?: string;
  error_description?: string;
}

interface Res {
  authUrl: string;
  state: string;
  error?: string;
}

export function App() {
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [selectedScopes, setSelectedScopes] = useState<string[]>([]);
  const [tokenData, setTokenData] = useState<TokenData | null>();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useEphemeralMessage(5000);
  const [copiedToken, setCopiedToken] = useEphemeralFlag(2000);
  const [copiedRefresh, setCopiedRefresh] = useEphemeralFlag(2000);

  const redirectUri = `${window.location.origin}/callback`;
  const timeRemaining = useTokenCountdown(tokenData);
  const grantedScopes = useMemo(
    () => (tokenData?.scope ? tokenData.scope.split(' ') : []),
    [tokenData?.scope],
  );

  const handleCallback = useCallback(
    async (
      code: string,
      state: string,
      clientId: string,
      clientSecret: string,
    ) => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch('/api/callback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            code,
            state,
            clientId,
            clientSecret,
            redirectUri,
          }),
        });

        const data = (await response.json()) as TokenData;

        if (!response.ok) {
          throw new Error(
            data.error_description ?? data.error ?? 'Failed to exchange code',
          );
        }

        setTokenData({ ...data, timestamp: Date.now() });

        sessionStorage.removeItem('oauth_state');
        sessionStorage.removeItem('client_id');
        sessionStorage.removeItem('client_secret');

        setClientId(clientId);
        setClientSecret(clientSecret);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    },
    [redirectUri, setError],
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const state = params.get('state');
    const storedState = sessionStorage.getItem('oauth_state');
    const storedClientId = sessionStorage.getItem('client_id');
    const storedClientSecret = sessionStorage.getItem('client_secret');

    if (
      code &&
      state &&
      state === storedState &&
      storedClientId &&
      storedClientSecret
    ) {
      void handleCallback(code, state, storedClientId, storedClientSecret);
      window.history.replaceState({}, document.title, '/');
    }
  }, [handleCallback]);

  const authorizeWithSpotify = async () => {
    if (!clientId || !clientSecret) {
      setError('Missing credentials');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/authorize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId,
          scopes: selectedScopes.join(' '),
          redirectUri,
        }),
      });

      const data = (await response.json()) as Res;

      if (!response.ok) {
        throw new Error(data.error ?? 'Failed to generate authorization URL');
      }

      sessionStorage.setItem('oauth_state', data.state);
      sessionStorage.setItem('client_id', clientId);
      sessionStorage.setItem('client_secret', clientSecret);

      window.location.href = data.authUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  const refreshToken = async () => {
    if (!tokenData?.refresh_token || !clientId || !clientSecret) {
      setError('Missing refresh token or credentials');
      return;
    }

    setRefreshing(true);
    setError('');

    try {
      const response = await fetch('/api/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId,
          clientSecret,
          refreshToken: tokenData.refresh_token,
        }),
      });

      const data = (await response.json()) as TokenData;

      if (!response.ok) {
        throw new Error(
          data.error_description ?? data.error ?? 'Failed to refresh token',
        );
      }

      setTokenData({
        ...data,
        refresh_token: data.refresh_token,
        timestamp: Date.now(),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setRefreshing(false);
    }
  };

  const copyToClipboard = async (text: string, type: 'access' | 'refresh') => {
    try {
      await navigator.clipboard.writeText(text);

      if (type === 'access') {
        setCopiedToken(true);
      } else {
        setCopiedRefresh(true);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const toggleScope = (value: string) => {
    setSelectedScopes((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value],
    );
  };

  const resetFlow = () => {
    setTokenData(null);
    setCopiedToken(false);
    setCopiedRefresh(false);
  };

  if (tokenData && !tokenData.error) {
    return (
      <Layout
        status="active"
        title="Spotify Pass"
        subtitle="Authorization Complete"
      >
        <div className="col-span-1 px-8 py-16 md:px-16 md:py-24 lg:col-span-8 lg:px-24">
          <div className="space-y-16">
            <TokenDisplay
              title="Access Token"
              token={tokenData.access_token}
              copied={copiedToken}
              onCopy={() =>
                void copyToClipboard(tokenData.access_token, 'access')
              }
              onRefresh={() => void refreshToken()}
              refreshing={refreshing}
              variant="primary"
            />

            <div className="h-px bg-neutral-200" />

            <TokenDisplay
              title="Refresh Token"
              token={tokenData.refresh_token}
              copied={copiedRefresh}
              onCopy={() =>
                void copyToClipboard(tokenData.refresh_token, 'refresh')
              }
              variant="secondary"
            />
          </div>
        </div>

        <div className="col-span-1 bg-neutral-100 px-8 py-16 md:px-12 md:py-24 lg:col-span-4">
          <TokenSummary
            tokenType={tokenData.token_type}
            timeRemaining={timeRemaining}
            grantedScopesCount={grantedScopes.length}
            onReset={resetFlow}
          />

          <div className="mt-12">
            <GrantedScopesList scopes={grantedScopes} />
          </div>
        </div>

        <Toast message={error} />
      </Layout>
    );
  }

  return (
    <Layout
      status="ready"
      title="Spotify Pass"
      subtitle="Credential Authorization"
    >
      <CredentialsPanel
        clientId={clientId}
        clientSecret={clientSecret}
        selectedScopes={selectedScopes}
        loading={loading}
        onClientIdChange={setClientId}
        onClientSecretChange={setClientSecret}
        onAuthorize={() => void authorizeWithSpotify()}
      />

      <ScopePanel selectedScopes={selectedScopes} onToggleScope={toggleScope} />

      <Toast message={error} />
    </Layout>
  );
}
