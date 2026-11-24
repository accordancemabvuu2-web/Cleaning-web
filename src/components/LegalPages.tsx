import type { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { businessConfig } from '../config/business';
import { Container } from './ui/Container';

export type LegalPageType = 'privacy' | 'terms' | 'cookies';

const pageMeta: Record<LegalPageType, { title: string; intro: string }> = {
  privacy: {
    title: 'Privacy Policy',
    intro: 'How ID TID Services collects, uses and protects personal information.',
  },
  terms: {
    title: 'Terms of Use',
    intro: 'Terms governing your use of this website and enquiries submitted through it.',
  },
  cookies: {
    title: 'Cookie Policy',
    intro: 'Information about cookies and similar technologies used on this website.',
  },
};

export const LegalPage = ({ type }: { type: LegalPageType }) => {
  const meta = pageMeta[type];

  return (
    <>
      <header className="border-b border-navy/10 bg-white">
        <Container className="flex h-20 items-center justify-between">
          <a href="/" className="flex items-center gap-3 rounded-md" aria-label="ID TID Services home">
            <img src="/id-tid-logo.jpeg" alt="" width={44} height={44} className="h-11 w-11 rounded-full" />
            <span className="text-[17px] font-extrabold text-navy">ID TID Services Inc.</span>
          </a>
          <a href="/" className="inline-flex items-center gap-2 text-[13px] font-semibold text-navy hover:text-azure">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to website
          </a>
        </Container>
      </header>

      <main id="main" className="py-12 sm:py-16">
        <Container>
          <article className="mx-auto max-w-[780px]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-azure">Legal information</p>
            <h1 className="mt-3 text-[34px] font-extrabold leading-[1.08] text-navy sm:text-[42px]">{meta.title}</h1>
            <p className="mt-4 max-w-[56ch] text-[16px] leading-[1.7] text-muted">{meta.intro}</p>

            {type === 'privacy' ? <PrivacyContent /> : null}
            {type === 'terms' ? <TermsContent /> : null}
            {type === 'cookies' ? <CookiesContent /> : null}

            <nav aria-label="Related legal pages" className="mt-10 flex flex-wrap gap-x-5 gap-y-2 border-t border-navy/10 pt-5 text-[13px] font-semibold text-navy">
              <a href="/privacy" className="hover:text-azure hover:underline">Privacy Policy</a>
              <a href="/terms" className="hover:text-azure hover:underline">Terms of Use</a>
              <a href="/cookies" className="hover:text-azure hover:underline">Cookie Policy</a>
            </nav>
          </article>
        </Container>
      </main>
    </>
  );
};

const updated = 'Last updated: November 24, 2026';

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="mt-9">
    <h2 className="text-[21px] font-bold text-navy">{title}</h2>
    <div className="mt-3 space-y-3 text-[15px] leading-[1.75] text-muted [&_a]:font-semibold [&_a]:text-navy [&_a]:underline">
      {children}
    </div>
  </section>
);

const PrivacyContent = () => (
  <>
    <p className="mt-6 text-[12px] text-muted">{updated}</p>
    <Section title="Who is responsible for this information">
      <p>{businessConfig.companyName} is responsible for personal information collected through this website and submitted enquiries.</p>
      <p>Privacy questions or requests can be sent to <a href={`mailto:${businessConfig.contact.email}`}>{businessConfig.contact.email}</a>, or by telephone at <a href={`tel:${businessConfig.contact.phoneNumber}`}>{businessConfig.contact.phoneDisplay}</a>.</p>
    </Section>
    <Section title="Information we collect">
      <p>Our quotation form may collect your name, telephone number, email address, service interest, property type, project location, preferred date and project details.</p>
      <p>We collect only information reasonably needed to assess and respond to an enquiry. Providing an email address is optional; phone contact is used when an inquiry cannot be handled effectively by email alone.</p>
    </Section>
    <Section title="How we use information">
      <p>We use enquiry information to respond to prospective customers, clarify requirements, prepare quotations, arrange initial discussions and maintain a record of the communication. We do not automatically add visitors to a marketing list or use submitted information for unrelated marketing.</p>
      <p>Submitting the quotation form is not consent to receive marketing messages. If a separate marketing email option is offered in the future, it will require optional, unticked consent rather than being bundled with an enquiry.</p>
    </Section>
    <Section title="Electronic marketing">
      <p>We do not currently send marketing email or newsletters from this website. Any future commercial electronic messages must comply with Canada's Anti-Spam Legislation (CASL), including applicable consent requirements, identification information and unsubscribe mechanisms where required.</p>
    </Section>
    <Section title="Service providers and processing outside Canada">
      <p>This website is hosted using Cloudflare. Form submissions are sent to a Cloudflare Worker and delivered through Resend, which acts as an email infrastructure provider. These providers process information on our behalf and may store or process it outside Canada, including in the United States or other jurisdictions.</p>
      <p>We do not sell personal information. Information may be disclosed to our providers or professionals where required to operate or secure the service, or as otherwise permitted or required by law.</p>
    </Section>
    <Section title="Storage and protection">
      <p>Enquiry information is transmitted over HTTPS and delivered to the business by email. We use provider controls and limited-access handling where available. The website is not designed as a repository for customer records and does not deliberately retain submissions in a separate database.</p>
      <p>No system is completely secure. We ask visitors not to include unnecessary sensitive financial, identity or health information in messages.</p>
    </Section>
    <Section title="Retention">
      <p>Enquiry correspondence is retained only as reasonably necessary to respond to the request, manage related business communications, meet accounting or legal obligations, and resolve disputes. Retention periods may vary according to the communication and applicable legal requirements.</p>
    </Section>
    <Section title="Your choices and requests">
      <p>Subject to applicable law and appropriate identity verification, you may ask to access or correct personal information, or request deletion of information that is no longer needed. We may need to retain certain information where required or permitted by law, or to preserve a record of a completed enquiry.</p>
      <p>Send an access, correction or deletion request to <a href={`mailto:${businessConfig.contact.email}`}>{businessConfig.contact.email}</a>. We may ask for limited information to confirm the request and your identity.</p>
    </Section>
    <Section title="Applicable law">
      <p>This policy is designed for Canadian federal and Ontario privacy requirements, including PIPEDA where it applies, and Ontario consumer and accessibility requirements. Additional rights may apply depending on the circumstances and province or territory. This general notice should be reviewed by qualified legal counsel for final compliance confirmation.</p>
    </Section>
  </>
);

const TermsContent = () => (
  <>
    <p className="mt-6 text-[12px] text-muted">{updated}</p>
    <Section title="Website use">
      <p>You may use this website for lawful purposes and to make genuine enquiries about cleaning services. You must not misuse the website, attempt unauthorized access, disrupt availability, transmit harmful code, scrape against technical controls, or submit false, abusive or unlawful information.</p>
    </Section>
    <Section title="Informational service descriptions">
      <p>Descriptions, examples and process summaries are general information. They do not guarantee that a particular scope, finish or outcome is suitable for every property. Service availability and access requirements must be confirmed directly with the company.</p>
    </Section>
    <Section title="Enquiries and quotations">
      <p>Submitting a quotation request does not reserve a date, create a service contract or confirm a booking. Any final scope, price, service date, access arrangements and special conditions must be agreed separately by the company and customer.</p>
      <p>A quotation may be subject to a site review and confirmation. The company may decline or revise an enquiry when circumstances or the requested scope are unclear.</p>
    </Section>
    <Section title="Accuracy and availability">
      <p>We aim to keep information accurate and available, but may update, suspend or remove content without notice. Nothing on this website constitutes a guarantee of uninterrupted availability or absolute accuracy.</p>
    </Section>
    <Section title="Intellectual property">
      <p>Unless otherwise stated, website text, branding, images and layout are owned by or licensed to {businessConfig.companyName}. You may view and print a single copy for personal use but may not commercially reproduce or redistribute website content without permission.</p>
    </Section>
    <Section title="External links">
      <p>The website may provide links to email, telephone, WhatsApp or other third-party services. We are not responsible for third-party services or their own terms and privacy practices.</p>
    </Section>
    <Section title="Limitation of liability">
      <p>To the maximum extent permitted by law, the company is not liable for indirect, incidental or consequential losses arising from use of or inability to use this website. Nothing in these terms excludes or limits rights or remedies that cannot legally be excluded, including statutory consumer rights.</p>
    </Section>
    <Section title="Changes and contact">
      <p>We may update these terms as the website or business changes. Continued use after an update means you accept the revised terms to the extent permitted by law. Questions: <a href={`mailto:${businessConfig.contact.email}`}>{businessConfig.contact.email}</a> or <a href={`tel:${businessConfig.contact.phoneNumber}`}>{businessConfig.contact.phoneDisplay}</a>.</p>
    </Section>
  </>
);

const CookiesContent = () => (
  <>
    <p className="mt-6 text-[12px] text-muted">{updated}</p>
    <Section title="What is used">
      <p>This website does not currently install Google Analytics or other advertising, profiling or performance analytics scripts. It may use strictly necessary hosting or security technologies required by Cloudflare to deliver and protect the site.</p>
    </Section>
    <Section title="Consent preferences">
      <p>A small preference record is stored in your browser's local storage to remember whether you accept or reject optional tracking. The website does not use this record to load analytics or advertising.</p>
    </Section>
    <Section title="Essential technologies">
      <p>Cloudflare and the website host may process standard technical information such as IP address, security signals and request data to route traffic and prevent abuse. These processing functions are necessary to operate and secure the site and are not used for optional advertising.</p>
    </Section>
    <Section title="Third-party fonts">
      <p>We use Google Fonts to present the website typography. The browser may contact Google to obtain font files, which can reveal standard connection information such as IP address. You can change your consent preference or block this service through browser settings, subject to appearance or availability effects.</p>
    </Section>
    <Section title="Change preferences">
      <p>Use the “Cookie preferences” control shown on this page or in the cookie banner to accept or reject optional technologies. At present, no optional analytics technology is enabled.</p>
      <button
        type="button"
        onClick={() => window.dispatchEvent(new CustomEvent('open-cookie-preferences'))}
        className="mt-2 rounded-md border border-navy/20 bg-white px-4 py-2.5 text-[13px] font-semibold text-navy hover:border-azure focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure"
      >
        Manage cookie preferences
      </button>
    </Section>
  </>
);
