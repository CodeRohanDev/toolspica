import type { BlogPost } from "@/lib/blog/types";

export const pdfExtractPagesPost: BlogPost = {
  toolSlug: "pdf-extract-pages",
  lang: "en",
  title: "How to Pull Specific Pages Out of a PDF (Instead of Sending the Whole Thing)",
  description:
    "Why sending an entire PDF when only a few pages matter is a bad habit, and how to extract just the pages you need.",
  sections: [
    {
      heading: "The over-sharing habit most people don't notice",
      body: [
        "It's the default move: someone asks for the signature page of a contract, and the easy thing to do is forward the whole 22-page document. It works, but it also hands over every clause, every unrelated attachment, and every bit of information they didn't ask for and don't need — not ideal for anything with financial terms, personal details, or clauses meant to stay between the original parties.",
        "Pulling out just the pages that were actually requested takes the same amount of effort as attaching the whole file, once you have a tool that makes selecting a page range as easy as clicking thumbnails or typing a range like \"22\" or \"4-7\".",
      ],
    },
    {
      heading: "Two ways to select pages, and when to use each",
      body: [
        "Clicking individual thumbnails is intuitive for a handful of scattered pages — page 3, page 9, page 15 from a long document. Typing a range like \"1-3,5,8-10\" is faster once you're dealing with a longer, mostly-contiguous block, since you don't have to hunt through thumbnails one at a time.",
        "You can combine both: type a range to get most of the way there, then click to add or remove a page or two at the edges. The selected pages stay highlighted on the thumbnail grid the whole time, so it's always visually obvious exactly what will end up in the output before you commit.",
      ],
    },
    {
      heading: "Order is preserved, even if your clicks aren't",
      body: [
        "However you select pages — clicking out of order, typing a range that lists things non-sequentially — the extracted document always comes out in the original document's page order. Page 5 stays before page 8 in the result even if you happened to click page 8 first. This matters for anything where sequence carries meaning, like consecutive pages of a form or a multi-page agreement.",
        "This is a small detail, but it's the difference between an extraction tool you can trust blindly and one where you'd feel obligated to double-check the output order every single time.",
      ],
    },
    {
      heading: "Extract vs. split vs. delete — picking the right one",
      body: [
        "These three tools solve related but different problems, and reaching for the wrong one just means extra steps. Extract keeps a chosen subset and discards the rest into nothing (you get one new file with just your selection). Split turns every single page into its own separate file. Delete keeps everything except the pages you mark for removal.",
        "A fast way to decide: if you're naming the pages you want, use Extract. If you're naming the pages you don't want, use Delete. If you want every page as its own file, use Split.",
      ],
    },
  ],
  faqs: [
    {
      question: "Can I extract a single page, like just the signature page?",
      answer:
        "Yes — type the single page number, or click just that one thumbnail. The output will be a one-page PDF containing exactly that page.",
    },
    {
      question: "Will the extracted pages still have selectable, searchable text?",
      answer:
        "Yes — pages are copied as PDF objects rather than rendered as images, so text stays fully selectable and searchable, and embedded fonts and images keep their original quality.",
    },
    {
      question: "What's the fastest way to select pages 4 through 7 plus page 12?",
      answer:
        "Type \"4-7,12\" into the range field — this selects pages 4, 5, 6, 7, and 12 in one step, faster than clicking five separate thumbnails.",
    },
  ],
};
