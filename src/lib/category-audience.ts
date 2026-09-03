// "Who uses this" audience labels, per category — used on every tool page
// to add genuine long-tail keyword coverage and answer "is this for me?"
export const CATEGORY_AUDIENCE: Record<string, string[]> = {
  "pdf-tools": ["Students", "Office workers", "HR teams", "Freelancers", "Small businesses"],
  "image-tools": ["Designers", "Social media managers", "Bloggers", "Marketers", "Photographers"],
  "text-tools": ["Students", "Writers", "Bloggers", "Editors", "Content marketers", "Developers"],
  "developer-tools": ["Software engineers", "Web developers", "API testers", "DevOps engineers", "Students"],
  "video-tools": ["Content creators", "Video editors", "Social media managers", "Marketers"],
  "audio-tools": ["Podcasters", "Musicians", "Content creators", "Video editors"],
  "ocr-tools": ["Students", "Researchers", "Office workers", "Archivists", "Accountants"],
  "archive-tools": ["IT admins", "Developers", "Office workers", "Students"],
  calculators: ["Students", "Homeowners", "Everyday planners", "Teachers"],
  "finance-and-business-calculators": ["Small business owners", "Freelancers", "Accountants", "Investors", "Students"],
  "health-and-fitness-calculators": ["Fitness enthusiasts", "Personal trainers", "Dietitians", "Everyday health trackers"],
  "unit-and-measurement-converters": ["Students", "Engineers", "Cooks", "Travelers", "Tradespeople"],
  "ai-tools": ["Writers", "Marketers", "Students", "Content creators", "Small businesses"],
  "social-media-tools": ["Social media managers", "Influencers", "Marketers", "Small businesses"],
  "seo-tools": ["SEO specialists", "Content marketers", "Web developers", "Small business owners"],
  "security-tools": ["Developers", "IT admins", "Everyday users", "Security researchers"],
  "document-and-office-tools": ["Office workers", "Job seekers", "Freelancers", "Students"],
  "spreadsheet-and-data-tools": ["Analysts", "Developers", "Office workers", "Students"],
  "color-tools": ["Designers", "Developers", "Artists", "Marketers"],
  "qr-code-and-barcode-tools": ["Small businesses", "Event organizers", "Marketers", "Retailers"],
  "random-generators": ["Developers", "Teachers", "Game masters", "Everyday users"],
  "website-and-network-tools": ["Web developers", "IT admins", "SEO specialists", "System administrators"],
  "gif-and-meme-tools": ["Social media managers", "Content creators", "Meme creators", "Marketers"],
  "font-and-typography-tools": ["Designers", "Developers", "Marketers", "Students"],
  "writing-and-citation-tools": ["Students", "Academics", "Researchers", "Bloggers"],
  "email-tools": ["Marketers", "Sales teams", "Small businesses", "Developers"],
  "legal-and-business-document-tools": ["Small business owners", "Freelancers", "Startups", "Landlords"],
  "math-tools": ["Students", "Teachers", "Engineers", "Researchers"],
  "language-and-translation-tools": ["Students", "Travelers", "Writers", "Global teams"],
  "crypto-and-currency-tools": ["Crypto investors", "Traders", "Developers", "Finance teams"],
  "signature-tools": ["Freelancers", "Small business owners", "Office workers", "Legal teams"],
  "time-and-productivity-tools": ["Remote teams", "Freelancers", "Students", "Project managers"],
  "education-tools": ["Teachers", "Students", "Tutors", "Parents"],
  "presentation-tools": ["Students", "Business professionals", "Teachers", "Marketers"],
};

export function getCategoryAudience(categorySlug: string): string[] {
  return (
    CATEGORY_AUDIENCE[categorySlug] ?? [
      "Students",
      "Professionals",
      "Freelancers",
      "Everyday users",
    ]
  );
}
