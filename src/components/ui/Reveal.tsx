import type { CSSProperties, ReactNode } from 'react';
import { useInView } from '../../hooks/useInView';

interface RevealProps {
  children: ReactNode;
  /** Stagger in milliseconds. */
  delay?: number;
  /** Fade only, with no vertical rise — used for photography. */
  fade?: boolean;
  className?: string;
}

/**
 * Wraps content in a one-shot entrance transition. The markup is always
 * present and readable; only opacity and a short offset animate, and the
 * reduced-motion styles in index.css remove both.
 */
export const Reveal = ({ children, delay = 0, fade = false, className = '' }: RevealProps) => {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`reveal ${fade ? 'reveal-fade' : ''} ${inView ? 'is-visible' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` } as unknown as CSSProperties}
    >
      {children}
    </div>
  );
};
