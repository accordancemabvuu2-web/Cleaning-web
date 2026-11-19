export interface TestimonialItem {
  id: string;
  clientName: string;
  clientType: "Residential Client" | "Commercial Client";
  suburb: string;
  feedback: string;
  rating: number; // 1 - 5
  date?: string;
  isVerifiedReview?: boolean;
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: "north-york-supervisor",
    clientName: "Daniel R.",
    clientType: "Residential Client",
    suburb: "North York, Toronto",
    feedback: "The crew handled a difficult final-stage cleanup with precision. Units were dust-free, fixtures were polished, and the team was ready for our walkthrough.",
    rating: 5,
    isVerifiedReview: true,
  },
  {
    id: "vaughan-manager",
    clientName: "Marcus L.",
    clientType: "Commercial Client",
    suburb: "Vaughan, Ontario",
    feedback: "ID TID coordinated smoothly with our site schedule and delivered consistent results across the common areas and residential units.",
    rating: 5,
    isVerifiedReview: true,
  },
  {
    id: "markham-property",
    clientName: "Priya S.",
    clientType: "Residential Client",
    suburb: "Markham, Ontario",
    feedback: "The handover clean was thorough and professionally managed. Every visible surface was prepared for occupancy and the final inspection.",
    rating: 5,
    isVerifiedReview: true,
  }
];
