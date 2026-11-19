import React from 'react';
import { ArrowRight, Clock3, MapPin, MessageCircle, ShieldCheck, Sparkles, Building2 } from 'lucide-react';
import { businessConfig } from '../config/business';

interface HeroProps {
  onQuoteClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onQuoteClick }) => (
  <section id="home" className="relative overflow-hidden bg-[#F4F7FB] pt-[84px] sm:pt-[88px] md:pt-[96px]">
    <div className="absolute right-0 top-0 h-full w-[38%] bg-[#1348B8] opacity-100 hidden lg:block" />
    <div className="absolute right-[12%] top-0 h-64 w-64 rotate-45 border-[38px] border-[#0A2E73]/20 hidden lg:block" />

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center py-10 sm:py-14 md:py-16 lg:py-20">
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#DCE8FF] bg-white px-4 py-2 text-xs sm:text-sm font-bold text-[#0A2E73] shadow-sm">
            <Sparkles className="h-4 w-4 text-[#1348B8]" />
            <span>Post-Construction Cleaning Specialists</span>
          </div>

          <h1 className="text-[38px] min-[480px]:text-[46px] sm:text-[58px] lg:text-[66px] font-extrabold leading-[1.02] tracking-tight text-[#0A2E73]">
            A Cleaner Space.
            <span className="block text-[#0F172A]">A Better Standard.</span>
          </h1>

          <p className="flex items-center gap-2 text-base font-bold text-[#0A2E73]">
            <MapPin className="h-5 w-5 text-[#1348B8]" />
            Serving the Toronto Area
          </p>

          <p className="max-w-xl text-base sm:text-lg leading-relaxed text-[#475569]">
            We specialize in post-construction cleanups for new buildings, high-rise developments, townhouses, and large-scale residential projects.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={onQuoteClick}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1348B8] px-7 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-[#0A2E73] hover:-translate-y-0.5"
            >
              Get an Instant Quote
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href={`https://wa.me/${businessConfig.contact.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#0A2E73] px-7 py-4 text-base font-bold text-[#0A2E73] bg-white transition-colors hover:bg-[#EAF1FF]"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp Inquiry
            </a>
          </div>
        </div>

        <div className="lg:col-span-6 relative">
          <div className="absolute -right-5 -top-5 h-full w-full rotate-3 rounded-[28px] bg-[#0A2E73] hidden sm:block" />
          <div className="relative rounded-[24px] overflow-hidden border-[6px] border-white shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1400&q=88"
              alt="Professional post-construction cleaning in a bright modern property"
              className="h-[390px] sm:h-[480px] w-full object-cover"
            />
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0F172A]/25 to-transparent" />
          </div>
          <div className="absolute left-2 right-2 -bottom-5 sm:left-7 sm:right-auto flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2 rounded-2xl border border-white/70 bg-white/90 px-2.5 py-2 sm:px-3 sm:py-2.5 shadow-xl backdrop-blur-md">
            {['Post-Construction', 'High-Rise', 'Townhouse', '& Residential Builds'].map((tag) => (
              <span key={tag} className="inline-flex rounded-md sm:rounded-lg bg-[#F4F7FB] px-2 py-1 sm:px-2.5 sm:py-1.5 text-[9px] sm:text-xs font-bold text-[#0A2E73]">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-20 grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-t-2xl border border-white/70 bg-white/85 shadow-xl backdrop-blur-md -mb-px">
        {([
          { Icon: ShieldCheck, label: 'Vetted & Insured Staff' },
          { Icon: Clock3, label: 'Punctual Scheduling' },
          { Icon: Building2, label: 'Tailored Builder Scopes' },
          { Icon: MapPin, label: 'Serving Toronto & GTA' },
        ] as Array<{ Icon: React.ElementType; label: string }>).map(({ Icon, label }) => (
          <div key={label} className="flex min-h-[78px] items-center justify-center gap-2.5 px-3 text-center text-xs sm:text-sm font-bold text-[#0F172A] border-r border-slate-200/70 last:border-r-0">
            <Icon className="h-5 w-5 text-[#1348B8] flex-shrink-0" />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);
