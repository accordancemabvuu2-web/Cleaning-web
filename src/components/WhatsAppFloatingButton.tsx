import type { MouseEvent } from 'react';
import { MessageCircle } from 'lucide-react';
import { businessConfig, isWhatsAppConfigured } from '../config/business';
import { sanitizeWhatsAppNumber } from '../utils/whatsapp';

interface WhatsAppFloatingButtonProps {
  onQuoteClick: () => void;
}

/**
 * Persistent WhatsApp route. It is a secondary contact option, so it stays
 * quieter than the quotation form: a labelled pill on desktop, a single
 * circular control on small screens.
 */
export const WhatsAppFloatingButton = ({ onQuoteClick }: WhatsAppFloatingButtonProps) => {
  const isConfigured = isWhatsAppConfigured(businessConfig.contact.whatsappNumber);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!isConfigured) {
      event.preventDefault();
      onQuoteClick();
    }
  };

  const targetHref = isConfigured
    ? `https://wa.me/${sanitizeWhatsAppNumber(businessConfig.contact.whatsappNumber)}?text=${encodeURIComponent(
        `Hello ${businessConfig.companyName}, I would like to inquire about your post-construction cleaning services in the Toronto area.`
      )}`
    : '#contact';

  return (
    <aside aria-label="Quick contact">
      <a
        href={targetHref}
        onClick={handleClick}
        target={isConfigured ? '_blank' : undefined}
        rel={isConfigured ? 'noopener noreferrer' : undefined}
        aria-label="Contact the team on WhatsApp"
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-navy px-4 py-3.5 text-[13px] font-semibold text-white shadow-elevated transition-colors hover:bg-azure sm:bottom-6 sm:right-6"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    </aside>
  );
};
