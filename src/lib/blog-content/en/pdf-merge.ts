import type { BlogPost } from "@/lib/blog/types";

export const pdfMergePost: BlogPost = {
  toolSlug: "pdf-merge",
  lang: "en",
  title: "How to Merge PDF Files Online for Free (Without Losing Quality)",
  description:
    "A step-by-step guide to combining multiple PDF files into one, without installing software or uploading sensitive documents anywhere.",
  sections: [
    {
      heading: "Why you'd need to merge PDFs in the first place",
      body: [
        "Most people run into this the same way: you've scanned a few pages separately, or you've got a resume and a cover letter as two different files, or an accountant asks for \"all your receipts in one PDF\" instead of twelve attachments. Email clients and application portals often accept a single attachment, or cap how many files you can upload, so combining everything into one document isn't optional — it's the only way to submit it cleanly.",
        "The traditional way to solve this — printing everything to a virtual PDF printer, or opening a paid desktop app just for one task — is overkill for something you might do once a month. A browser-based merge tool exists specifically for that gap: you need the result in the next thirty seconds, not after installing something.",
      ],
    },
    {
      heading: "What actually happens when you merge a PDF",
      body: [
        "A good merge tool doesn't take a screenshot of each page and glue images together — that would blur text and balloon the file size. Instead, it copies the actual page objects (the vector text, fonts, and embedded images) from each source file directly into a new PDF container. The result is that text in the merged file is still selectable, still searchable, and still prints at full resolution, because nothing was ever converted to a flat image in between.",
        "This also means the merged file's size is roughly the sum of your input files, not some inflated re-encoded version. If you're merging a 2MB scan and a 500KB text document, expect something close to 2.5MB back, not 10MB.",
      ],
    },
    {
      heading: "Getting the order right",
      body: [
        "The one step people skip and regret is checking the page order before hitting merge. Most tools list your files in the order you selected them and let you drag or use up/down arrows to reorder — do this before merging, because the list order becomes the final page order with no way to fix it afterward without starting over.",
        "A simple habit: name your files with a number prefix before uploading (01-cover-letter.pdf, 02-resume.pdf) so the upload order matches your intended reading order automatically.",
      ],
    },
    {
      heading: "When a browser-based tool is the right call — and when it isn't",
      body: [
        "For anything containing personal or financial information — signed contracts, medical records, tax documents — a tool that processes everything locally in your browser (no upload to a server) is meaningfully safer than a random online converter that silently uploads your file first. Check for that explicitly; not every free PDF site works this way.",
        "One thing browser-based merging generally can't do: combine password-protected PDFs directly. You'll need to remove the password first (a PDF unlock tool handles that), then merge the unlocked file — merging an encrypted PDF as-is will just fail to load.",
      ],
    },
  ],
  faqs: [
    {
      question: "Will merging change my PDF's page size or orientation?",
      answer:
        "No — each page keeps its original dimensions and orientation exactly as it was in the source file. If you merge a portrait resume with a landscape spreadsheet export, the merged PDF will simply have mixed page orientations, which is normal and expected.",
    },
    {
      question: "Can I merge PDFs on my phone, or do I need a computer?",
      answer:
        "A browser-based merge tool works the same on mobile as on desktop, since it's just a webpage — you can select files from your phone's storage or a cloud drive and merge them without installing an app.",
    },
    {
      question: "Is it safe to merge financial or legal documents this way?",
      answer:
        "It's safe specifically when the tool processes files locally in your browser rather than uploading them to a server first — look for that guarantee before merging anything sensitive on an unfamiliar site.",
    },
  ],
};
