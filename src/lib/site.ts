export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://toolspica.cloud"
).replace(/\/$/, "");

export const SITE = {
  name: "Toolspica",
  shortName: "Toolspica",
  tagline: "Every tool you need. Nothing leaves your browser.",
  description:
    "Toolspica is a free, privacy-first platform of 500+ browser-based utilities — PDF, image, video, audio, developer, SEO, and AI tools. Files are processed locally in your browser whenever possible and never permanently stored. Toolspica is built by Hostspica.",
  url: SITE_URL,
  ogImage: `${SITE_URL}/logo.png`,
  twitterHandle: "@toolspica",
  email: "support@hostspica.com",
  legalEntity: "Hostspica",
  parentBrand: "Hostspica",
  parentUrl: "https://hostspica.com",
  /** Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION / NEXT_PUBLIC_BING_SITE_VERIFICATION
   * in your deployment env once you register the property in Google Search
   * Console / Bing Webmaster Tools — see layout.tsx `verification` field. */
} as const;
