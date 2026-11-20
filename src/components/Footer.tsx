import { ArrowUp, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { businessConfig } from '../config/business';
import { servicesData } from '../config/services';
import { primaryNavLinks } from '../config/navigation';
import { sanitizeWhatsAppNumber } from '../utils/whatsapp';
import { Container } from './ui/Container';

interface FooterProps {
  onSelectService: (serviceTitle: string) => void;
}

export const Footer = ({ onSelectService }: FooterProps) => (
  <footer className="bg-navy text-white">
    <Container className="pb-7 pt-12 sm:pt-14">
      <div className="grid grid-cols-1 gap-9 border-b border-white/15 pb-10 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3">
            <img
              src="/id-tid-logo.jpeg"
              alt=""
              width={48}
              height={48}
              loading="lazy"
              className="h-12 w-12 rounded-full bg-white object-contain"
            />
            <span className="leading-none">
              <span className="block text-[18px] font-extrabold tracking-[-0.02em]">ID TID</span>
              <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.2em] text-[#A9C4F0]">
                Services Inc.
              </span>
            </span>
          </div>
          <p className="mt-4 max-w-sm text-[13.5px] leading-[1.7] text-white/75">
            {businessConfig.tagline} Professional post-construction cleaning for new buildings, high-rise
            developments, townhouses, and large-scale residential projects across the GTA.
          </p>
        </div>

        <nav aria-label="Footer" className="lg:col-span-2">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A9C4F0]">Explore</h2>
          <ul className="mt-3 space-y-2 text-[13.5px] text-white/75">
            <li>
              <a href="#about" className="transition-colors hover:text-white">
                About us
              </a>
            </li>
            {primaryNavLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#contact" className="transition-colors hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A9C4F0]">Our services</h2>
          <ul className="mt-3 space-y-2 text-[13.5px] text-white/75">
            {servicesData.map((service) => (
              <li key={service.id}>
                <button
                  type="button"
                  onClick={() => onSelectService(service.title)}
                  className="text-left transition-colors hover:text-white"
                >
                  {service.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A9C4F0]">Contact</h2>
          <div className="mt-3 space-y-2.5 text-[13.5px] text-white/75">
            <a href={`tel:${businessConfig.contact.phoneNumber}`} className="flex items-start gap-2.5 transition-colors hover:text-white">
              <Phone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="tabular">{businessConfig.contact.phoneDisplay}</span>
            </a>
            <a
              href={`mailto:${businessConfig.contact.email}`}
              className="flex items-start gap-2.5 break-all transition-colors hover:text-white"
            >
              <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{businessConfig.contact.email}</span>
            </a>
            <a
              href={`https://wa.me/${sanitizeWhatsAppNumber(businessConfig.contact.whatsappNumber)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2.5 transition-colors hover:text-white"
            >
              <MessageCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>WhatsApp inquiry</span>
            </a>
            <p className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{businessConfig.contact.physicalAddress}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start justify-between gap-3 pt-6 pr-16 text-[12px] text-white/60 sm:flex-row sm:items-center sm:pr-32">
        <p>
          &copy; {new Date().getFullYear()} {businessConfig.companyName}. All rights reserved.
        </p>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
        >
          Back to top
          <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    </Container>
  </footer>
);
