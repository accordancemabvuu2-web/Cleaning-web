import React from 'react';
import { ArrowRight, CheckCircle2, Shield, HeartHandshake, Eye } from 'lucide-react';
import { businessConfig } from '../config/business';

interface AboutProps {
  onQuoteClick: () => void;
}

export const About: React.FC<AboutProps> = ({ onQuoteClick }) => {
  const pillars = [
    {
      title: "Customer-Focused Approach",
      description: "We listen carefully to your instructions, respecting your privacy and specific household or workplace requirements.",
      icon: HeartHandshake,
    },
    {
      title: "Commitment to Quality",
      description: "Consistent standard operating checklists ensure every visit leaves surfaces, fixtures, and floors pristine.",
      icon: Shield,
    },
    {
      title: "Attention to Detail",
      description: "We focus on the subtle areas others overlook — corners, skirting boards, grout lines, and high-frequency touchpoints.",
      icon: Eye,
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-[#F7F4EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Authentic Photography & Accent Badge */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Primary Image Container with elegant borders and shadow */}
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-premium border-2 border-white bg-white">
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80"
                  alt="Professional cleaning specialist carefully maintaining a clean interior"
                  className="w-full h-[420px] sm:h-[480px] object-cover object-center transform hover:scale-102 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Overlay card */}
                <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-subtle border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0A2E73] text-white flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0A2E73]">Pristine Quality Standard</h4>
                      <p className="text-xs text-[#4B5563]">Every room, corner, and surface given dedicated care.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative accent element */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-[#1348B8] rounded-tl-2xl pointer-events-none -z-10 opacity-70" />
            </div>
          </div>

          {/* Right Column: Company Story & Value Pillars */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF4FF] text-[#0A2E73] text-xs font-semibold tracking-wider uppercase">
              <span>About ID TID</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2E73] tracking-tight font-heading leading-tight">
              More Than Cleaning. <br />
              <span className="text-[#1348B8]">We Care About Your Space.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#111827] leading-relaxed">
              At <strong className="font-semibold text-[#0A2E73]">{businessConfig.companyName}</strong>, we help builders, developers, and property teams present completed spaces at their very best. Our post-construction cleaning is tailored to the demands of new buildings and large residential projects across the Toronto area.
            </p>

            <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
              From high-rise developments to townhouse communities, our objective is simple: remove the dust, residue, and finishing details that stand between a completed build and a confident handover.
            </p>

            {/* Core Value Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 pb-2">
              {pillars.map((pillar) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="p-4 rounded-2xl bg-white border border-gray-100/80 shadow-subtle hover:shadow-md transition-shadow"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#EEF4FF] text-[#0A2E73] flex items-center justify-center mb-3">
                      <IconComponent className="w-5 h-5 text-[#1348B8]" />
                    </div>
                    <h3 className="text-sm font-bold text-[#0A2E73] mb-1.5 font-heading">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-[#4B5563] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Request a Quote CTA */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onQuoteClick}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold text-white bg-[#1348B8] hover:bg-[#0A2E73] shadow-subtle hover:shadow transition-all duration-200"
              >
                <span>Request a Quote for Your Space</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
