import React from 'react';
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { 
  businessConfig, 
  isWhatsAppConfigured, 
  isPhoneConfigured, 
  isEmailConfigured 
} from '../config/business';
import { sanitizeWhatsAppNumber } from '../utils/whatsapp';
import { QuoteForm } from './QuoteForm';

interface ContactProps {
  selectedService?: string;
}

export const Contact: React.FC<ContactProps> = ({ selectedService }) => {
  const whatsappAvailable = isWhatsAppConfigured(businessConfig.contact.whatsappNumber);
  const phoneAvailable = isPhoneConfigured(businessConfig.contact.phoneNumber);
  const emailAvailable = isEmailConfigured(businessConfig.contact.email);

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#F7F4EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF4FF] text-[#0A2E73] text-xs font-semibold tracking-wider uppercase">
            <span>Get In Touch</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2E73] tracking-tight font-heading">
            Ready for a Fresher Space?
          </h2>

          <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed">
            Tell us what you need cleaned. Get in touch with our team to discuss your requirements and request a quotation.
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Business Details & Contact Channels */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="bg-[#0A2E73] text-white p-8 rounded-3xl shadow-premium relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#1348B8]/30 rounded-full blur-2xl pointer-events-none" />

              <h3 className="text-2xl font-bold font-heading mb-2 text-white">
                Contact Information
              </h3>
              <p className="text-xs text-[#EEF4FF] mb-4">
                Managing Director: {businessConfig.managingDirector}
              </p>
              <p className="text-sm text-[#EEF4FF] mb-6">
                Connect directly with our Toronto-area team for fast quotation reviews and project bookings.
              </p>

              <div className="space-y-5">
                {/* WhatsApp Channel */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-[#DCE8FF]">
                    <MessageCircle className="w-5 h-5 text-[#DCE8FF]" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-bold tracking-wider text-[#EEF4FF]">WhatsApp</h4>
                    {whatsappAvailable ? (
                      <a
                        href={`https://wa.me/${sanitizeWhatsAppNumber(businessConfig.contact.whatsappNumber)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-white hover:text-[#DCE8FF] transition-colors inline-block mt-0.5"
                      >
                        {businessConfig.contact.whatsappDisplay || businessConfig.contact.whatsappNumber}
                      </a>
                    ) : (
                      <p className="text-xs text-white/70 mt-0.5 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-[#DCE8FF]" />
                        <span>{businessConfig.contact.whatsappDisplay}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Telephone Channel */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-[#DCE8FF]">
                    <Phone className="w-5 h-5 text-[#DCE8FF]" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-bold tracking-wider text-[#EEF4FF]">Telephone</h4>
                    {phoneAvailable ? (
                      <a
                        href={`tel:${businessConfig.contact.phoneNumber}`}
                        className="text-sm font-semibold text-white hover:text-[#DCE8FF] transition-colors inline-block mt-0.5"
                      >
                        {businessConfig.contact.phoneDisplay || businessConfig.contact.phoneNumber}
                      </a>
                    ) : (
                      <p className="text-xs text-white/70 mt-0.5 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-[#DCE8FF]" />
                        <span>{businessConfig.contact.phoneDisplay}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Email Channel */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-[#DCE8FF]">
                    <Mail className="w-5 h-5 text-[#DCE8FF]" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-bold tracking-wider text-[#EEF4FF]">Email Address</h4>
                    {emailAvailable ? (
                      <a
                        href={`mailto:${businessConfig.contact.email}`}
                        className="text-sm font-semibold text-white hover:text-[#DCE8FF] transition-colors inline-block mt-0.5"
                      >
                        {businessConfig.contact.email}
                      </a>
                    ) : (
                      <p className="text-xs text-white/70 mt-0.5">
                        {businessConfig.contact.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-[#DCE8FF]">
                    <MapPin className="w-5 h-5 text-[#DCE8FF]" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-bold tracking-wider text-[#EEF4FF]">Service Location</h4>
                    <p className="text-sm font-semibold text-white mt-0.5">
                      {businessConfig.location.fullDisplay}
                    </p>
                    <p className="text-xs text-[#EEF4FF] mt-0.5">
                      {businessConfig.contact.physicalAddress}
                    </p>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start gap-4 pt-2 border-t border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-[#DCE8FF]">
                    <Clock className="w-5 h-5 text-[#DCE8FF]" />
                  </div>
                  <div className="text-xs space-y-1">
                    <h4 className="text-xs uppercase font-bold tracking-wider text-[#EEF4FF]">Operating Hours</h4>
                    <p className="text-white/90">{businessConfig.operatingHours.weekdays}</p>
                    <p className="text-white/90">{businessConfig.operatingHours.saturday}</p>
                    <p className="text-[#DCE8FF]">{businessConfig.operatingHours.sunday}</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Toronto Area Coverage Tag Cloud */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-subtle space-y-3">
              <h4 className="text-sm font-bold text-[#0A2E73] uppercase tracking-wider font-heading flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1348B8]" />
                <span>Toronto Area Coverage</span>
              </h4>
              <p className="text-xs text-[#4B5563]">
                Our project cleaning teams serve new builds and residential developments throughout the Toronto area:
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {businessConfig.location.suburbsServed.map((suburb) => (
                  <span
                    key={suburb}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#F7F4EC] text-[#111827] border border-gray-200/70"
                  >
                    {suburb}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Functional Quote Form */}
          <div className="lg:col-span-7">
            <QuoteForm preselectedService={selectedService} />
          </div>

        </div>

      </div>
    </section>
  );
};
