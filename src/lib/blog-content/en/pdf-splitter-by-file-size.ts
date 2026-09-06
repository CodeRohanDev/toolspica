import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "pdf-splitter-by-file-size",
  lang: "en",
  title: "Your PDF Is Too Big to Email — Here's How to Actually Fix That",
  description:
    "Why splitting a PDF by page count doesn't solve an upload size limit, and how to split it by actual file size instead.",
  sections: [
    {
      heading: "The size limit that shows up at the worst possible moment",
      body: [
        "It's a familiar situation: you've scanned every page of a document, combined it into one PDF, and you're ready to submit it — and then the upload form or your email client rejects it for being too large. 5MB, 10MB, 25MB caps are everywhere: job portals, government form uploads, university application systems, email attachments. A PDF full of scanned pages or high-resolution photos blows past these limits easily, often without any obvious warning until the exact moment you try to send it.",
        "The instinctive fix is to split the document into a few smaller files. But splitting by a fixed number of pages — say, every 10 pages — doesn't reliably solve the problem, because pages vary wildly in size depending on their content. Ten text-heavy pages might total 500KB, while ten pages of scanned photos could easily be 30MB. A page-count split gives you no actual guarantee about the resulting file sizes.",
      ],
    },
    {
      heading: "Splitting by measured size instead of guessing",
      body: [
        "The reliable approach is splitting based on real, measured file size rather than a page count estimate. This works by building each output file page-by-page, checking the actual resulting file size after every page is added, and starting a fresh file the moment adding another page would push the current one past your specified limit.",
        "Because the check happens on the real saved size after each addition — not an estimate — you get a genuine guarantee: every output part, except possibly the last, stays right up against your limit without going over it. If you set a 5MB cap, you'll get files close to 5MB each, not files that are randomly 2MB or accidentally 6MB.",
      ],
    },
    {
      heading: "The one edge case worth knowing about",
      body: [
        "There's a hard limit to this approach that's worth understanding upfront: a single page can't be split into something smaller than itself. If one page alone — because of a huge embedded photo or dense scanned content — already exceeds your size limit, that page still gets output as its own file, even though it technically breaks your rule. There's no way to further subdivide content within a single page.",
        "In practice this is rare, but it does happen with very high-resolution scans. If you hit it, the fix is usually to compress the PDF first (reducing image quality/resolution) and then split the compressed version, rather than expecting the splitter to work around an oversized single page.",
      ],
    },
    {
      heading: "How this differs from a regular page-range split",
      body: [
        "A standard PDF split tool divides a document by page ranges or a fixed page count you specify — useful when you know exactly which pages need to go where, like separating chapters or sections. Splitting by file size is a different tool for a different goal: you don't care about page groupings at all, you only care about every resulting file fitting under a byte limit.",
        "Use whichever matches your actual constraint. If someone asked for \"pages 1 through 10 as one file,\" use a page-range split. If the constraint is \"nothing over 10MB,\" size-based splitting is the only approach that actually guarantees the outcome.",
      ],
    },
  ],
  faqs: [
    {
      question: "Will every split file actually stay under my size limit?",
      answer:
        "Yes, with one exception: a single page whose own content already exceeds your limit can't be split smaller, so it's still output as its own oversized file. Every other split point is chosen based on the real measured size after each page, so the guarantee holds otherwise.",
    },
    {
      question: "How many files will I end up with?",
      answer:
        "It depends entirely on your total document size and how content is distributed across pages — a document with uniform page sizes splits predictably, while one with a mix of light and heavy pages will split unevenly. The tool figures this out automatically.",
    },
    {
      question: "Does splitting reduce the quality of my pages?",
      answer:
        "No — pages are copied as-is into each output file rather than being re-rendered or recompressed, so text and image quality stay exactly as they were in the original document.",
    },
  ],
};
