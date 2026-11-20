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
