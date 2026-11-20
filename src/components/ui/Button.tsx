import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'outline' | 'onDark' | 'ghostOnDark';
export type ButtonSize = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-azure';

const sizes: Record<ButtonSize, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3.5 text-[15px]',
};

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-azure text-white hover:bg-navy focus-visible:ring-offset-ivory',
  outline: 'border border-navy/25 bg-transparent text-navy hover:border-navy hover:bg-navy hover:text-white focus-visible:ring-offset-ivory',
  onDark: 'bg-white text-navy hover:bg-azureSoft focus-visible:ring-white focus-visible:ring-offset-navy',
  ghostOnDark: 'border border-white/30 text-white hover:border-white hover:bg-white/10 focus-visible:ring-white focus-visible:ring-offset-navy',
};

export const buttonClass = (variant: ButtonVariant = 'primary', size: ButtonSize = 'md', extra = '') =>
  `${base} ${sizes[size]} ${variants[variant]} ${extra}`;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

export const Button = ({ variant = 'primary', size = 'md', className = '', children, ...rest }: ButtonProps) => (
  <button type={rest.type ?? 'button'} className={buttonClass(variant, size, className)} {...rest}>
    {children}
  </button>
);

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

export const ButtonLink = ({ variant = 'primary', size = 'md', className = '', children, ...rest }: ButtonLinkProps) => (
  <a className={buttonClass(variant, size, className)} {...rest}>
    {children}
  </a>
);
