import type { BlogPost } from "@/lib/blog/types";

export const pdfDeletePagesPost: BlogPost = {
  toolSlug: "pdf-delete-pages",
  lang: "en",
  title: "How to Delete Pages From a PDF Without Rebuilding the Whole File",
  description:
    "Removing a blank scanned page, a duplicate, or an outdated cover sheet from a PDF without touching anything else in it.",
  sections: [
    {
      heading: "The almost-right PDF problem",
      body: [
        "Most PDFs that need pages deleted aren't badly broken — they're 95% correct. A scanner that occasionally feeds a blank sheet at the end of a batch, a duplicate page from a mis-feed, an outdated cover page left over from an earlier draft, or an internal note that was meant for a colleague, not the final recipient. The document is fine except for one or two pages that shouldn't be there.",
        "The instinct to \"just redo the whole thing\" is understandable but unnecessary — a delete-pages tool solves exactly this narrow problem, leaving 99% of your document completely untouched while removing the handful of pages that don't belong.",
      ],
    },
    {
      heading: "Marking what to remove, not what to keep",
      body: [
        "This tool works backwards from an extraction tool: instead of selecting the pages you want, you mark the ones you don't. For a document where you're removing one blank page out of forty, that's a much smaller and faster selection to make than marking the other thirty-nine pages you want to keep.",
        "Marked pages are visually dimmed with a trash icon on their thumbnail, so before you commit, it's immediately obvious which pages are about to disappear and which are staying — a quick visual double-check before an operation you can't easily undo after downloading.",
      ],
    },
    {
      heading: "The one thing it won't let you do",
      body: [
        "You can't delete every page — at least one has to remain, since a zero-page PDF isn't a meaningful file that anything can open. If you only want one specific page kept and everything else gone, that's actually the Extract Pages tool's job, not this one; think of Extract and Delete as complementary rather than the same tool used two different ways.",
        "This guard rail exists specifically to catch the situation where you mark everything for deletion by mistake — a small safety net for what would otherwise be a confusing empty result.",
      ],
    },
    {
      heading: "A useful combo: clean up, then merge",
      body: [
        "A common real workflow is deleting junk pages from several scanned documents first — stripping blank pages, duplicate covers, or stray notes from each — and then merging the cleaned-up files together into one final document. Doing the cleanup before the merge keeps the final combined PDF free of clutter, rather than merging everything first and then hunting through a much longer document to find and remove the same junk pages afterward.",
        "It's a small ordering choice, but cleaning up smaller individual files is noticeably easier than fixing the same problems once they're buried inside one large merged document.",
      ],
    },
  ],
  faqs: [
    {
      question: "What happens if I accidentally mark every page for deletion?",
      answer:
        "The tool won't let the delete action complete with zero pages remaining — at least one page must stay, so you'll need to unmark at least one before it will proceed.",
    },
    {
      question: "Do the pages I keep lose any quality from this process?",
      answer:
        "No — kept pages are copied as PDF objects, not re-rendered as images, so their original text selectability, fonts, and image quality are completely preserved.",
    },
    {
      question: "Can I select several scattered pages to delete at once?",
      answer:
        "Yes — type a range like \"1-3,5,8-10\" to mark pages 1 through 3, plus page 5, plus pages 8 through 10 for removal in one step, instead of clicking each individually.",
    },
  ],
};
