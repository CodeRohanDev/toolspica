import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "word-to-pdf",
  lang: "en",
  title: "Why You Should Send a PDF, Not a .docx, for Anything Final",
  description:
    "The real reason PDF became the default format for finished documents, and how to convert a Word file to one without opening Word at all.",
  sections: [
    {
      heading: "A .docx file is an invitation to keep editing",
      body: [
        "Send someone a Word document and you're implicitly handing them an editable object — formatting can shift on a different device, a reviewer's tracked changes can get left in by accident, and the file looks slightly different depending on which version of Word (or Google Docs, or LibreOffice) opens it. None of that is a problem while a document is still in progress, but it's exactly the problem once it's finished: a resume, a signed-off contract, an invoice, a final report shouldn't visibly change shape depending on who opens it.",
        "A PDF freezes that — what you see is what everyone sees, on any device, permanently, which is precisely why it's the default for anything meant to be final rather than a working draft.",
      ],
    },
    {
      heading: "Converting without opening Word at all",
      body: [
        "A .docx file is actually a ZIP archive full of XML underneath its extension — reading it directly means unpacking that archive and parsing the document's text and paragraph styles straight from the XML, without needing Word installed or a document uploaded anywhere to do the conversion. The text gets laid out into a properly paginated PDF, wrapped to fit standard margins, with headings (detected from Word's own paragraph style information) rendered larger and bolder than body text.",
        "This matters more than it sounds for anyone without a Word license on the machine they're working from — a resume needs to leave as a PDF, but not everyone has Word open and ready, and a browser-based conversion sidesteps that entirely.",
      ],
    },
    {
      heading: "The resume case specifically",
      body: [
        "Job applications are one of the clearest reasons this comes up: most job boards and applicant tracking systems either request or strongly prefer a PDF resume specifically because it can't accidentally reformat itself in someone else's software, which a .docx genuinely can — a resume that looked perfectly laid out in your Word can shift its line breaks or spacing on a different machine, occasionally hurting readability right when it matters most.",
      ],
    },
    {
      heading: "What this conversion doesn't attempt",
      body: [
        "This is a text-focused conversion — images, tables, multi-column layouts, and precise custom fonts from the original document aren't reconstructed, only the paragraph text with basic heading emphasis. For a document where every visual detail of the original Word formatting needs to survive exactly, printing directly to PDF from within Word itself will be more faithful. But for turning a straightforward text document into a shareable PDF quickly and privately, this handles the whole thing without Word ever needing to open.",
      ],
    },
  ],
  faqs: [
    {
      question: "Will my document's images and tables show up in the PDF?",
      answer:
        "No — this is a text-only conversion. Images, tables, and precise formatting from the original .docx aren't carried over; only the paragraph text with basic heading detection comes through.",
    },
    {
      question: "Do I need Word installed to use this?",
      answer:
        "No — the .docx file's internal structure is read and converted entirely in your browser. No Word installation, account, or upload to a server is involved at any point.",
    },
    {
      question: "Can this convert an older .doc file instead of .docx?",
      answer:
        "No — it specifically reads the modern Word Open XML (.docx) format. Older binary .doc files use a completely different internal structure that this conversion doesn't support.",
    },
  ],
};
