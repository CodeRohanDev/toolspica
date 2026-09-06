import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "pdf-reorder-pages",
  lang: "en",
  title: "How to Fix Page Order in a PDF Without Re-Scanning Everything",
  description:
    "A scanner or bad export can leave pages out of order — here's how to fix the sequence without opening a desktop editor or re-scanning.",
  sections: [
    {
      heading: "Where a scrambled page order actually comes from",
      body: [
        "It happens more often than you'd think: a document feeder scans pages back-to-front, an app exports chapters in the wrong order, or someone stitches together a packet and gets two sections swapped. The document is otherwise fine — every page is there, correctly scanned, good quality — just in the wrong sequence. Re-scanning or re-exporting from scratch to fix that is a huge overreaction for what's really a simple rearrangement problem.",
        "A page-reorder tool solves exactly this: it doesn't touch the content of any page, it just changes which order they appear in.",
      ],
    },
    {
      heading: "Thumbnails plus arrows beats guessing blind",
      body: [
        "The reason this is worth using a dedicated tool for, instead of extracting and re-merging pages by hand, is visual verification: every page shows as a thumbnail, so you can actually see what you're moving instead of trusting a page number. Moving a page up or down shows its new position next to its original page number, so before you download anything you can double check — \"page 3 is now what was originally page 7\" — rather than finding out you got it wrong after sending the file to someone.",
        "This matters most on longer documents. Reordering 3 pages by eye is trivial; reordering 15 pages correctly without a visual reference is where mistakes creep in.",
      ],
    },
    {
      heading: "What reordering can't do (and what it's paired with)",
      body: [
        "A reorder tool changes sequence only — it doesn't add, remove, or split pages. If your actual problem is \"I need to pull out three pages and put them in a new PDF,\" that's a page-extraction tool. If it's \"I have two extra blank pages to get rid of,\" that's page deletion. Reordering is the right tool specifically when every page you need is already there, just arranged wrong — which, in practice, covers most scanner and export mistakes.",
        "A useful habit for repeat offenders (a scanner that consistently feeds pages in reverse) is checking whether the scanning app itself has a \"reverse order\" setting, so you fix the root cause instead of reordering the same way every single time.",
      ],
    },
    {
      heading: "Keeping the fix reversible until you're sure",
      body: [
        "Since the download button on a good reorder tool only activates once you've actually changed something, there's no risk of overwriting a correctly-ordered file with an identical \"reordered\" copy by mistake. It's still worth opening the downloaded file and spot-checking the first and last few pages before deleting your original — reordering is quick to redo, but only if you still have the source file to redo it from.",
      ],
    },
  ],
  faqs: [
    {
      question: "Does reordering pages reduce PDF quality?",
      answer:
        "No — pages are copied as PDF objects into their new sequence rather than being re-rendered as images, so text stays selectable, fonts stay embedded, and image quality is completely untouched by the reordering itself.",
    },
    {
      question: "Can I jump a page from position 1 to position 10 in one move?",
      answer:
        "Each move shifts a page one position at a time, so a big jump means repeating the move several times — this is deliberate, since it prevents an accidental large jump you didn't mean to make.",
    },
    {
      question: "Does the number of pages change after reordering?",
      answer:
        "No — reordering only changes sequence. Every page from the original file is still present in the output; if you also need to remove or extract specific pages, that's a separate step with a page-deletion or extraction tool.",
    },
  ],
};
