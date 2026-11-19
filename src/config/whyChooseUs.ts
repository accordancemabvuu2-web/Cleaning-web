export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export const whyChooseUsData: BenefitItem[] = [
  {
    id: "detail",
    title: "Attention to Detail",
    description: "We don't cut corners. From skirting boards to subtle high-touch surfaces, our cleaning methodology focuses on meticulous thoroughness.",
    iconName: "Sparkles"
  },
  {
    id: "reliable",
    title: "Reliable & Punctual Service",
    description: "Dependability is our cornerstone. Our cleaning teams arrive on time with the appropriate equipment and a structured checklist.",
    iconName: "ShieldCheck"
  },
  {
    id: "scheduling",
    title: "Flexible Scheduling",
    description: "Whether you need routine morning visits, weekend refreshes, or off-peak office cleaning, we adapt directly to your calendar.",
    iconName: "CalendarClock"
  },
  {
    id: "solutions",
    title: "Project-Ready Capability",
    description: "Versatile capabilities tailored to new buildings, high-rise developments, townhouses, and large-scale residential projects.",
    iconName: "Building2"
  },
  {
    id: "customer",
    title: "Customer-Focused Approach",
    description: "Transparent communication, respectful handling of your private space, and responsive follow-ups after every service visit.",
    iconName: "HeartHandshake"
  },
  {
    id: "professional",
    title: "Professional Presentation",
    description: "Neatly presented, trustworthy team members dedicated to high standards of hygiene and client confidentiality.",
    iconName: "BadgeCheck"
  }
];
