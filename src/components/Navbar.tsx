import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onQuoteClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onQuoteClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Our Services', href: '#services' },
    { name: 'Why Choose Us', href: '#why-us' },
    { name: 'Projects', href: '#projects' },
    { name: 'FAQs', href: '#faqs' },
  ];

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setIsMobileMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
          isScrolled ? 'shadow-md py-2.5' : 'py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <a
              href="#home"
              onClick={(event) => handleLinkClick(event, '#home')}
              className="flex items-center gap-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1348B8]"
            >
              <img src="/id-tid-logo.jpeg" alt="ID TID Services Inc. crest" className="h-12 w-12 object-contain sm:h-14 sm:w-14" />
              <div className="leading-none">
                <div className="text-[21px] sm:text-[24px] font-extrabold tracking-tight text-[#0A2E73]">ID TID</div>
                <div className="mt-1 text-[10px] font-bold tracking-[0.18em] text-[#475569]">SERVICES INC.</div>
              </div>
            </a>

            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(event) => handleLinkClick(event, link.href)}
                  className="text-sm font-semibold text-[#0F172A] transition-colors hover:text-[#1348B8]"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <button
              type="button"
              onClick={onQuoteClick}
              className="hidden sm:inline-flex items-center justify-center rounded-full bg-[#1348B8] px-6 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#0A2E73] hover:-translate-y-0.5"
            >
              Request a Quote
            </button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-lg p-2 text-[#0A2E73] lg:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <button
            type="button"
            aria-label="Close navigation menu"
            className="absolute inset-0 bg-[#0F172A]/40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-[86%] max-w-sm bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-5">
              <div className="flex items-center gap-2">
                <img src="/id-tid-logo.jpeg" alt="" className="h-11 w-11 object-contain" />
                <div>
                  <div className="font-extrabold text-[#0A2E73]">ID TID</div>
                  <div className="text-[9px] font-bold tracking-wider text-[#475569]">SERVICES INC.</div>
                </div>
              </div>
              <button type="button" onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
                <X className="h-6 w-6 text-[#475569]" />
              </button>
            </div>
            <nav className="space-y-1 py-5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(event) => handleLinkClick(event, link.href)}
                  className="block rounded-xl px-3 py-3 font-semibold text-[#0F172A] hover:bg-[#F4F7FB]"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onQuoteClick();
              }}
              className="w-full rounded-full bg-[#1348B8] px-5 py-3.5 font-bold text-white"
            >
              Request a Quote
            </button>
          </div>
        </div>
      )}
    </>
  );
};
