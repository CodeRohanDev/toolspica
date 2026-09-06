export type BlogLang = "en" | "hi" | "hinglish";

export const BLOG_LANGS: BlogLang[] = ["en", "hi", "hinglish"];

export const BLOG_LANG_LABEL: Record<BlogLang, string> = {
  en: "English",
  hi: "हिन्दी",
  hinglish: "Hinglish",
};

/** BCP-47 tag used for hreflang / JSON-LD inLanguage. Hinglish = Hindi in Latin script. */
export const BLOG_LANG_TAG: Record<BlogLang, string> = {
  en: "en",
  hi: "hi",
  hinglish: "hi-Latn",
};

export interface BlogSection {
  heading: string;
  body: string[];
}

export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogPost {
  /** Matches the underlying tool's slug in ALL_TOOLS — one post per tool per language. */
  toolSlug: string;
  lang: BlogLang;
  title: string;
  description: string;
  sections: BlogSection[];
  faqs: BlogFaq[];
  /** ISO date. Defaults to the tool's content last-modified date if omitted. */
  publishedAt?: string;
}
