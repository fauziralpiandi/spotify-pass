import { AnimatedSection } from './AnimatedSection';

export function TokenDisplay({
  title,
  token,
  copied,
  onCopy,
  onRefresh,
  refreshing = false,
  variant = 'primary',
}: {
  title: string;
  token: string;
  copied: boolean;
  onCopy: () => void;
  onRefresh?: () => void;
  refreshing?: boolean;
  variant?: 'primary' | 'secondary';
}) {
  const isPrimary = variant === 'primary';

  return (
    <AnimatedSection>
      <div className="space-y-4">
        <h2
          className={`font-light tracking-tight ${isPrimary ? 'text-2xl md:text-2xl lg:text-3xl' : 'text-xl md:text-2xl'}`}
        >
          {title}
        </h2>
        <div
          className={`h-px ${isPrimary ? 'w-16 bg-neutral-900' : 'w-12 bg-neutral-400'}`}
        />
      </div>
      <div className="space-y-6">
        <div
          className={`group border-l-2 pl-6 transition-colors duration-400 ${
            isPrimary
              ? 'border-neutral-900 hover:border-neutral-700'
              : 'border-neutral-400 hover:border-neutral-600'
          }`}
        >
          <p
            className={`font-mono text-xs leading-relaxed break-all transition-colors duration-400 select-all md:text-sm ${
              isPrimary ? 'text-neutral-700' : 'text-neutral-600'
            }`}
          >
            {token}
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={onCopy}
            className={`px-6 py-4 font-mono text-xs tracking-widest uppercase transition-colors duration-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 md:px-8 ${
              isPrimary
                ? 'border border-neutral-900 bg-neutral-900 text-neutral-50 hover:border-neutral-800 hover:bg-neutral-800'
                : 'border border-neutral-300 bg-neutral-50 text-neutral-900 hover:border-neutral-900 hover:bg-neutral-50'
            }`}
            aria-label={`Copy ${title.toLowerCase()} to clipboard`}
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={refreshing}
              className="border border-neutral-300 px-6 py-4 font-mono text-xs tracking-widest uppercase transition-colors duration-400 hover:border-neutral-900 hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 disabled:cursor-not-allowed disabled:opacity-50 md:px-8"
              aria-label="Refresh access token"
            >
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </button>
          )}
        </div>
      </div>
    </AnimatedSection>
  );
}
