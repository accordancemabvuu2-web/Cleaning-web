# FreshSpace Cleaning Co. — Premium Single-Page Website

A modern, responsive single-page commercial website designed for **FreshSpace Cleaning Co.**, operating in Harare, Zimbabwe.

---

## 🌟 Brand Identity & Visual Language

- **Primary:** Forest Green (`#123D32`)
- **Secondary:** Sage Green (`#82A98B`)
- **Background:** Warm Ivory (`#F7F6F0`)
- **Surface:** Pure White (`#FFFFFF`)
- **Primary Text:** Charcoal (`#252C29`)
- **Accent:** Muted Gold (`#C5A66A`)
- **Typography:** Manrope (Headings) & Inter (Body)

---

## ⚙️ Central Business Configuration

All company details, phone numbers, WhatsApp numbers, email addresses, and service offerings are centralized in one file:

📁 **`src/config/business.ts`**

```ts
export const businessConfig: BusinessConfig = {
  companyName: "FreshSpace Cleaning Co.",
  tagline: "A Cleaner Space. A Better Standard.",
  location: {
    city: "Harare",
    country: "Zimbabwe",
    fullDisplay: "Harare, Zimbabwe",
    suburbsServed: ["Borrowdale", "Mount Pleasant", "Avondale", ...],
  },
  contact: {
    whatsappNumber: "263770000000", // International format without '+' or spaces
    whatsappDisplay: "+263 77 000 0000",
    phoneNumber: "+263 77 000 0000",
    phoneDisplay: "+263 77 000 0000",
    email: "info@freshspace.co.zw",
    physicalAddress: "Harare, Zimbabwe",
  },
  operatingHours: {
    weekdays: "Monday – Friday: 7:30 AM – 5:30 PM",
    saturday: "Saturday: 8:00 AM – 3:00 PM",
    sunday: "Sunday: By Appointment",
    note: "Flexible dispatch across Harare suburbs",
  },
  ...
};
```

---

## 🚀 WhatsApp Quotation Workflow

1. The customer selects their service (Residential, Commercial, Deep Cleaning, Move-In/Move-Out).
2. Fills in their name, contact phone, suburb location, preferred date, and details.
3. Clicks **"Send Quote Request"**.
4. The system validates all fields and constructs a formatted message:
   ```
   *NEW CLEANING QUOTATION REQUEST*
   To: FreshSpace Cleaning Co.
   --------------------------------
   *Customer Name:* Tendai Moyo
   *Phone Number:* +263 77 123 4567
   *Service Requested:* Residential Cleaning
   *Property Type:* Residential
   *Location / Suburb:* Borrowdale
   *Preferred Date:* 2026-11-20
   ...
   ```
5. Opens `https://wa.me/263...` directly in the user's WhatsApp.
6. If the WhatsApp number has not yet been configured in `src/config/business.ts`, the UI gracefully guides the user and displays the formatted message preview without creating broken links.

---

## 🛠️ Development & Production Commands

- **Development server:** `npm run dev`
- **Production build:** `npm run build`
- **Production preview:** `npm run preview`
