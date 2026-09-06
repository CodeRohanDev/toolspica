import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "png-to-pdf",
  lang: "en",
  title: "Turning a Folder of Screenshots Into One PDF (PNG, JPG, or Mixed)",
  description:
    "How to combine PNG screenshots or any image files into a single ordered PDF, and what actually happens to transparency.",
  sections: [
    {
      heading: "The screenshot-hoarding problem everyone has",
      body: [
        "Bug reports, design reviews, step-by-step setup guides — they all tend to generate a folder of loose screenshots that eventually needs to become one document. Sending fifteen separate PNG attachments in an email is the kind of thing that makes a recipient's inbox unusable and guarantees at least one image gets missed or opened out of order.",
        "The fix is combining everything into a single PDF, in the order that actually tells the story — screenshot 1, then 2, then 3 — rather than whatever order your file explorer happened to sort them in. This is a five-minute problem in theory but an annoying one without the right tool, since most \"combine images\" tools online are either format-restrictive or come with a confusing upload flow.",
      ],
    },
    {
      heading: "It's not actually PNG-only, despite what tools are sometimes named",
      body: [
        "Plenty of tools with \"PNG to PDF\" in the name quietly reject anything that isn't a .png file — annoying when your screenshot folder has a mix of PNG and JPG, or an exported diagram that happens to be a WEBP. A properly built version of this tool accepts any common image format in the same batch: PNG, JPG, WEBP, GIF, BMP, all combinable in one pass without sorting by extension first.",
        "This matters more than it sounds like it should, because in practice screenshot folders are almost never one consistent format — a phone screenshot might save as one format, a desktop screen-capture tool as another, and a downloaded reference image as a third.",
      ],
    },
    {
      heading: "What happens to transparent PNGs specifically",
      body: [
        "This is the one genuine gotcha worth knowing before you convert: a PDF page can't be transparent, full stop — it's always an opaque rectangle. So when a transparent PNG (a logo cut out on a see-through background, say) becomes a PDF page, every see-through pixel gets filled in with plain white. This is completely standard, expected behavior for turning a transparent graphic into something printable — but if you were hoping the transparency itself would somehow carry through to the PDF, it won't, because there's no equivalent concept in a printed page.",
        "If preserving the actual transparent PNG file matters for later use, keep the original file around separately — the PDF version is for reading, sharing, or printing, not for re-editing as a design asset.",
      ],
    },
    {
      heading: "Getting the page order right the first time",
      body: [
        "Every combined-images-into-PDF tool lists your files in upload order and lets you reorder before generating — do this check before hitting the final button, since it's the one step that's genuinely hard to fix after the fact without redoing the whole thing. A quick habit that avoids reordering entirely: rename your screenshots with a number prefix in your file explorer first (01-step, 02-step, 03-step) so they upload in the right order automatically.",
      ],
    },
  ],
  faqs: [
    {
      question: "Does this tool only accept PNG files?",
      answer:
        "No — despite tools in this category often being named after PNG specifically, a properly built version accepts any common image format (JPG, WEBP, GIF, BMP) in the same batch, so you don't need to sort files by format first.",
    },
    {
      question: "What happens to transparency in my PNG when it becomes a PDF page?",
      answer:
        "Since a PDF page is always opaque, any transparent area gets filled with plain white. This is expected, standard behavior — the transparency itself isn't preserved because a printed page has no equivalent concept.",
    },
    {
      question: "Can I mix PNG and JPG screenshots in the same document?",
      answer:
        "Yes — add any combination of formats in one session and they'll all combine into a single PDF, one page per image, in whatever order you arrange them before generating.",
    },
  ],
};
