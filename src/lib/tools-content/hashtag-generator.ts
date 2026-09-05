import type { ToolContent } from "./types";

export const hashtagGeneratorContent: ToolContent = {
  heroSubtitle: "Generate Relevant Hashtags for Instagram, TikTok & X",
  overview: [
    "Hashtags are still one of the main ways content gets discovered on Instagram, TikTok, and X beyond your existing followers — a post with a handful of relevant, well-chosen hashtags reaches people actively browsing or searching those tags, not just people who already follow you. The catch is that coming up with a good spread of tags for every single post — not just the same five tags reused endlessly, which platforms increasingly deprioritize — takes more time than it should for something so repetitive.",
    "This tool takes a topic or keyword phrase and generates a set of related hashtag variations: the topic as one combined tag, a capitalized \"CamelCase\" version (more readable at a glance, e.g. #SustainableFashion instead of #sustainablefashion), individual word tags, and the topic combined with common high-engagement suffixes like \"daily,\" \"life,\" \"tips,\" \"trends,\" and \"community\" that are widely used across niches.",
    "Because this runs as a simple, transparent text-combination algorithm rather than a trend-tracking service, it won't tell you which tags are currently trending or how much search volume a tag actually gets — for that, cross-check promising tags directly on the platform you're posting to before relying on them. What it does reliably give you is a fast, varied starting set to pick from instead of typing the same handful of tags from memory every time.",
  ],
  howItWorks: [
    { title: "Enter a topic", description: "Type a topic, product, or theme related to your post." },
    { title: "Review the generated tags", description: "See a set of hashtag variations based on that topic." },
    { title: "Copy and post", description: "Copy all tags at once, or pick the ones most relevant to your specific post." },
  ],
  examples: [
    {
      label: "Topic-based generation",
      input: "sustainable fashion",
      output: "#sustainablefashion, #SustainableFashion, #sustainable, #fashion, #sustainablefashiondaily, #sustainablefashiontips",
    },
  ],
  faqs: [
    {
      question: "Are these hashtags guaranteed to be trending?",
      answer:
        "No — this generates relevant tag variations based on your topic using common patterns, not live trend data. Check a few of the generated tags directly on the platform to see how much they're actually being used before relying heavily on them.",
    },
    {
      question: "How many hashtags should I actually use per post?",
      answer:
        "This varies by platform and changes over time — Instagram has historically supported up to 30 per post, but many creators find a smaller, more relevant set (5-15) performs better than maxing out the limit with loosely related tags.",
    },
    {
      question: "Can I use these hashtags on TikTok and X as well as Instagram?",
      answer:
        "Yes — the generated tags are plain hashtag text with no platform-specific formatting, so they work anywhere hashtags are supported, though each platform's own trending tags and conventions are worth checking separately.",
    },
    {
      question: "Is my topic or any of my data sent to a server?",
      answer:
        "No — hashtags are generated entirely in your browser from the text you type. Nothing is uploaded or stored.",
    },
  ],
};
