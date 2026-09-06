import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "pdf-compare",
  lang: "en",
  title: "How to Spot What Actually Changed Between Two PDF Versions",
  description:
    "Comparing two PDFs by eye misses small edits constantly — here's how a visual diff tool catches what a read-through won't.",
  sections: [
    {
      heading: "Why reading two PDFs side by side doesn't actually work",
      body: [
        "A contract comes back after a round of edits, and you're told \"just a couple of small changes.\" Reading both versions side by side to find them sounds reasonable until you're twelve pages in and starting to lose confidence you'd notice a single changed number or a quietly removed clause. Human attention isn't built for finding a needle in an otherwise-identical haystack — it's built to skim for meaning, which is exactly the mode that lets small, deliberate or accidental changes slip past.",
        "A pixel-level comparison tool doesn't get tired or skim. It renders both versions and flags every place they differ, mechanically, page by page.",
      ],
    },
    {
      heading: "What the red highlighting is actually telling you",
      body: [
        "Both PDFs get rendered to images and compared pixel by pixel — anywhere the color difference between the two crosses a threshold gets marked in red, while unchanged regions fade to grayscale so the red genuinely pops out. This means it catches everything: a changed number, a moved paragraph, a font swap, a logo update, a clause that shifted position because something above it got longer.",
        "It's worth knowing this is visual, not textual — it flags where pixels changed, not what a word-level diff would call \"added\" or \"removed\" text. Identical text re-rendered at a slightly shifted position can register as a difference too, which is expected behavior, not a false alarm to ignore blindly.",
      ],
    },
    {
      heading: "Using the diff percentage to triage, not just to look at pretty red pages",
      body: [
        "On a long document, the real value isn't staring at every page — it's the per-page diff percentage that tells you where to actually spend attention. A page sitting at 0% needs no review at all; a page at 15% has a real, substantial change worth reading carefully. This turns a 40-page \"did anything change\" review into a 3-page targeted read, which is the entire point.",
        "Trace-level differences (under roughly 1%) are usually just rendering noise — subtle anti-aliasing differences between two rendering passes — rather than a genuine content change, so don't panic over every nonzero number.",
      ],
    },
  ],
  faqs: [
    {
      question: "Does this tell me exactly what text was added or removed?",
      answer:
        "No — it's a pixel-level visual comparison, not a text-aware diff. It shows you where on the page something changed so you can go read that specific spot, but it won't produce an \"added/removed\" word list the way a text-diff tool does.",
    },
    {
      question: "What if the two PDFs have a different number of pages?",
      answer:
        "Only pages present in both files get compared, and you'll see a note flagging the page count mismatch so you know some pages weren't checked at all.",
    },
    {
      question: "Why does a page show a small percentage difference when I can't see any change?",
      answer:
        "Very minor rendering differences (subtle anti-aliasing, tiny position shifts) can register as a small nonzero diff even when the visible content is effectively identical — check the diff image for pages with only trace-level differences before assuming something meaningful changed.",
    },
  ],
};
