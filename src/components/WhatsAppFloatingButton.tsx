import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { businessConfig, isWhatsAppConfigured } from '../config/business';
import { sanitizeWhatsAppNumber } from '../utils/whatsapp';

interface WhatsAppFloatingButtonProps {
  onQuoteClick: () => void;
}

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({ onQuoteClick }) => {
  const [showTooltip, setShowTooltip] = useState(true);
  const isConfigured = isWhatsAppConfigured(businessConfig.contact.whatsappNumber);

  const handleClick = (e: React.MouseEvent) => {
    if (!isConfigured) {
      e.preventDefault();
      onQuoteClick();
    }
  };

  const targetHref = isConfigured
    ? `https://wa.me/${sanitizeWhatsAppNumber(businessConfig.contact.whatsappNumber)}?text=${encodeURIComponent(
        `Hello ${businessConfig.companyName}, I would like to inquire about your post-construction cleaning services in the Toronto area.`
      )}`
    : '#contact';

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="mb-2 bg-white text-[#111827] text-xs font-medium py-2 px-3.5 rounded-2xl shadow-elevated border border-gray-100 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-xs">
          <span>Need quick cleaning quote? Chat on WhatsApp!</span>
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="text-gray-400 hover:text-gray-600 p-0.5"
            aria-label="Close message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Circular Action Button */}
      <a
        href={targetHref}
        onClick={handleClick}
        target={isConfigured ? '_blank' : undefined}
        rel={isConfigured ? 'noopener noreferrer' : undefined}
        className="w-14 h-14 rounded-full bg-[#1348B8] hover:bg-[#0A2E73] text-white flex items-center justify-center shadow-elevated hover:shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-[#DCE8FF]"
        aria-label="Direct WhatsApp contact"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#1348B8] border-2 border-white animate-pulse" />
        <MessageCircle className="w-7 h-7 fill-white/20 text-white" />
      </a>
    </div>
  );
};
