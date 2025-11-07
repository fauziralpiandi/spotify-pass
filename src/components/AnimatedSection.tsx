import { ReactNode } from 'react';

export function AnimatedSection({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`animate-fade-in space-y-8 opacity-0 ${className}`}>
      {children}
    </div>
  );
}
