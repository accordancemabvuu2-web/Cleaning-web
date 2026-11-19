import React from 'react';
import { servicesData } from '../config/services';
import { ServiceCard } from './ServiceCard';

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="py-20 md:py-28 bg-white border-y border-gray-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF1FF] text-[#0A2E73] text-xs font-semibold tracking-wider uppercase">
            <span>Our Cleaning Solutions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2E73] tracking-tight font-heading">
            Built for the Final Stage of Your Project
          </h2>

          <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed">
            From single-unit turnarounds to large-scale residential developments, our crews deliver a clean, polished finish when your project is ready for what&apos;s next.
          </p>
        </div>

        {/* 4 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {servicesData.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onSelectService={onSelectService}
            />
          ))}
        </div>

        {/* Tailored Custom Solution Callout Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-[#F7F4EC] border border-[#1348B8]/15 shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-bold text-[#0A2E73] font-heading">
              Need a customized cleaning schedule or unique commercial scope?
            </h4>
            <p className="text-xs sm:text-sm text-[#4B5563]">
              We tailor team size, scheduling, and scope to your project requirements across the Toronto area.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onSelectService('Custom Cleaning Request')}
            className="flex-shrink-0 px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-[#1348B8] hover:bg-[#0A2E73] shadow transition-colors"
          >
            Discuss Custom Scope
          </button>
        </div>

      </div>
    </section>
  );
};
