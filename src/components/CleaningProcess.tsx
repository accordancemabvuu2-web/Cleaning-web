import React from 'react';
import { MessageSquareText, ClipboardList, CheckCircle2 } from 'lucide-react';

interface CleaningProcessProps {
  onQuoteClick: () => void;
}

export const CleaningProcess: React.FC<CleaningProcessProps> = ({ onQuoteClick }) => {
  const steps = [
    {
      stepNumber: "01",
      title: "Get in Touch",
      description: "Contact us through WhatsApp, phone, or our online quote form and tell us what cleaning you need.",
      icon: MessageSquareText,
    },
    {
      stepNumber: "02",
      title: "Discuss Your Requirements",
      description: "Tell us about the project size, Toronto-area location, priority areas, and target handover date.",
      icon: ClipboardList,
    },
    {
      stepNumber: "03",
      title: "Request Your Quote",
      description: "Receive a clear quotation and timeline based strictly on your tailored cleaning requirements.",
      icon: CheckCircle2,
    },
  ];

  return (
    <section id="process" className="py-16 sm:py-20 md:py-28 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF4FF] text-[#0A2E73] text-xs font-semibold tracking-wider uppercase">
            <span>Simple Workflow</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2E73] tracking-tight font-heading">
            Getting Started Is Simple
          </h2>

          <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed">
            Booking professional cleaning shouldn&apos;t be stressful. We make the inquiry process clear, friendly, and swift.
          </p>
        </div>

        {/* 3 Step Connected Cards */}
        <div className="relative">
          {/* Subtle horizontal connecting line on desktop */}
          <div className="hidden lg:block absolute top-1/2 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-[#DCE8FF] via-[#1348B8]/50 to-[#DCE8FF] -translate-y-8 -z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 relative z-10">
            {steps.map((step) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={step.stepNumber}
                  className="flex flex-col items-center text-center p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#F7F4EC] border border-gray-100 shadow-subtle hover:shadow-premium transition-all duration-300"
                >
                  {/* Numbered Pill & Icon Badge */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-white text-[#0A2E73] shadow-sm border border-[#1348B8]/30 flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-[#1348B8]" />
                    </div>
                    <span className="absolute -top-3 -right-3 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-[#0A2E73] text-white border-2 border-white shadow-xs">
                      STEP {step.stepNumber}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#0A2E73] mb-2 font-heading">
                    {step.title}
                  </h3>

                  <p className="text-sm text-[#4B5563] leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA trigger */}
        <div className="mt-14 text-center">
          <button
            type="button"
            onClick={onQuoteClick}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white bg-[#1348B8] hover:bg-[#0A2E73] shadow transition-colors"
          >
            Start Your Request Today
          </button>
        </div>

      </div>
    </section>
  );
};
