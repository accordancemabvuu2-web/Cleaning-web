import { ArrowRight, MessageCircle } from 'lucide-react';
import { businessConfig } from '../config/business';
import { sanitizeWhatsAppNumber } from '../utils/whatsapp';
import { Container } from './ui/Container';
import { Reveal } from './ui/Reveal';
import { SectionIntro } from './ui/SectionIntro';
import { Button } from './ui/Button';

interface CleaningProcessProps {
  onQuoteClick: () => void;
}

const steps = [
  {
    title: 'Get in Touch',
    description: 'Contact us through WhatsApp, phone, or our online quote form and tell us what cleaning you need.',
  },
  {
    title: 'Discuss Your Requirements',
    description: 'Tell us about the project size, Toronto-area location, priority areas, and target handover date.',
  },
  {
    title: 'Request Your Quote',
    description: 'Receive a clear quotation and timeline based strictly on your tailored cleaning requirements.',
  },
];

export const CleaningProcess = ({ onQuoteClick }: CleaningProcessProps) => (
  <section id="process" className="bg-navy py-14 text-white sm:py-16 lg:py-20">
    <Container>
      <SectionIntro
        tone="dark"
        label="How it works"
        title="Getting Started Is Simple"
        description="Booking professional cleaning shouldn't be stressful. We make the inquiry process clear, friendly, and swift."
      />

      <Reveal className="mt-9 grid grid-cols-1 gap-x-10 gap-y-6 border-t border-white/20 pt-7 sm:grid-cols-3 lg:mt-11">
        {steps.map((step, index) => (
          <div key={step.title}>
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] tabular text-[#A9C4F0]">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-2.5 text-[18px] font-bold text-white">{step.title}</h3>
            <p className="mt-1.5 max-w-[38ch] text-[13.5px] leading-[1.7] text-white/75">{step.description}</p>
          </div>
        ))}
      </Reveal>

      <Reveal delay={80} className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <Button variant="onDark" size="lg" onClick={onQuoteClick}>
          Start your request
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
        <a
          href={`https://wa.me/${sanitizeWhatsAppNumber(businessConfig.contact.whatsappNumber)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Or message us on WhatsApp
        </a>
      </Reveal>
    </Container>
  </section>
);
