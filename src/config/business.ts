/**
 * CENTRAL BUSINESS CONFIGURATION
 * 
 * All components across the website consume this central configuration.
 */

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
}

export interface BusinessConfig {
  companyName: string;
  managingDirector: string;
  tagline: string;
  taglineSubtitle: string;
  shortDescription: string;
  location: {
    city: string;
    country: string;
    fullDisplay: string;
    suburbsServed: string[];
  };
  contact: {
    /**
     * International format without spaces or plus sign for wa.me links, e.g. "263771234567"
     * Keep as empty string or placeholder until the real number is provided.
     */
    whatsappNumber: string;
    whatsappDisplay: string;
    
    /**
     * Standard telephone display and tel: link format
     */
    phoneNumber: string;
    phoneDisplay: string;
    
    /**
     * Official business contact email
     */
    email: string;
    
    /**
     * Physical office or depot address
     */
    physicalAddress: string;
  };
  operatingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
    note: string;
  };
  social: SocialLinks;
}

export const businessConfig: BusinessConfig = {
  companyName: "ID TID SERVICES INC.",
  managingDirector: "Innocent Chirombe",
  tagline: "Built Clean. Ready for What's Next.",
  taglineSubtitle: "Post-Construction Cleaning in the Toronto Area",
  shortDescription:
    "We specialize in post-construction cleanups for new buildings, high-rise developments, townhouses, and large-scale residential projects across the Toronto area.",
  location: {
    city: "Toronto",
    country: "Canada",
    fullDisplay: "Toronto Area, Ontario",
    suburbsServed: [
      "Toronto",
      "North York",
      "Scarborough",
      "Etobicoke",
      "Vaughan",
      "Richmond Hill",
      "Markham",
      "Greater Toronto Area"
    ],
  },
  contact: {
    whatsappNumber: "14372439114",
    whatsappDisplay: "+1 (437) 243-9114",
    
    // Telephone number
    phoneNumber: "+14372439114",
    phoneDisplay: "+1 (437) 243-9114",
    
    // Email address
    email: "accordancemabvuu@gmail.com",
    
    // Business address
    physicalAddress: "509-16 Carluke Cres, North York, Toronto, ON M2L 2H9",
  },
  operatingHours: {
    weekdays: "Monday – Friday: 7:30 AM – 5:30 PM",
    saturday: "Saturday: 8:00 AM – 3:00 PM",
    sunday: "Sunday: Available by prior appointment",
    note: "Flexible scheduling across the Toronto area",
  },
  social: {
    // Unset accounts are automatically hidden in the UI
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
  },
};

/**
 * Helper to check if WhatsApp number is configured with a valid numerical string
 */
export const isWhatsAppConfigured = (number: string): boolean => {
  const cleaned = number.replace(/[^0-9]/g, "");
  return cleaned.length >= 8 && !number.includes("EDIT_");
};

/**
 * Helper to check if Phone number is configured
 */
export const isPhoneConfigured = (number: string): boolean => {
  return Boolean(number && number.trim() !== "" && !number.includes("EDIT_"));
};

/**
 * Helper to check if Email is configured
 */
export const isEmailConfigured = (email: string): boolean => {
  return Boolean(email && email.includes("@") && !email.includes("EDIT_"));
};
