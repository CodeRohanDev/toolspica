import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "pdf-metadata-editor",
  lang: "en",
  title: "The Hidden PDF Details Nobody Checks — And Why They're Worth Fixing",
  description:
    "Your PDF's title, author, and keywords live in a field almost nobody looks at directly — until it makes a shared file look sloppy or gets found in the wrong search.",
  sections: [
    {
      heading: "The metadata problem you don't notice until someone else does",
      body: [
        "Right-click any PDF and check its properties, and there's a decent chance the title reads \"Untitled-2\" or the author is someone who left the company two years ago, or an intern's laptop name. Nobody typed that in on purpose — it's just whatever the exporting software defaulted to, and it rides along silently until the file gets shared somewhere the metadata is actually visible: a document management system, a search index, a properties panel a client happens to check.",
        "It's a small thing, but it's the kind of small thing that quietly signals carelessness on a document that's otherwise polished — a final report with \"Untitled-2\" as its title undercuts the effort that went into the actual content.",
      ],
    },
    {
      heading: "What these four fields actually do",
      body: [
        "Title, Author, Subject, and Keywords are stored in a standard part of every PDF's structure, separate entirely from the visible page content — editing them never touches a single word, image, or layout element on the page. They exist purely as identifying information other systems read: a search index might rank on Title and Keywords, a document management system might sort or filter by Author, and some PDF viewers display the Title in the browser tab or window title bar instead of the filename.",
        "Keywords specifically are worth treating like light-touch SEO for internal search — a report tagged with \"Q3, finance, board, 2026\" is far easier for a colleague to find six months later in a shared drive full of similarly-named PDFs than one with no keywords at all.",
      ],
    },
    {
      heading: "A five-minute pass before anything goes out the door",
      body: [
        "Before sending a finished PDF anywhere it might be archived, indexed, or reused — a resume, a proposal, a report — it's worth a quick pass: does the title actually describe the document, is the author field accurate (or blank, if you'd rather not attach a name), and would two or three keywords help someone find this later?",
        "This is also useful for cleaning up a batch of old files. If you've got a folder of reports that all show the same generic author name from whoever originally exported them, fixing that gives each file a properly attributed, professional-looking identity without touching their actual content.",
      ],
    },
    {
      heading: "What this won't fix",
      body: [
        "Metadata editing is purely informational — it won't change how a document reads, prints, or looks to a reader, and it doesn't affect page count, layout, or file size in any meaningful way. If the goal is changing what's actually printed on the page, this is the wrong tool; if the goal is making the file identify itself correctly to search tools, file browsers, and the person opening it next, it's exactly the right one.",
      ],
    },
  ],
  faqs: [
    {
      question: "Will editing metadata make my PDF file bigger or slower to open?",
      answer:
        "No — the metadata fields are tiny compared to page content, and rewriting them has no meaningful effect on file size or how the document opens or renders.",
    },
    {
      question: "Can I remove a previous author's name entirely?",
      answer:
        "Yes — clear the Author field and save, and the output PDF will have that field empty rather than carrying over the old value.",
    },
    {
      question: "Does this affect the PDF's actual creation date?",
      answer:
        "No — only the modification date updates automatically on save. The original creation date field, if the PDF has one, is left as-is.",
    },
  ],
};
