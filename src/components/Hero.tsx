import { ArrowRight, MapPin, MessageCircle } from 'lucide-react';
import { businessConfig } from '../config/business';
import { images } from '../config/images';
import { sanitizeWhatsAppNumber } from '../utils/whatsapp';
import { Container } from './ui/Container';
import { Button } from './ui/Button';

interface HeroProps {
  onQuoteClick: () => void;
}

const projectTypes = [
  'New builds',
  'High-rise developments',
  'Townhouse communities',
  'Large residential projects',
];

/**
 * The first screen is intentionally not animated: it carries the headline and
 * the primary call to action, so it must be readable the moment it paints.
 */
export const Hero = ({ onQuoteClick }: HeroProps) => (
  <section id="home" className="bg-ivory pt-[68px] sm:pt-[76px]">
    <Container className="pb-9 pt-5 sm:pb-12 sm:pt-8 lg:pt-10">
      <div className="relative overflow-hidden bg-navyDeep">
        <img
          src={images.cleaningCrew.src}
          alt={images.cleaningCrew.alt}
          width={images.cleaningCrew.width}
          height={images.cleaningCrew.height}
          decoding="async"
          className="h-[244px] w-full object-cover object-[50%_62%] sm:h-[340px] lg:h-[420px]"
        />
      </div>

      {/* Caption surface attached to the photograph's lower-left edge */}
      <div className="relative z-10 mt-6 sm:-mt-16 sm:max-w-[520px] sm:bg-ivory sm:px-7 sm:py-7 sm:shadow-subtle lg:-mt-24 lg:max-w-[660px] lg:px-9 lg:py-9">
        <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-azure">
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          {businessConfig.location.fullDisplay}
        </p>

        <h1 className="mt-4 text-[31px] font-extrabold leading-[1.06] tracking-[-0.035em] text-navy sm:text-[40px] lg:text-[46px]">
          We clean new builds to handover standard.
        </h1>

        <p className="mt-4 max-w-[48ch] text-[15px] leading-[1.7] text-muted sm:text-base">
          {businessConfig.shortDescription}
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
          <Button size="lg" onClick={onQuoteClick}>
            Request a quotation
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>

          <a
            href={`https://wa.me/${sanitizeWhatsAppNumber(businessConfig.contact.whatsappNumber)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-azure"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp {businessConfig.contact.whatsappDisplay}
          </a>
        </div>
      </div>

      <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-2.5 border-t border-navy/[0.12] pt-5 sm:gap-x-8 lg:grid-cols-4">
        {projectTypes.map((type) => (
          <li key={type} className="text-[13px] font-medium text-navy/70">
            {type}
          </li>
        ))}
      </ul>
    </Container>
  </section>
);
