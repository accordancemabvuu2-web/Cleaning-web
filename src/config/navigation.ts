export interface NavLink {
  label: string;
  href: string;
  /** Section id, used for active-link detection. */
  sectionId: string;
}

/** Primary navigation, shared by the header and the footer. */
export const primaryNavLinks: NavLink[] = [
  { label: 'Our services', href: '#services', sectionId: 'services' },
  { label: 'How it works', href: '#process', sectionId: 'process' },
  { label: 'Why ID TID', href: '#why-us', sectionId: 'why-us' },
  { label: 'Reviews', href: '#projects', sectionId: 'projects' },
  { label: 'FAQs', href: '#faqs', sectionId: 'faqs' },
];

/** Every section that participates in scroll-spy, in document order. */
export const spiedSectionIds = ['home', ...primaryNavLinks.map((link) => link.sectionId), 'contact'];
