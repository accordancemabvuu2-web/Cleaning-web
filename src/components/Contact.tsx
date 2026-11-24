import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { businessConfig, isEmailConfigured, isWhatsAppConfigured } from '../config/business';
import { sanitizeWhatsAppNumber } from '../utils/whatsapp';
import { Container } from './ui/Container';
import { Reveal } from './ui/Reveal';
import { QuoteForm } from './QuoteForm';

interface ContactProps {
  selectedService?: string;
}

const termClass =
  'flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy/70';
const valueClass = 'mt-1.5 pl-[22px]';
export const Contact = ({ selectedService }: ContactProps) => {
  const whatsappAvailable = isWhatsAppConfigured(businessConfig.contact.whatsappNumber);
  const emailAvailable = isEmailConfigured(businessConfig.contact.email);

  return (
    <section id="contact" className="bg-ivory py-14 sm:py-16 lg:py-20">
      <Container>
        <div className="grid grid-cols-1 gap-y-5 lg:grid-cols-12 lg:gap-x-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-azure lg:col-span-3 lg:pt-2">
            Get in touch
          </p>
          <div className="lg:col-span-9">
            <h2 className="max-w-[24ch] text-[27px] font-extrabold leading-[1.08] tracking-[-0.03em] text-navy sm:text-[34px] lg:text-[38px]">
              Ready for a Fresher Space?
            </h2>
            <p className="mt-4 max-w-[52ch] text-[15px] leading-[1.7] text-muted sm:text-base">
              Tell us what you need cleaned. Get in touch with our team to discuss your requirements and request a
              quotation.
            </p>
          </div>
        </div>

        <div className="mt-9 grid grid-cols-1 gap-8 lg:mt-11 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <h3 className="text-[15px] font-bold text-navy">Direct contact</h3>

              <dl className="mt-3 divide-y divide-navy/10 border-y border-navy/10">
                <div className="py-3.5">
                  <dt className={termClass}>
                    <Phone className="h-3.5 w-3.5 shrink-0 text-azure" aria-hidden="true" />
                    Telephone
                  </dt>
                  <dd className={valueClass}>
                    <span className="flex flex-col gap-1">
                      <a
                        href={`tel:${businessConfig.contact.secondaryPhoneNumber}`}
                        className="tabular text-[14px] font-semibold text-navy transition-colors hover:text-azure"
                      >
                        {businessConfig.contact.secondaryPhoneDisplay}
                      </a>
                      <a
                        href={`tel:${businessConfig.contact.phoneNumber}`}
                        className="tabular text-[14px] font-semibold text-navy transition-colors hover:text-azure"
                      >
                        {businessConfig.contact.phoneDisplay}
                      </a>
                    </span>
                  </dd>
                </div>

                {whatsappAvailable ? (
                  <div className="py-3.5">
                    <dt className={termClass}>
                      <MessageCircle className="h-3.5 w-3.5 shrink-0 text-azure" aria-hidden="true" />
                      WhatsApp
                    </dt>
                    <dd className={valueClass}>
                      <a
                        href={`https://wa.me/${sanitizeWhatsAppNumber(businessConfig.contact.whatsappNumber)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tabular text-[14px] font-semibold text-navy transition-colors hover:text-azure"
                      >
                        {businessConfig.contact.whatsappDisplay}
                      </a>
                    </dd>
                  </div>
                ) : null}

                {emailAvailable ? (
                  <div className="py-3.5">
                    <dt className={termClass}>
                      <Mail className="h-3.5 w-3.5 shrink-0 text-azure" aria-hidden="true" />
                      Email
                    </dt>
                    <dd className={`${valueClass} break-all`}>
                      <a
                        href={`mailto:${businessConfig.contact.email}`}
                        className="text-[14px] font-semibold text-navy transition-colors hover:text-azure"
                      >
                        {businessConfig.contact.email}
                      </a>
                    </dd>
                  </div>
                ) : null}

                <div className="py-3.5">
                  <dt className={termClass}>
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-azure" aria-hidden="true" />
                    Location
                  </dt>
                  <dd className={valueClass}>
                    <span className="block text-[14px] font-semibold text-navy">
                      {businessConfig.location.fullDisplay}
                    </span>
                    <span className="mt-0.5 block text-[13px] leading-[1.6] text-muted">
                      {businessConfig.contact.physicalAddress}
                    </span>
                  </dd>
                </div>

                <div className="py-3.5">
                  <dt className={termClass}>
                    <Clock className="h-3.5 w-3.5 shrink-0 text-azure" aria-hidden="true" />
                    Hours
                  </dt>
                  <dd className={`${valueClass} tabular text-[13px] leading-[1.7] text-muted`}>
                    {businessConfig.operatingHours.weekdays}
                    <br />
                    {businessConfig.operatingHours.saturday}
                    <br />
                    {businessConfig.operatingHours.sunday}
                  </dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={60}>
              <h3 className="mt-7 text-[15px] font-bold text-navy">Service area</h3>
              <p className="mt-1.5 text-[13px] leading-[1.6] text-muted">
                Our project cleaning teams serve new builds and residential developments throughout the Toronto area,
                including:
              </p>
              <p className="mt-2 text-[13px] leading-[1.9] text-navy/80">
                {businessConfig.location.suburbsServed.join(', ')}
              </p>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-7" delay={40}>
            <QuoteForm preselectedService={selectedService} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
};
