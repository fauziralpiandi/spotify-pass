import { AnimatedSection } from './AnimatedSection';
import { SCOPES } from '../constants';

export function ScopePanel({
  selectedScopes,
  onToggleScope,
}: {
  selectedScopes: string[];
  onToggleScope: (value: string) => void;
}) {
  return (
    <div className="col-span-1 bg-neutral-100 px-8 py-16 md:px-12 md:py-24 lg:col-span-5">
      <AnimatedSection>
        <div className="space-y-4">
          <h3 className="font-mono tracking-widest text-neutral-500 uppercase">
            Scope Selection
          </h3>
          <div className="h-px bg-neutral-200" />
        </div>
        <p className="text-sm leading-relaxed text-neutral-500">
          Select permissions for this authorization
        </p>

        <div
          className="max-h-[600px] space-y-12 overflow-y-auto pr-2"
          role="group"
          aria-label="Spotify API permission scopes"
        >
          {Object.entries(SCOPES).map(([category, scopes]) => (
            <div key={category} className="space-y-6">
              <h4 className="border-l-2 border-neutral-800 pl-4 font-mono text-xs tracking-widest uppercase">
                {category}
              </h4>
              <div
                className="space-y-4"
                role="group"
                aria-label={`${category} permissions`}
              >
                {scopes.map((scope) => (
                  <label
                    key={scope.value}
                    className="group flex cursor-pointer items-start gap-4 transition-opacity duration-400 hover:opacity-80"
                  >
                    <input
                      type="checkbox"
                      checked={selectedScopes.includes(scope.value)}
                      onChange={() => {
                        onToggleScope(scope.value);
                      }}
                      className="size-4 cursor-pointer appearance-none border border-neutral-400 transition-colors duration-400 checked:bg-neutral-900 hover:border-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
                      aria-label={`${scope.label}: ${scope.description}`}
                    />
                    <div className="flex-1 space-y-2">
                      <p className="font-mono text-xs transition-colors duration-400 group-hover:text-neutral-700">
                        {scope.value}
                      </p>
                      <p className="text-xs leading-relaxed text-neutral-600">
                        {scope.description}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}
