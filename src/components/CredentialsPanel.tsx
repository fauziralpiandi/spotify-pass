import { AnimatedSection } from './AnimatedSection';

export function CredentialsPanel({
  clientId,
  clientSecret,
  selectedScopes,
  loading,
  onClientIdChange,
  onClientSecretChange,
  onAuthorize,
}: {
  clientId: string;
  clientSecret: string;
  selectedScopes: string[];
  loading: boolean;
  onClientIdChange: (value: string) => void;
  onClientSecretChange: (value: string) => void;
  onAuthorize: () => void;
}) {
  return (
    <div className="col-span-1 px-8 py-16 md:px-16 md:py-24 lg:col-span-7 lg:px-24">
      <div className="space-y-16">
        <AnimatedSection>
          <div className="space-y-4">
            <h2 className="text-2xl font-light tracking-tight md:text-2xl lg:text-3xl">
              Credentials
            </h2>
            <div className="h-px w-1/4 bg-neutral-900" />
          </div>
          <p className="leading-relaxed text-neutral-500 md:text-lg">
            Enter your application credentials to begin the authorization flow
          </p>

          <div className="space-y-8">
            <div className="space-y-4">
              <label
                htmlFor="client-id"
                className="block font-mono text-xs tracking-widest text-neutral-700 uppercase"
              >
                Client ID
              </label>
              <input
                id="client-id"
                type="text"
                value={clientId}
                onChange={(e) => {
                  onClientIdChange(e.target.value);
                }}
                className="w-full border-b border-neutral-200 py-4 font-mono transition-colors duration-400 outline-none placeholder:text-neutral-400 focus-visible:border-neutral-950 md:text-lg"
                placeholder="Enter client ID"
                aria-required="true"
              />
            </div>

            <div className="space-y-4">
              <label
                htmlFor="client-secret"
                className="block font-mono text-xs tracking-widest text-neutral-700 uppercase"
              >
                Client Secret
              </label>
              <input
                id="client-secret"
                type="password"
                value={clientSecret}
                onChange={(e) => {
                  onClientSecretChange(e.target.value);
                }}
                className="w-full border-b border-neutral-200 py-4 font-mono transition-colors duration-400 outline-none placeholder:text-neutral-400 focus-visible:border-neutral-950 md:text-lg"
                placeholder="Enter client secret"
                aria-required="true"
              />
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <button
            onClick={onAuthorize}
            disabled={loading}
            className="w-full bg-neutral-900 px-12 py-6 font-mono text-sm tracking-widest text-neutral-50 uppercase transition-colors duration-400 hover:bg-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800 disabled:cursor-not-allowed disabled:opacity-50 md:text-base"
            aria-label="Begin Spotify authorization"
          >
            {loading ? 'Authorizing...' : 'Authorize'}
          </button>
          <div className="flex items-center justify-center gap-2">
            <p className="text-center font-mono text-xs text-neutral-500">
              {selectedScopes.length} scope
              {selectedScopes.length !== 1 ? 's' : ''} selected
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
