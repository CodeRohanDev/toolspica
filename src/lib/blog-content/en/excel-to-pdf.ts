import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "excel-to-pdf",
  lang: "en",
  title: "Sharing a Spreadsheet Without Handing Over the Formulas",
  description:
    "Why converting an Excel file to PDF before sharing protects your formulas and formatting from accidental edits, and what actually gets left behind.",
  sections: [
    {
      heading: "An .xlsx file shares more than you might mean to",
      body: [
        "Send someone a spreadsheet directly and you've handed them everything — every formula, every hidden calculation, every conditional formatting rule, and the ability to accidentally (or deliberately) change a number and break the whole thing without you knowing. Most of the time, the person you're sending a price list, invoice, or report to just needs to see the numbers, not manipulate the machinery behind them.",
        "A PDF version of the same data solves this cleanly: the recipient sees exactly the rows and columns you intended, with no risk of a stray keystroke corrupting a formula three cells away.",
      ],
    },
    {
      heading: "What actually gets rendered",
      body: [
        "The conversion reads an .xlsx file's underlying ZIP-and-XML structure directly, pulls the first worksheet's cell values (correctly resolving Excel's shared-strings table, the mechanism Excel uses internally to avoid repeating identical text across many cells), and lays each row and column out as an evenly-spaced grid on the page, with the header row bolded to separate it visually from the data below.",
        "The page width scales automatically based on how many columns the sheet has, so a wide spreadsheet doesn't get awkwardly squeezed into a narrow, fixed page — this handles both a simple four-column list and a wider data table without manual adjustment.",
      ],
    },
    {
      heading: "What doesn't survive: formulas, colors, and charts",
      body: [
        "This produces a values-only grid — whatever text is currently stored in each cell is what shows up, with no live formula recalculation (a cell showing a formula's last-computed result will show that stored value, not a re-run of the formula itself). Conditional formatting, cell colors, charts, and any sheets beyond the first one in the workbook aren't included, since reconstructing full visual fidelity to Excel's rendering would need a much heavier tool than a lightweight grid conversion.",
      ],
    },
    {
      heading: "When PDF is the wrong format to send",
      body: [
        "If the recipient actually needs to do something with the data — recalculate a total with different inputs, filter a list, or build their own chart from it — sending a PDF instead of the real spreadsheet gets in their way rather than helping. The PDF conversion is for the specific case where viewing or printing is the whole job, not for handing off working data someone else needs to manipulate further.",
        "A reasonable middle ground for something like an invoice or price list: keep the working .xlsx file for your own records, and send the PDF version as the thing that actually goes out the door, so the two purposes never fight each other.",
      ],
    },
  ],
  faqs: [
    {
      question: "Will my spreadsheet's formulas be recalculated in the PDF?",
      answer:
        "No — whatever value is currently stored in each cell is what appears in the output. Live formula recalculation isn't performed; this reads the file's stored data rather than running a spreadsheet engine.",
    },
    {
      question: "Does this convert every sheet in my workbook?",
      answer:
        "No — only the first sheet converts. If you need a different sheet included, it would need to be reordered to be first in the workbook before converting.",
    },
    {
      question: "What happens to cell colors and conditional formatting?",
      answer:
        "They're not carried over — the output is a simple, plain grid of values with just the header row bolded for clarity. Full visual formatting isn't reconstructed.",
    },
  ],
};
