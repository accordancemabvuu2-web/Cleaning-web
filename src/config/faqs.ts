export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqsData: FAQItem[] = [
  {
    id: "services-offered",
    question: "What cleaning services do you offer?",
    answer: "We specialize in post-construction cleanup for new buildings, high-rise developments, townhouses, and large-scale residential projects across the Toronto area."
  },
  {
    id: "homes-and-offices",
    question: "Do you clean both homes and offices?",
    answer: "Yes. Our team is equipped for individual units, townhouse communities, high-rise developments, and large-scale residential projects, with scope and staffing tailored to the site."
  },
  {
    id: "how-to-request-quote",
    question: "How can I request a quotation?",
    answer: "You can request a quote directly through our online quote form below, send us a direct message on WhatsApp, or give us a phone call. We'll ask a few details about your property size and cleaning requirements to provide a tailored quotation."
  },
  {
    id: "deep-cleaning-available",
    question: "Do you offer deep cleaning?",
    answer: "Yes, our deep cleaning service is an intensive, detail-oriented scrub that targets grime, grout, behind major kitchen appliances, high-touch surfaces, and complete sanitary areas."
  },
  {
    id: "preferred-date",
    question: "Can I arrange a preferred cleaning date?",
    answer: "Absolutely. When contacting us or submitting your quote request, simply specify your preferred date and time. We will verify schedule availability and confirm with you promptly."
  },
  {
    id: "areas-served",
    question: "Which areas do you serve?",
    answer: "We are based at 509-16 Carluke Cres, North York, ON M2L 2H9, and serve project sites throughout Toronto, North York, Scarborough, Etobicoke, Vaughan, Richmond Hill, Markham, and the surrounding GTA."
  }
];
