import { ArrowUpRight } from 'lucide-react';
import { CUSTOM_SCOPE_LABEL, servicesData } from '../config/services';
import { images } from '../config/images';
import { Container } from './ui/Container';
import { Reveal } from './ui/Reveal';
import { ServiceRow } from './ServiceRow';

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

export const Services = ({ onSelectService }: ServicesProps) => (
  <section id="services" className="bg-white py-14 sm:py-16 lg:py-20">
    <Container>
      <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-12 lg:items-start lg:gap-x-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-azure lg:col-span-3 lg:pt-2">
          Our cleaning solutions
        </p>

        <div className="lg:col-span-5">
          <h2 className="max-w-[24ch] text-[27px] font-extrabold leading-[1.1] tracking-[-0.03em] text-navy sm:text-[34px] lg:text-[38px]">
            Built for the Final Stage of Your Project
          </h2>
          <p className="mt-4 max-w-[46ch] text-[15px] leading-[1.7] text-muted sm:text-base">
            From single-unit turnarounds to large-scale residential developments, our crews deliver a clean, polished
            finish when your project is ready for what&apos;s next.
          </p>
        </div>

        <Reveal fade className="lg:col-span-4">
          <img
            src={images.handoverKeys.src}
            alt={images.handoverKeys.alt}
            width={images.handoverKeys.width}
            height={images.handoverKeys.height}
            loading="lazy"
            decoding="async"
            className="h-[172px] w-full max-w-[440px] object-cover object-center sm:h-[196px] lg:h-[214px] lg:max-w-none"
          />
        </Reveal>
      </div>

      <Reveal className="mt-9 border-t border-navy/10 lg:mt-11" delay={40}>
        <div>
          {servicesData.map((service) => (
            <ServiceRow key={service.id} service={service} onSelect={onSelectService} />
          ))}
        </div>
      </Reveal>

      <Reveal delay={60}>
        <div className="flex flex-col gap-3 border-b border-navy/10 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <div>
            <h3 className="text-[15px] font-bold text-navy">
              Need a customized cleaning schedule or unique commercial scope?
            </h3>
            <p className="mt-1 max-w-[62ch] text-[13px] leading-[1.6] text-muted">
              We tailor team size, scheduling, and scope to your project requirements across the Toronto area.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onSelectService(CUSTOM_SCOPE_LABEL)}
            className="inline-flex shrink-0 items-center gap-1.5 self-start text-[13px] font-semibold text-azure transition-colors hover:text-navy sm:self-auto"
          >
            Discuss custom scope
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </Reveal>
    </Container>
  </section>
);
