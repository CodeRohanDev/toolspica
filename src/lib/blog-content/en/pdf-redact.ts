import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "pdf-redact",
  lang: "en",
  title: "The Black Box Trick That Doesn't Actually Redact Your PDF (And What Does)",
  description:
    "Why drawing a black box over text in a PDF editor doesn't actually hide it, and what a real, secure redaction needs to do instead.",
  sections: [
    {
      heading: "A mistake that's caused real, embarrassing leaks",
      body: [
        "This has happened publicly, more than once, to governments, law firms, and companies that should have known better: a document gets released with sensitive information supposedly \"redacted\" behind black boxes, and within minutes someone online selects the text underneath, copies it, and pastes it somewhere else — fully readable. Sometimes it's even simpler: opening the file's raw structure in a text editor reveals the original content sitting right there, completely untouched by the black rectangle drawn on top of it.",
        "This happens because a black box drawn in a typical PDF editor is just another object placed on the page, visually on top of the text but not actually connected to it. The text itself — the real character data — is still sitting in the file's structure exactly as it was, just visually obscured by something covering it in the rendered view.",
      ],
    },
    {
      heading: "What separates a real redaction from a fake one",
      body: [
        "A genuine redaction has to destroy the underlying data, not hide it from view. The only reliable way to do that is to flatten the page into a picture — render it as a bitmap image — and draw the black box directly into that same image's pixels, at the same step, before any new PDF gets built from it. Because the black pixels and the (now-gone) text pixels occupy the exact same layer, there's no separate text object left anywhere for anyone to extract, select, or recover through any method, whether that's copy-paste, inspecting the file's internal structure, or any other trick.",
        "This is fundamentally a rasterize-then-redact operation, and that's not a shortcut or a compromise — it's the only approach that actually guarantees the covered content is gone, because 'gone from the pixels' is the only kind of gone that a redaction can actually promise.",
      ],
    },
    {
      heading: "The trade-off, and why it's worth it",
      body: [
        "Pages you mark for redaction lose their selectable, searchable text as a direct consequence of being rasterized — this is unavoidable, and it's the honest cost of a redaction that actually works. Pages you don't touch are left completely alone, keeping their original text-selectable content, so the trade-off only applies exactly where you actually need something hidden, not to the whole document.",
        "If keeping full document searchability matters more to you than guaranteed-secure redaction, that's a sign the specific pages you're worried about might not actually contain anything that needs true redaction — reconsider whether you need a redaction tool at all versus something more targeted like removing a whole page or replacing specific text.",
      ],
    },
    {
      heading: "Marking redactions correctly the first time",
      body: [
        "Draw your redaction boxes generously — slightly larger than the text itself, rather than pixel-perfect around each letter, since a box that's a few pixels too tight can leave a sliver of a character visible at the edge, which defeats the entire point. Review every page of the document before finalizing, not just the pages you remember having sensitive content, since it's easy to miss a stray reference to a name or number that shows up somewhere unexpected in a long document.",
        "Once you've finalized and downloaded a redacted file, treat the original unredacted file as sensitive and don't send it anywhere by mistake — the whole point of redacting is to create a version that's safe to share, and that only works if the unredacted original doesn't accidentally go out too.",
      ],
    },
  ],
  faqs: [
    {
      question: "If I just cover text with a black rectangle in a normal PDF viewer, is that safe to share?",
      answer:
        "No — that's the exact mistake that's caused real information leaks. The text underneath a drawn rectangle is still fully present and extractable in the file's data, regardless of how it looks visually.",
    },
    {
      question: "Can I tell which pages got redacted just by looking at the final file?",
      answer:
        "Yes — pages with a marked redaction will show a solid black box exactly where you drew it, baked into the page image, while unmarked pages look and behave exactly as they did originally, including keeping selectable text.",
    },
    {
      question: "Is there any way to recover text from behind a properly done redaction?",
      answer:
        "No — because the black box is rendered into the same pixel layer as the covered text during rasterization, there's no separate data left anywhere in the file to extract; the underlying text genuinely no longer exists in the output.",
    },
  ],
};
