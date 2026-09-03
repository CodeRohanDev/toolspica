import type { ToolContent } from "./types";

export const textToSlugBulkContent: ToolContent = {
  overview: [
    "Converting a single title into a URL slug is a one-line problem, easily handled by the Slug Generator or Slugify Tool — but converting fifty blog post titles, product names, or documentation page headings into their slug equivalents, one at a time, is a genuinely tedious task that scales badly with a list's size. This tool applies the exact same slugify transformation to every line of a pasted list at once, turning a whole batch of titles into their slug equivalents in a single pass.",
    "This comes up in real, recurring situations: migrating content between platforms where you need to pre-generate slugs for an import script or spreadsheet, auditing a site's existing URL structure by converting a list of page titles to see what their slugs should be, generating consistent file names for a batch of documents from their titles, or preparing bulk data for a CMS import where slugs need to be provided explicitly rather than auto-generated one page at a time through a UI.",
    "Each line is processed completely independently using the same reliable rules as the single-line slug tools: Unicode accented characters are normalized to their plain-ASCII equivalents, everything is lowercased, invalid characters are stripped, and spaces are collapsed into single hyphens — so a 50-line input produces a clean 50-line output, with each output line corresponding exactly to the input line in the same position, making it easy to match slugs back to their original titles side by side.",
    "The tool reports how many non-empty lines were processed, giving you a quick sanity check that the expected number of slugs were generated — useful confirmation before pasting a large batch into a spreadsheet or import script where a silently dropped or merged line could cause a subtle mismatch between your titles and their intended slugs.",
  ],
  howItWorks: [
    {
      title: "Paste your list of titles",
      description: "One title or phrase per line.",
    },
    {
      title: "Slugs are generated for every line",
      description: "Each line is independently converted using standard slugify rules.",
    },
    {
      title: "Copy the full list of slugs",
      description: "Line-for-line matching output is ready to copy into a spreadsheet or script.",
    },
  ],
  examples: [
    {
      label: "Bulk-converting three titles",
      input: "10 Best Productivity Tools\nHow to Learn JavaScript Fast\nCafé Résumé Tips",
      output: "10-best-productivity-tools\nhow-to-learn-javascript-fast\ncafe-resume-tips",
    },
  ],
  faqs: [
    {
      question: "Does the order of my output match my input?",
      answer:
        "Yes — each output line corresponds exactly to the input line in the same position, so line 5 of your input always produces line 5 of your output, making it easy to line the two lists up side by side in a spreadsheet.",
    },
    {
      question: "What happens if two different titles produce the same slug?",
      answer:
        "This tool doesn't detect or flag duplicate slugs — each line is converted independently. If your titles are similar enough to collide (like \"My Post\" and \"My Post!\" both becoming \"my-post\"), you'll need to manually check for and resolve duplicates before using the slugs, since most systems require unique slugs.",
    },
    {
      question: "Can I paste titles directly from a spreadsheet column?",
      answer:
        "Yes — copying a column of cells from Excel or Google Sheets and pasting it here works directly, since each cell becomes its own line, which is exactly the one-per-line format this tool expects.",
    },
    {
      question: "How is this different from the single Slug Generator tool?",
      answer:
        "Slug Generator is built for converting one title at a time, with configuration options like separator choice. This tool is built specifically for bulk, line-by-line processing of many titles at once, using the standard fixed slugify convention with no per-line configuration needed.",
    },
    {
      question: "Does it skip blank lines in my list?",
      answer:
        "Blank lines are processed too and produce an empty output line in the same position, preserving the line-for-line correspondence with your input rather than silently removing them and shifting subsequent lines out of alignment.",
    },
  ],
};
