import { useState } from 'react';
import { ChevronDown, MessageCircle, Phone } from 'lucide-react';
import { faqsData } from '../config/faqs';
import { businessConfig } from '../config/business';
import { sanitizeWhatsAppNumber } from '../utils/whatsapp';
import { Container } from './ui/Container';
import { Reveal } from './ui/Reveal';

export const FAQ = () => {
  const [openId, setOpenId] = useState<string | null>(faqsData[0]?.id ?? null);

  return (
    <section id="faqs" className="bg-white py-14 sm:py-16 lg:py-20">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-azure">FAQs</p>
            <h2 className="mt-4 max-w-[16ch] text-[27px] font-extrabold leading-[1.1] tracking-[-0.03em] text-navy sm:text-[34px] lg:text-[38px]">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 max-w-[38ch] text-[14.5px] leading-[1.7] text-muted">
              Find quick answers to common questions about our post-construction cleaning, project scheduling, and
              Toronto-area coverage.
            </p>

            <div className="mt-7 border-t border-navy/10 pt-5">
              <h3 className="text-[13.5px] font-bold text-navy">Still have a question?</h3>
              <div className="mt-2.5 flex flex-col gap-2">
                <a
                  href={`tel:${businessConfig.contact.phoneNumber}`}
                  className="inline-flex w-fit items-center gap-2 text-[13.5px] font-medium text-navy transition-colors hover:text-azure"
                >
                  <Phone className="h-3.5 w-3.5 text-azure" aria-hidden="true" />
                  {businessConfig.contact.phoneDisplay}
                </a>
                <a
                  href={`https://wa.me/${sanitizeWhatsAppNumber(businessConfig.contact.whatsappNumber)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-2 text-[13.5px] font-medium text-navy transition-colors hover:text-azure"
                >
                  <MessageCircle className="h-3.5 w-3.5 text-azure" aria-hidden="true" />
                  Message us on WhatsApp
                </a>
              </div>
            </div>
          </div>

          <Reveal className="lg:col-span-8">
            <div className="border-t border-navy/10">
              {faqsData.map((faq) => {
                const isOpen = openId === faq.id;
                const panelId = `faq-panel-${faq.id}`;
                const buttonId = `faq-button-${faq.id}`;

                return (
                  <div key={faq.id} className="border-b border-navy/10">
                    <h3>
                      <button
                        type="button"
                        id={buttonId}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpenId(isOpen ? null : faq.id)}
                        className="flex w-full items-start justify-between gap-6 py-4 text-left"
                      >
                        <span
                          className={`text-[15px] font-semibold leading-[1.4] transition-colors sm:text-[16px] ${
                            isOpen ? 'text-navy' : 'text-navy/85'
                          }`}
                        >
                          {faq.question}
                        </span>
                        <span
                          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors ${
                            isOpen ? 'border-azure bg-azure text-white' : 'border-navy/20 text-navy/70'
                          }`}
                          aria-hidden="true"
                        >
                          <ChevronDown
                            className={`h-3.5 w-3.5 transition-transform duration-300 ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </span>
                      </button>
                    </h3>

                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className="disclosure"
                      data-open={isOpen}
                    >
                      <div>
                        <p className="max-w-[66ch] pb-5 pr-10 text-[14px] leading-[1.75] text-muted">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};
