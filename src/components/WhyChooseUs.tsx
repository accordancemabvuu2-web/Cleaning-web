import {
  Sparkles,
  ShieldCheck,
  CalendarClock,
  Building2,
  HeartHandshake,
  BadgeCheck,
} from 'lucide-react';
import type { ElementType } from 'react';
import { whyChooseUsData } from '../config/whyChooseUs';
import { Container } from './ui/Container';
import { Reveal } from './ui/Reveal';
import { SectionIntro } from './ui/SectionIntro';

const iconMap: Record<string, ElementType> = {
  Sparkles,
  ShieldCheck,
  CalendarClock,
  Building2,
  HeartHandshake,
  BadgeCheck,
};

export const WhyChooseUs = () => (
  <section id="why-us" className="bg-ivory py-14 sm:py-16 lg:py-20">
    <Container>
      <SectionIntro
        label="Why choose us"
        title="Why Choose ID TID?"
        description="We help Toronto-area builders and property teams achieve a consistent, handover-ready finish with dependable service and thorough attention to detail."
      />

      <Reveal className="mt-9 lg:mt-11">
        <div className="grid grid-cols-1 gap-x-12 border-t border-navy/10 sm:grid-cols-2">
          {whyChooseUsData.map((benefit) => {
            const Icon = iconMap[benefit.iconName] ?? Sparkles;
            return (
              <div key={benefit.id} className="border-b border-navy/10 py-5">
                <div className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4 shrink-0 text-azure" aria-hidden="true" />
                  <h3 className="text-[15.5px] font-bold text-navy">{benefit.title}</h3>
                </div>
                <p className="mt-2 max-w-[46ch] pl-[26px] text-[13.5px] leading-[1.7] text-muted">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </Reveal>
    </Container>
  </section>
);
