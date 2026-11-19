import React from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { CleaningService } from '../config/services';

interface ServiceCardProps {
  service: CleaningService;
  onSelectService: (serviceTitle: string) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelectService }) => {
  return (
    <div className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-subtle hover:shadow-premium transition-all duration-300 hover:-translate-y-1">
      {/* Service Photography Header */}
      <div className="relative h-56 sm:h-64 overflow-hidden bg-[#EAF1FF]">
        <img
          src={service.imageUrl}
          alt={service.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        
        {/* Badge */}
        {service.badge && (
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/95 backdrop-blur-md text-[#0A2E73] shadow-sm border border-white/50">
              {service.badge}
            </span>
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <h3 className="text-xl sm:text-2xl font-bold text-[#0A2E73] font-heading group-hover:text-[#1348B8] transition-colors">
            {service.title}
          </h3>

          <p className="text-sm text-[#4B5563] leading-relaxed">
            {service.shortDescription}
          </p>

          {/* Checklist bullets */}
          <ul className="pt-2 space-y-2 border-t border-gray-100">
            {service.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#111827]">
                <div className="w-4 h-4 rounded-full bg-[#EAF1FF] text-[#1348B8] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[#1348B8] stroke-[2.5]" />
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Button */}
        <div className="pt-6 mt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => onSelectService(service.title)}
            className="w-full inline-flex items-center justify-between px-5 py-3 rounded-xl text-sm font-bold text-[#0A2E73] bg-[#EAF1FF] hover:bg-[#1348B8] hover:text-white transition-all duration-200 group/btn"
          >
            <span>Request Service</span>
            <div className="w-7 h-7 rounded-full bg-white text-[#1348B8] flex items-center justify-center transition-all duration-200 shadow-xs">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
