import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "pdf-annotator",
  lang: "en",
  title: "Why Marking Up a PDF Is Still Harder Than It Should Be (and the Fix)",
  description:
    "Highlighting and drawing on a PDF shouldn't require a paid subscription. Here's what to know about how permanent PDF annotation actually works.",
  sections: [
    {
      heading: "The gap between reading a PDF and marking it up",
      body: [
        "Most default PDF viewers let you read a document just fine but turn awkward or outright locked-behind-a-paywall the moment you want to highlight a sentence or scribble a quick note in the margin — something a physical highlighter does in one second on paper. This is a strange gap given how common the need is: students marking up reading assignments, reviewers flagging clauses in a contract, anyone who thinks better with a pen in hand even when the document itself is digital.",
        "A dedicated annotation tool closes that gap with two simple tools — a highlighter for marking passages and a pen for circling, underlining, or writing short notes — applied directly on top of the page as you view it, the same physical motion as marking up a printed page.",
      ],
    },
    {
      heading: "Why annotations get \"baked in\" rather than staying editable",
      body: [
        "There are two fundamentally different ways to implement PDF annotation. One is a real annotation layer — a separate, removable set of objects sitting on top of the page content, toggleable and editable later, the way annotation works in dedicated PDF editing software. The other is simpler and more universal: render the marked-up page to an image with the strokes drawn directly into the pixels, permanently.",
        "The second approach trades editability for guaranteed compatibility — a baked-in annotation displays identically in literally any PDF viewer, on any device, forever, because it's not relying on that viewer supporting a specific annotation format. The cost is that once saved, you can't remove or adjust a mark without going back to your original, unmarked file and starting over.",
      ],
    },
    {
      heading: "The part people don't expect: untouched pages stay untouched",
      body: [
        "A well-built annotation tool only converts the pages you actually marked up into images — everything else in the document is copied through completely unchanged, keeping its original selectable, searchable text. If you highlight two clauses on page 3 of a 40-page contract, only page 3 becomes an image; the other 39 pages remain exactly as they were, still searchable and copy-pasteable.",
        "This matters more than it sounds for long documents — it means you don't sacrifice the entire document's text-search functionality just to add a few notes on one page.",
      ],
    },
    {
      heading: "A practical workflow that avoids regret",
      body: [
        "Because saved annotations can't be undone afterward, the practical habit is: keep your original unmarked PDF somewhere safe before you start marking up a copy, especially for anything you might need a clean version of later — a contract you'll need to send elsewhere unmarked, or reading material you'll want to re-annotate differently next semester.",
        "Within a single session, most tools let you clear all marks on the current page and start over before you save, so there's no pressure to get every stroke perfect the first time — the only point of no return is the final save/download step.",
      ],
    },
  ],
  faqs: [
    {
      question: "Can I remove an annotation after I've saved the file?",
      answer:
        "Not from that saved file — annotations are baked permanently into the page image on save, which guarantees they display identically everywhere but means they can't be toggled off later. Keep your original file if you might need an unmarked version.",
    },
    {
      question: "Will the rest of my document still be searchable after I annotate one page?",
      answer:
        "Yes — only pages you actually mark up get converted to images. Every other page passes through unchanged, keeping its original selectable, searchable text.",
    },
    {
      question: "What's actually different between the highlighter and the pen tool?",
      answer:
        "The highlighter draws a thick, semi-transparent stroke meant to sit over text without obscuring it, mimicking a physical highlighter. The pen draws a thin, solid stroke better suited to circling, underlining, or writing short freehand notes.",
    },
  ],
};
