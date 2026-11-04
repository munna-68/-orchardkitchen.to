import React from 'react';
import BigTitle from '@/components/BigTitle';

/**
 * Shared opening for every inner page: giant word + script signature on the
 * left, one plain sentence and a single fact on the right.
 */
export default function PageHeader({
  lines,
  script,
  intro,
  fact,
  children,
}: {
  lines: string[];
  script: string;
  intro: React.ReactNode;
  fact?: { value: string; label: string };
  children?: React.ReactNode;
}) {
  return (
    <header className="relative paper-grid border-b border-line pt-28 sm:pt-32 pb-10 sm:pb-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end">
          <div className="lg:col-span-8 min-w-0">
            <BigTitle as="h1" lines={lines} script={script} align="left" size="page" trigger="load" />
          </div>
          <div className="lg:col-span-4 min-w-0 space-y-5 lg:pb-6">
            <p className="text-base sm:text-lg leading-relaxed text-forest-ink/80 max-w-md">{intro}</p>
            {fact && (
              <div className="flex items-end gap-3 border-t-2 border-forest pt-4">
                <span className="wide text-6xl text-forest">{fact.value}</span>
                <span className="text-sm font-semibold text-forest-ink/70 pb-1 max-w-[12rem] leading-snug">
                  {fact.label}
                </span>
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </header>
  );
}
