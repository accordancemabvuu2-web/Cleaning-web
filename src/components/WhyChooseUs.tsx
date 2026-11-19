import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  CalendarClock, 
  Building2, 
  HeartHandshake, 
  BadgeCheck 
} from 'lucide-react';
import { whyChooseUsData } from '../config/whyChooseUs';

const iconMap: Record<string, React.ElementType> = {
  Sparkles,
  ShieldCheck,
  CalendarClock,
  Building2,
  HeartHandshake,
  BadgeCheck,
};

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-us" className="py-20 md:py-28 bg-[#F7F4EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF4FF] text-[#0A2E73] text-xs font-semibold tracking-wider uppercase">
            <span>Our Distinction</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2E73] tracking-tight font-heading">
            Why Choose ID TID?
          </h2>

          <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed">
            We help Toronto-area builders and property teams achieve a consistent, handover-ready finish with dependable service and thorough attention to detail.
          </p>
        </div>

        {/* 6 Benefit Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {whyChooseUsData.map((benefit) => {
            const IconComponent = iconMap[benefit.iconName] || Sparkles;
            return (
              <div
                key={benefit.id}
                className="group p-8 rounded-3xl bg-white border border-gray-100/90 shadow-subtle hover:shadow-premium transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#EEF4FF] text-[#0A2E73] flex items-center justify-center mb-6 group-hover:bg-[#1348B8] group-hover:text-white transition-colors duration-300 shadow-sm">
                  <IconComponent className="w-7 h-7" />
                </div>

                <h3 className="text-xl font-bold text-[#0A2E73] mb-3 font-heading">
                  {benefit.title}
                </h3>

                <p className="text-sm text-[#4B5563] leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
