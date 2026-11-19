/**
 * Formats a phone number for WhatsApp wa.me links.
 * Strips out '+', spaces, dashes, and brackets.
 * Canadian 10-digit numbers are normalized to 1xxxxxxxxxx.
 */
export function sanitizeWhatsAppNumber(num: string): string {
  let cleaned = (num || "").replace(/[^0-9]/g, "");
  if (cleaned.length === 10) {
    cleaned = "1" + cleaned;
  }
  return cleaned;
}

export interface QuoteFormData {
  fullName: string;
  phoneNumber: string;
  email?: string;
  service: string;
  propertyType: 'Residential' | 'Commercial';
  location: string;
  preferredDate?: string;
  message?: string;
}

/**
 * Builds a clean, professional, readable WhatsApp text message for the quote request
 */
export function buildWhatsAppQuoteMessage(data: QuoteFormData, companyName: string): string {
  const lines: string[] = [
    `*NEW CLEANING QUOTATION REQUEST*`,
    `To: ${companyName}`,
    `--------------------------------`,
    `*Customer Name:* ${data.fullName}`,
    `*Phone Number:* ${data.phoneNumber}`,
  ];

  if (data.email && data.email.trim() !== '') {
    lines.push(`*Email:* ${data.email.trim()}`);
  }

  lines.push(`*Service Requested:* ${data.service}`);
  lines.push(`*Property Type:* ${data.propertyType}`);
  lines.push(`*Location / Suburb:* ${data.location}`);

  if (data.preferredDate && data.preferredDate.trim() !== '') {
    lines.push(`*Preferred Date:* ${data.preferredDate}`);
  }

  if (data.message && data.message.trim() !== '') {
    lines.push(`*Additional Details:* ${data.message.trim()}`);
  }

  lines.push(`--------------------------------`);
  lines.push(`Sent via ${companyName} website request.`);

  return lines.join('\n');
}

/**
 * Constructs the final wa.me URL. Returns null if whatsappNumber is not configured.
 */
export function createWhatsAppUrl(rawNumber: string, message: string): string | null {
  const cleaned = sanitizeWhatsAppNumber(rawNumber);
  if (!cleaned || cleaned.length < 8) {
    return null;
  }
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${cleaned}?text=${encoded}`;
}
