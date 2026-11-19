export interface CleaningService {
  id: string;
  slug: string;
  title: string;
  category: 'residential' | 'commercial' | 'specialized';
  shortDescription: string;
  fullDescription: string;
  features: string[];
  imageUrl: string;
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
    // High quality bright modern living interior
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
    badge: "Our Specialty"
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
    // High quality corporate office interior
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
    badge: "Large-Scale Projects"
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
    // High quality sparkling clean kitchen & tiles
    imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=80",
    badge: "Project Ready"
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
    // Clean bright empty home interior ready for move-in
    imageUrl: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=900&q=80",
    badge: "Inspection Ready"
  }
];
