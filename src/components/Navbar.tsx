import { useEffect, useState } from 'react';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import { businessConfig, isWhatsAppConfigured } from '../config/business';
import { primaryNavLinks, spiedSectionIds } from '../config/navigation';
import { sanitizeWhatsAppNumber } from '../utils/whatsapp';
import { useActiveSection } from '../hooks/useActiveSection';
import { Container } from './ui/Container';
import { Button, ButtonLink } from './ui/Button';

interface NavbarProps {
  onQuoteClick: () => void;
}

export const Navbar = ({ onQuoteClick }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeId = useActiveSection(spiedSectionIds);

  const whatsappHref = `https://wa.me/${sanitizeWhatsAppNumber(businessConfig.contact.whatsappNumber)}`;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b bg-ivory transition-[box-shadow,border-color] duration-300 ${
          isScrolled
            ? 'border-navy/10 shadow-[0_12px_28px_-26px_rgba(10,46,115,0.55)]'
            : 'border-navy/[0.06]'
        }`}
      >
        <Container className="flex h-[68px] items-center justify-between gap-4 sm:h-[76px]">
          <a
            href="#home"
            className="flex shrink-0 items-center gap-2.5"
            aria-label={`${businessConfig.companyName} — back to top`}
          >
            <img
              src="/id-tid-logo.jpeg"
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-contain"
            />
            <span className="leading-none">
              <span className="block text-[17px] font-extrabold tracking-[-0.02em] text-navy sm:text-[19px]">
                ID TID
              </span>
              <span className="mt-1 block text-[8px] font-bold uppercase tracking-[0.2em] text-navy/70 sm:text-[9px]">
                Services Inc.
              </span>
            </span>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {primaryNavLinks.map((link) => {
              const isActive = activeId === link.sectionId;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative py-1 text-[13.5px] font-medium transition-colors ${
                    isActive ? 'text-navy' : 'text-navy/75 hover:text-navy'
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-azure transition-transform duration-300 ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button onClick={onQuoteClick} className="hidden sm:inline-flex">
              Request a quotation
            </Button>
            <Button onClick={onQuoteClick} size="md" className="px-3 py-2 text-[13px] sm:hidden">
              Get a quote
            </Button>

            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isMenuOpen}
              className="-mr-1 rounded-lg p-2 text-navy lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </Container>
      </header>

      {isMenuOpen ? (
        <div className="fixed inset-0 z-[70] flex flex-col bg-ivory lg:hidden" role="dialog" aria-modal="true" aria-label="Site menu">
          <div className="flex h-[68px] shrink-0 items-center justify-between border-b border-navy/10 px-5 sm:h-[76px] sm:px-8">
            <span className="text-[17px] font-extrabold tracking-[-0.02em] text-navy">ID TID Services Inc.</span>
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close navigation menu"
              className="-mr-2 rounded-lg p-2 text-navy"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-4 sm:px-8">
            {primaryNavLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between border-b border-navy/10 py-4 text-[19px] font-semibold text-navy"
              >
                {link.label}
                <span aria-hidden="true" className="text-navy/30">→</span>
              </a>
            ))}
            <a
              href="#about"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between border-b border-navy/10 py-4 text-[19px] font-semibold text-navy"
            >
              About us
              <span aria-hidden="true" className="text-navy/30">→</span>
            </a>
          </nav>

          <div className="shrink-0 space-y-3 border-t border-navy/10 px-5 py-5 sm:px-8">
            <ButtonLink href={`tel:${businessConfig.contact.phoneNumber}`} variant="outline" className="w-full">
              <Phone className="h-4 w-4" />
              {businessConfig.contact.phoneDisplay}
            </ButtonLink>

            {isWhatsAppConfigured(businessConfig.contact.whatsappNumber) ? (
              <ButtonLink
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                className="w-full"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp the team
              </ButtonLink>
            ) : null}

            <Button
              size="lg"
              className="w-full"
              onClick={() => {
                setIsMenuOpen(false);
                onQuoteClick();
              }}
            >
              Request a quotation
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
};
