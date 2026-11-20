import { ArrowUpRight, Check } from 'lucide-react';
import type { CleaningService } from '../config/services';

interface ServiceRowProps {
  service: CleaningService;
  onSelect: (serviceTitle: string) => void;
}

/**
 * One service in the solutions list. Photograph, name, description, scope and
 * action share a baseline separated by hairlines, so four services can be
 * compared without four near-identical cards competing for attention.
 *
 * Layout: compact two-column on small screens (thumbnail beside the name,
 * scope underneath), full twelve-column row from `lg` up.
 */
export const ServiceRow = ({ service, onSelect }: ServiceRowProps) => (
  <article className="group border-b border-navy/10 transition-colors duration-200 hover:bg-ivory/70">
    <div className="grid grid-cols-[72px_1fr] items-start gap-x-4 gap-y-3 py-5 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-4 lg:py-6">
      <div className="lg:col-span-2">
        <div className="h-[72px] w-[72px] overflow-hidden bg-navy/5 lg:h-[74px] lg:w-[104px]">
          <img
            src={service.image.src}
            alt={service.image.alt}
            width={service.image.width}
            height={service.image.height}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="lg:col-span-4">
        {service.badge ? (
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-azure/85">{service.badge}</p>
        ) : null}
        <h3 className="mt-1 text-[19px] font-bold leading-[1.25] text-navy sm:text-[20px]">{service.title}</h3>
        <p className="mt-1.5 max-w-[50ch] text-[14px] leading-[1.7] text-muted">{service.shortDescription}</p>
      </div>

      <ul className="col-span-2 grid grid-cols-1 gap-1.5 lg:col-span-3 lg:col-start-7">
        {service.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-[13px] leading-[1.5] text-navy/75">
            <Check className="mt-[3px] h-3.5 w-3.5 shrink-0 text-azure" aria-hidden="true" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="col-span-2 lg:col-span-3 lg:flex lg:justify-end">
        <button
          type="button"
          onClick={() => onSelect(service.title)}
          className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border border-navy/20 px-3 py-2 text-[13px] font-semibold text-navy transition-colors hover:border-azure hover:bg-azure hover:text-white"
        >
          Request service
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  </article>
);
