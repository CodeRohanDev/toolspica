import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "pdf-to-word",
  lang: "en",
  title: "Turning a PDF Back Into an Editable Word Document",
  description:
    "What actually happens when you convert a PDF to Word, why headings sometimes come through wrong, and when this isn't the tool for the job.",
  sections: [
    {
      heading: "The situation this actually solves",
      body: [
        "It's a specific, common bind: you have a PDF and you need to change something in it — fix a typo in a contract clause, update a figure in an old report, or just get a document's wording back into a format you can actually edit. The PDF itself is a dead end for editing. Converting it to a genuine .docx file gets you back into Word, Google Docs, or LibreOffice with the text ready to work on.",
        "This is a rescue operation for the words, not a perfect resurrection of the original file. Knowing that going in sets the right expectation for what comes out.",
      ],
    },
    {
      heading: "How the heading detection actually decides what's a heading",
      body: [
        "Since a converted PDF has no memory of which text was styled as \"Heading 1\" in whatever program originally created it, the conversion falls back to a simple, honest heuristic: text that's noticeably larger than the surrounding body text gets treated as a heading and rendered bold in the output; everything else becomes regular body paragraphs.",
        "This works well for documents with a clear visual hierarchy — a report with obviously bigger section titles will convert cleanly. It works less well for documents where headings are the same size as body text but distinguished only by color or a different font, since size is the one signal this approach actually has to go on.",
      ],
    },
    {
      heading: "What doesn't survive the trip",
      body: [
        "Tables, columns, images, and precise fonts from the original PDF aren't reconstructed — this is a text-and-basic-headings conversion, not a full document-layout rebuild. A two-column newsletter or a document full of tables will come back as plain, single-column paragraphs, which may or may not be usable depending on what you actually need from it.",
        "If a table of data specifically is what you're after, PDF to CSV or PDF to Excel exist precisely because they reconstruct row-and-column structure, which a general text conversion doesn't attempt.",
      ],
    },
    {
      heading: "When to reach for this, and when not to",
      body: [
        "This is the right call when the actual goal is editable text — you need to change wording, and a plain reflow of the content into Word is genuinely all you need. It's the wrong call when visual fidelity to the original PDF's exact layout matters more than editability; in that case, you're better off treating the PDF as the final format and making any changes through a PDF editor instead of round-tripping through Word.",
      ],
    },
  ],
  faqs: [
    {
      question: "Will my PDF's exact layout be preserved in the Word file?",
      answer:
        "No — this is a text extraction with basic heading detection, not a layout-preserving conversion. Columns, tables, images, and precise fonts aren't reconstructed; only the text content comes through, in reading order.",
    },
    {
      question: "Does this work on a scanned PDF?",
      answer:
        "No — it reads the PDF's embedded text layer, which a scanned image PDF doesn't have. Run an OCR tool on a scanned document first if you need to get its text into an editable format.",
    },
    {
      question: "Can I convert a table from the PDF into a Word table?",
      answer:
        "Not with this specific conversion — tables come through as plain paragraphs, not structured Word tables. Use PDF to CSV or PDF to Excel if reconstructing tabular data specifically is the goal.",
    },
  ],
};
