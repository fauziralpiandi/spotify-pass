import { ReactNode } from 'react';

export function Layout({
  children,
  status,
  title,
  subtitle,
}: {
  children: ReactNode;
  status: 'ready' | 'active';
  title: string;
  subtitle: string;
}) {
  return (
    <>
      <svg
        focusable="false"
        aria-hidden="true"
        className="pointer-events-none fixed isolate z-50 h-full w-full mix-blend-soft-light"
      >
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1"
            numOctaves="5"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
      <div className="min-h-screen bg-neutral-50 text-neutral-900">
        <div className="mx-auto max-w-[1600px]">
          <header className="border-b border-neutral-200 px-8 py-12 md:px-12 lg:px-24">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="space-y-4">
                <h1 className="text-2xl font-medium tracking-tight md:text-3xl lg:text-4xl">
                  {title}
                </h1>
                <p className="font-mono text-xs tracking-widest text-neutral-500 uppercase">
                  {subtitle}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`size-2 rounded-full ${status === 'active' ? 'animate-pulse bg-green-500' : 'bg-neutral-500'}`}
                />
                <p className="font-mono text-xs tracking-wider text-neutral-600 uppercase">
                  {status === 'active' ? 'Active' : 'Ready'}
                </p>
              </div>
            </div>
          </header>

          <main className="grid grid-cols-1 lg:grid-cols-12 lg:divide-x">
            {children}
          </main>

          <footer className="border-t border-neutral-200 p-8 md:p-12 lg:p-24">
            <p className="text-sm text-neutral-500">
              &copy; {new Date().getFullYear()} Fauzira Alpiandi
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}
