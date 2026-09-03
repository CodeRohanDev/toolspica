import type { ToolContent } from "./types";

export const excelToPdfContent: ToolContent = {
  heroSubtitle: "Convert an Excel Spreadsheet's First Sheet Into a PDF",
  overview: [
    "Sharing spreadsheet data as a PDF is common when the recipient just needs to view or print a table rather than edit it — a report, a price list, an invoice — and doing that without opening Excel itself usually isn't possible without a conversion tool. This tool reads an .xlsx file directly and renders its first sheet as a simple grid PDF, entirely in your browser, with no Excel installation or upload required.",
    "Since .xlsx is a ZIP archive of XML documents, this tool uses a from-scratch ZIP reader to open the file and locate its first worksheet, then parses the cell data — including proper support for both inline string values and Excel's shared-strings table (the standard mechanism Excel uses to avoid repeating identical text across many cells), so text values come through correctly regardless of which storage method the original file used.",
    "Each row and column of the extracted data is laid out into an evenly-spaced grid on the PDF page, with the header row (the first row) rendered in bold to distinguish it from the data rows below, and the page width automatically scaled to accommodate however many columns the sheet contains.",
    "This is a simple, values-only conversion: formulas are not evaluated (only their last-calculated cached values, if present as plain text, would show — actual formula recalculation isn't performed), and cell formatting, colors, conditional formatting, charts, and any sheets beyond the first are not carried over. For a document where visual fidelity to the original spreadsheet's formatting matters, exporting directly from Excel will produce a more faithful result — but for a quick, private, no-upload way to get a spreadsheet's data into a shareable PDF table, this handles it entirely on your device.",
  ],
  howItWorks: [
    { title: "Upload your .xlsx file", description: "The spreadsheet's internal XML is read directly." },
    { title: "Cell data is extracted", description: "The first sheet's values are read, resolving shared strings correctly." },
    { title: "Download the PDF", description: "A simple grid-table PDF is generated from the extracted data." },
  ],
  examples: [
    { label: "Sharing a price list as PDF", input: "Excel file with a 20-row, 4-column price list on Sheet1", output: "a PDF grid table with the same rows and columns, header row bolded" },
  ],
  faqs: [
    { question: "Will formulas be recalculated in the PDF?", answer: "No — only whatever text value is stored in each cell is shown. Live formula recalculation isn't performed, since this reads the file's raw stored data rather than running a spreadsheet engine." },
    { question: "What happens to charts, colors, and cell formatting?", answer: "They're not carried over — this produces a simple, plain grid of cell values only, since reconstructing full visual formatting would require a much more complete spreadsheet rendering engine than this lightweight conversion provides." },
    { question: "Does this convert every sheet in my workbook?", answer: "No — only the first sheet is converted. If you need other sheets, they'd need to be reordered to be first, or converted using a different approach for multi-sheet workbooks." },
    { question: "Is my spreadsheet uploaded to a server for this conversion?", answer: "No — the .xlsx file's internal ZIP archive is read and parsed entirely in your browser; nothing is sent anywhere." },
    { question: "Why does the page get wider for spreadsheets with many columns?", answer: "The PDF page width automatically scales up based on how many columns your sheet contains, so that each column gets reasonable space rather than being squeezed into a fixed-width page." },
  ],
};
