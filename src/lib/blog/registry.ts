import { BLOG_POSTS_EN } from "@/lib/blog-content/en";
import { BLOG_POSTS_HI } from "@/lib/blog-content/hi";
import { BLOG_POSTS_HINGLISH } from "@/lib/blog-content/hinglish";
import type { BlogLang, BlogPost } from "./types";

const REGISTRY: Record<BlogLang, Record<string, BlogPost>> = {
  en: BLOG_POSTS_EN,
  hi: BLOG_POSTS_HI,
  hinglish: BLOG_POSTS_HINGLISH,
};

export function getBlogPost(lang: BlogLang, slug: string): BlogPost | undefined {
  return REGISTRY[lang]?.[slug];
}

export function getBlogSlugsForLang(lang: BlogLang): string[] {
  return Object.keys(REGISTRY[lang] ?? {});
}

/** Which languages have a post for this tool slug — used for hreflang alternates and language pills. */
export function getAvailableLangsForSlug(slug: string): BlogLang[] {
  return (Object.keys(REGISTRY) as BlogLang[]).filter((lang) => Boolean(REGISTRY[lang][slug]));
}

export function getAllBlogSlugs(): string[] {
  const slugs = new Set<string>();
  for (const lang of Object.keys(REGISTRY) as BlogLang[]) {
    for (const slug of Object.keys(REGISTRY[lang])) slugs.add(slug);
  }
  return [...slugs];
}
