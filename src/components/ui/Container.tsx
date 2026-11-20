import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/** Shared page gutter: one width and one rhythm for every section. */
export const Container = ({ children, className = '' }: ContainerProps) => (
  <div className={`mx-auto w-full max-w-content px-5 sm:px-8 lg:px-10 ${className}`}>
    {children}
  </div>
);
