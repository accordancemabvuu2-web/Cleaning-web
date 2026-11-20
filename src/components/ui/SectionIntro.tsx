import type { ReactNode } from 'react';

interface SectionIntroProps {
  /** Section name shown in the left rail. */
  label: string;
  title: ReactNode;
  description?: ReactNode;
  tone?: 'light' | 'dark';
  className?: string;
}

/**
 * Section opener: the section name sits in its own column alongside the
 * heading rather than as a badge stacked above it. Keeping the two on one
 * baseline gives every section the same structural grammar.
 */
export const SectionIntro = ({
  label,
  title,
  description,
  tone = 'light',
  className = '',
}: SectionIntroProps) => {
  const isDark = tone === 'dark';

  return (
    <div className={`grid grid-cols-1 gap-y-5 lg:grid-cols-12 lg:gap-x-10 ${className}`}>
      <div className="lg:col-span-3 lg:pt-2">
        <p
          className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${
            isDark ? 'text-[#A9C4F0]' : 'text-azure'
          }`}
        >
          {label}
        </p>
      </div>

      <div className="lg:col-span-9">
        <h2
          className={`max-w-[20ch] text-[28px] font-extrabold leading-[1.08] tracking-[-0.03em] sm:text-[36px] lg:text-[42px] ${
            isDark ? 'text-white' : 'text-navy'
          }`}
        >
          {title}
        </h2>

        {description ? (
          <p
            className={`mt-4 max-w-reading text-[15px] leading-[1.75] sm:text-base ${
              isDark ? 'text-white/80' : 'text-muted'
            }`}
          >
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
};
