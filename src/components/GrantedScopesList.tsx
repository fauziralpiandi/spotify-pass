import { AnimatedSection } from './AnimatedSection';

export function GrantedScopesList({ scopes }: { scopes: string[] }) {
  return (
    <AnimatedSection>
      <h4 className="font-mono text-xs tracking-widest text-neutral-500 uppercase">
        Granted Scopes
      </h4>
      <div
        className="max-h-[480px] space-y-2 overflow-y-auto pr-2"
        role="list"
        aria-label="Granted permission scopes"
      >
        {scopes.map((scope) => (
          <div
            key={scope}
            role="listitem"
            className="animate-fade-in border-l border-neutral-300 pl-4 opacity-0 transition-colors duration-400 hover:border-neutral-500"
          >
            <p className="font-mono text-xs text-neutral-700">{scope}</p>
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}
