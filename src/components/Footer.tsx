import React from 'react';
import { ArrowUp, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { businessConfig } from '../config/business';
import { servicesData } from '../config/services';

interface FooterProps {
  onSelectService: (serviceTitle: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectService }) => (
  <footer className="bg-[#0A2E73] text-white pt-12 sm:pt-14 pb-8 sm:pb-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 pb-10 border-b border-white/15">
        <div className="lg:col-span-4 space-y-5">
          <div className="flex items-center gap-3">
            <img src="/id-tid-logo.jpeg" alt="ID TID Services Inc." className="h-14 w-14 rounded-full bg-white object-contain" />
            <div>
              <div className="text-xl font-extrabold">ID TID</div>
              <div className="text-[10px] font-bold tracking-[0.16em] text-[#DCE8FF]">SERVICES INC.</div>
            </div>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/80">
            Professional post-construction cleaning for new buildings, high-rise developments, townhouses, and large-scale residential projects across the GTA.
          </p>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-sm font-bold text-[#DCE8FF] uppercase tracking-wider">Explore</h4>
          <ul className="space-y-2.5 text-sm text-white/80">
            <li><a href="#about" className="hover:text-white">About Us</a></li>
            <li><a href="#services" className="hover:text-white">Our Services</a></li>
            <li><a href="#why-us" className="hover:text-white">Why Choose Us</a></li>
            <li><a href="#projects" className="hover:text-white">Projects</a></li>
            <li><a href="#faqs" className="hover:text-white">FAQs</a></li>
            <li><a href="#contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-sm font-bold text-[#DCE8FF] uppercase tracking-wider">Our Services</h4>
          <ul className="space-y-2.5 text-sm text-white/80">
            {servicesData.map((service) => (
              <li key={service.id}>
                <button type="button" onClick={() => onSelectService(service.title)} className="text-left hover:text-white">
                  {service.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-sm font-bold text-[#DCE8FF] uppercase tracking-wider">Contact</h4>
          <div className="space-y-3 text-sm text-white/80">
            <a href="tel:+14372439114" className="flex items-start gap-2.5 hover:text-white">
              <Phone className="h-4 w-4 mt-0.5" /> <span>{businessConfig.contact.phoneDisplay}</span>
            </a>
            <a href={`mailto:${businessConfig.contact.email}`} className="flex items-start gap-2.5 hover:text-white break-all">
              <Mail className="h-4 w-4 mt-0.5 shrink-0" /> <span>{businessConfig.contact.email}</span>
            </a>
            <a href={`https://wa.me/${businessConfig.contact.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 hover:text-white">
              <MessageCircle className="h-4 w-4 mt-0.5" /> <span>WhatsApp Inquiry</span>
            </a>
            <div className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>{businessConfig.contact.physicalAddress}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/65">
        <p>&copy; {new Date().getFullYear()} {businessConfig.companyName}. All rights reserved.</p>
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2 hover:text-white">
          Back to top <ArrowUp className="h-4 w-4" />
        </button>
      </div>
    </div>
  </footer>
);
