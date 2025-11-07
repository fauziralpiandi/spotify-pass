import { AnimatedSection } from './AnimatedSection';
import { formatTime } from '../utils';

export function TokenSummary({
  tokenType,
  timeRemaining,
  grantedScopesCount,
  onReset,
}: {
  tokenType: string;
  timeRemaining: number;
  grantedScopesCount: number;
  onReset: () => void;
}) {
  return (
    <div className="space-y-12">
      <AnimatedSection>
        <div className="space-y-4">
          <h3 className="font-mono text-xs tracking-widest text-neutral-500 uppercase">
            Token Information
          </h3>
          <div className="h-px w-1/4 bg-neutral-300" />
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="font-mono text-xs text-neutral-500">Type</p>
            <p className="text-lg font-light">{tokenType}</p>
          </div>
          <div className="h-px bg-neutral-200" />
          <div className="space-y-2">
            <p className="font-mono text-xs text-neutral-500">Expires In</p>
            <p className="font-mono text-lg font-light">
              {formatTime(timeRemaining)}
            </p>
          </div>
          <div className="h-px bg-neutral-200" />
          <div className="space-y-2">
            <p className="font-mono text-xs text-neutral-500">Scopes Granted</p>
            <p className="text-lg font-light">{grantedScopesCount}</p>
          </div>
        </div>
      </AnimatedSection>

      <button
        onClick={onReset}
        className="w-full border border-neutral-400 bg-neutral-100 px-8 py-4 font-mono text-xs tracking-widest uppercase transition-colors duration-400 hover:border-neutral-900 hover:bg-neutral-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
        aria-label="Start new authorization flow"
      >
        New Authorization
      </button>
    </div>
  );
}
