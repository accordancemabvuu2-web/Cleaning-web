import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqsData } from '../config/faqs';

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(faqsData[0]?.id || null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faqs" className="py-16 sm:py-20 md:py-28 bg-white border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF4FF] text-[#0A2E73] text-xs font-semibold tracking-wider uppercase">
            <span>Got Questions?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2E73] tracking-tight font-heading">
            Frequently Asked Questions
          </h2>

          <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed">
            Find quick answers to common questions about our post-construction cleaning, project scheduling, and Toronto-area coverage.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqsData.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-[#1348B8]/30 bg-[#F7F4EC] shadow-sm'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-3 p-4 sm:p-6 text-left focus:outline-none focus:ring-2 focus:ring-[#1348B8] rounded-2xl"
                >
                  <span className="text-base sm:text-lg font-bold text-[#0A2E73] font-heading">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-[#1348B8] text-white rotate-180'
                        : 'bg-[#EEF4FF] text-[#0A2E73]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-[#111827] leading-relaxed border-t border-[#1348B8]/10 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
