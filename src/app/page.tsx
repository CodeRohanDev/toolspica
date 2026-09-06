import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { StatsBar } from "@/components/home/stats-bar";
import { PopularTools } from "@/components/home/popular-tools";
import { CategoryGrid } from "@/components/home/category-grid";
import { RecentlyUsed } from "@/components/home/recently-used";
import { Benefits } from "@/components/home/benefits";
import { SeoContent } from "@/components/home/seo-content";
import { Cta } from "@/components/home/cta";
import { FaqSection } from "@/components/faq-section";
import { JsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import { HOMEPAGE_FAQS } from "@/lib/homepage-faqs";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.description,
  path: "/",
  eyebrow: "500+ free browser tools",
});

export default function Home() {
  return (
    <>
      <Hero />
      <RecentlyUsed />
      <PopularTools />
      <CategoryGrid />
      <HowItWorks />
      <StatsBar />
      <Benefits />
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <FaqSection
          faqs={HOMEPAGE_FAQS}
          description="Everything you need to know about how Toolspica works."
        />
      </div>
      <SeoContent />
      <Cta />
      <JsonLd data={faqJsonLd(HOMEPAGE_FAQS)} />
    </>
  );
}
