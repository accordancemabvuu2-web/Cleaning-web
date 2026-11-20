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

---

## Email Quotation Workflow

The quotation form submits JSON to `POST /api/contact`. A Cloudflare Worker validates the request, applies a basic per-IP rate limit and a honeypot check, then sends the enquiry through the Resend REST API.

The recipient is read by the Worker from the server-side `CONTACT_TO_EMAIL` variable. It defaults to `accordancemabvuu@gmail.com` when the variable is absent or invalid. The customer's email is used only as `Reply-To` after server-side validation.

### Resend setup

1. Create or sign in to a Resend account at `https://resend.com`.
2. Add and verify a sending domain, or initially use Resend's test sender. The test sender can normally deliver only to your verified Resend account email.
3. Create a Resend API key.
4. Choose a sender from your verified domain, for example `FreshSpace Enquiries <enquiries@example.com>`. Do not use a Gmail address as a custom sending domain.
5. Configure the secret in Cloudflare:
   ```powershell
   npx wrangler secret put RESEND_API_KEY
   ```
6. Set `RESEND_FROM_EMAIL` as a server-side environment variable (for example in the Cloudflare dashboard under Worker Settings > Variables and Secrets). Enter the exact verified sender value, such as `FreshSpace Enquiries <enquiries@example.com>`.
7. Set `CONTACT_TO_EMAIL` as a server-side plain-text variable. The provided `wrangler.toml` defaults it to `accordancemabvuu@gmail.com`; replace that value in `wrangler.toml` or the Cloudflare Worker Variables setting if the recipient changes.
8. If you use additional approved frontend origins, set `ALLOWED_ORIGINS` as a server-side variable. The live website is allowed automatically from its own origin.

Never put the API key in a `VITE_*` variable, source file, or Git commit.

### Local and production commands

```powershell
npm install
npm run build
npm run dev:worker
npx wrangler secret put RESEND_API_KEY
npm run deploy
```

`npm run dev:worker` builds the site and starts the Worker locally. `npm run deploy` builds and deploys the combined static site and API Worker. Use `npx wrangler deploy --dry-run` for a deployment package check.

For live verification, submit the form once and confirm an actual message is received at `accordancemabvuu@gmail.com`. Delivery cannot be confirmed from build or provider configuration alone.
