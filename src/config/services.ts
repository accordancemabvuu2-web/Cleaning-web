import { images, type SiteImage } from './images';

export interface CleaningService {
  id: string;
  slug: string;
  title: string;
  category: 'residential' | 'commercial' | 'specialized';
  shortDescription: string;
  fullDescription: string;
  features: string[];
  image: SiteImage;
  badge?: string;
}

export const servicesData: CleaningService[] = [
  {
    id: "residential",
    slug: "residential-cleaning",
    title: "Post-Construction Cleanup",
    category: "specialized",
    shortDescription: "Detailed cleanup that turns a newly built or renovated property into a move-in-ready space.",
    fullDescription: "We remove construction dust, debris, residue, and fine particles from every surface so your project is ready for its final walkthrough, handover, or occupancy.",
    features: [
      "Fine dust and debris removal",
      "Surface, fixture, and floor detailing",
      "Final clean for inspections and handover",
      "Move-in-ready presentation standard"
    ],
    image: images.constructionCleanup,
    badge: "Our core service"
  },
  {
    id: "commercial",
    slug: "commercial-cleaning",
    title: "High-Rise Development Cleaning",
    category: "commercial",
    shortDescription: "Scalable cleaning support for multi-unit towers and large residential developments.",
    fullDescription: "Our crews coordinate with site teams to clean suites, common areas, lobbies, corridors, and amenities across high-rise projects.",
    features: [
      "Multi-suite and common-area cleaning",
      "Lobby, corridor, and amenity spaces",
      "Construction residue and dust control",
      "Flexible project-based scheduling"
    ],
    image: images.highRise,
    badge: "Large-scale projects"
  },
  {
    id: "deep-cleaning",
    slug: "deep-cleaning",
    title: "Townhouse & Residential Projects",
    category: "specialized",
    shortDescription: "Consistent, detail-focused cleaning for townhouse communities and new residential builds.",
    fullDescription: "We deliver a reliable finish across individual units and shared spaces, helping builders and property teams meet presentation and turnover standards.",
    features: [
      "Unit-by-unit finishing cleans",
      "Kitchens, bathrooms, and fixtures",
      "Windowsills, trim, and baseboards",
      "Turnover-ready final presentation"
    ],
    image: images.residentialDevelopment,
    badge: "Project ready"
  },
  {
    id: "move-in-out",
    slug: "move-in-out-cleaning",
    title: "Final Handover Cleaning",
    category: "specialized",
    shortDescription: "A final presentation clean for inspections, handovers, occupancy, and new homeowners.",
    fullDescription: "We prepare completed spaces for the moment they are shown, inspected, handed over, or occupied, with careful attention to every visible detail.",
    features: [
      "Final inspection preparation",
      "Interior cupboards and drawers",
      "Windows, doors, trim, and floors",
      "Handover-ready quality standard"
    ],
    image: images.handoverKeys,
    badge: "Inspection ready"
  }
];

export const CUSTOM_SCOPE_LABEL = 'Custom Cleaning Request';
