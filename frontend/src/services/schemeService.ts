export interface Scheme {
  id: number;
  name: string;
  category: string;
  description: string;
  benefits: string;
  eligibility: string[];
  documents: string[];
}

export const schemes: Scheme[] = [
  {
    id: 1,
    name: "National Scholarship Portal",
    category: "Education",
    description:
      "A portal through which students can discover and apply for eligible scholarships.",
    benefits: "Access to multiple scholarship opportunities.",
    eligibility: [
      "Eligibility depends on the specific scholarship.",
      "Academic and income requirements may apply.",
    ],
    documents: [
      "Aadhaar card",
      "Previous academic marksheet",
      "Income certificate",
      "Bank account details",
    ],
  },
  {
    id: 2,
    name: "PM Vishwakarma Scheme",
    category: "Skill Development",
    description:
      "Supports traditional artisans and craftspeople through training and other assistance.",
    benefits:
      "Skill training, toolkit incentives and credit support, subject to scheme conditions.",
    eligibility: [
      "Must work in an eligible traditional trade.",
      "Must satisfy the official scheme conditions.",
    ],
    documents: ["Aadhaar card", "Bank account details", "Mobile number"],
  },
  {
    id: 3,
    name: "Ayushman Bharat PM-JAY",
    category: "Healthcare",
    description:
      "Provides eligible families with health coverage for specified hospital treatments.",
    benefits: "Health cover of up to ₹5 lakh per eligible family per year.",
    eligibility: ["Eligibility is based on applicable government criteria."],
    documents: ["Identity proof", "Eligibility verification documents"],
  },
];
