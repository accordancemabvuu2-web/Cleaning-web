import { HeartHandshake, ShieldCheck, Eye } from 'lucide-react';
import type { ElementType } from 'react';
import { businessConfig } from '../config/business';
import { images } from '../config/images';
import { Container } from './ui/Container';
import { Reveal } from './ui/Reveal';
import { SectionIntro } from './ui/SectionIntro';

interface Pillar {
  title: string;
  description: string;
  Icon: ElementType;
}

const pillars: Pillar[] = [
  {
    title: 'Customer-Focused Approach',
    description: 'We listen carefully to your instructions, respecting your privacy and specific household or workplace requirements.',
    Icon: HeartHandshake,
  },
  {
    title: 'Commitment to Quality',
    description: 'Consistent standard operating checklists ensure every visit leaves surfaces, fixtures, and floors pristine.',
    Icon: ShieldCheck,
  },
  {
    title: 'Attention to Detail',
    description: 'We focus on the subtle areas others overlook — corners, skirting boards, grout lines, and high-frequency touchpoints.',
    Icon: Eye,
  },
];

export const About = () => (
  <section id="about" className="bg-white py-14 sm:py-16 lg:py-20">
    <Container>
      <SectionIntro
        label="About ID TID"
        title="More Than Cleaning. We Care About Your Space."
      />

      <div className="mt-9 grid grid-cols-1 gap-8 lg:mt-11 lg:grid-cols-12 lg:gap-10">
        <Reveal fade className="lg:col-span-5">
          <figure className="relative">
            <img
              src={images.residentialDevelopment.src}
              alt={images.residentialDevelopment.alt}
              width={images.residentialDevelopment.width}
              height={images.residentialDevelopment.height}
              loading="lazy"
              decoding="async"
              className="h-[300px] w-full object-cover object-[50%_42%] sm:h-[400px] lg:h-[452px]"
            />
          </figure>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <p className="max-w-reading text-[15px] leading-[1.75] text-ink sm:text-base">
              At <strong className="font-semibold text-navy">{businessConfig.companyName}</strong>, we help builders,
              developers, and property teams present completed spaces at their very best. Our post-construction
              cleaning is tailored to the demands of new buildings and large residential projects across the Toronto
              area.
            </p>

            <p className="mt-4 max-w-reading text-[14.5px] leading-[1.75] text-muted sm:text-[15px]">
              From high-rise developments to townhouse communities, our objective is simple: remove the dust, residue,
              and finishing details that stand between a completed build and a confident handover.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <ul className="mt-7 divide-y divide-navy/10 border-y border-navy/10">
              {pillars.map(({ title, description, Icon }) => (
                <li key={title} className="flex gap-4 py-4">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-azure" aria-hidden="true" />
                  <div>
                    <h3 className="text-[15px] font-bold text-navy">{title}</h3>
                    <p className="mt-1 max-w-[54ch] text-[13.5px] leading-[1.65] text-muted">{description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <dl className="mt-6 grid grid-cols-1 gap-3 text-[13px] sm:grid-cols-2">
            <div>
              <dt className="font-semibold uppercase tracking-[0.14em] text-navy/70">Managing director</dt>
              <dd className="mt-1 font-medium text-navy">{businessConfig.managingDirector}</dd>
            </div>
            <div>
              <dt className="font-semibold uppercase tracking-[0.14em] text-navy/70">Based in</dt>
              <dd className="mt-1 font-medium text-navy">{businessConfig.location.fullDisplay}</dd>
            </div>
          </dl>
        </div>
      </div>
    </Container>
  </section>
);
