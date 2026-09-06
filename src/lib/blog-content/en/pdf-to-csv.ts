import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "pdf-to-csv",
  lang: "en",
  title: "How to Get a PDF Table Into Excel Without the Columns Falling Apart",
  description:
    "Why copy-pasting a table from a PDF into a spreadsheet breaks the columns, and how to convert it into clean, usable CSV instead.",
  sections: [
    {
      heading: "The copy-paste trap everyone tries first",
      body: [
        "The instinctive move when you need data from a PDF table is to select it, copy it, and paste it into Excel or Google Sheets. It almost never works cleanly. Sometimes every row lands in a single cell as one long string. Sometimes columns merge together with no delimiter between them. Sometimes the row order comes out scrambled entirely. This isn't a bug in your spreadsheet software — it's because a PDF has no actual concept of a \"table.\" It only stores where individual pieces of text sit on the page, so your PDF viewer's copy function is guessing at structure it was never told about.",
        "A dedicated PDF-to-CSV conversion does that reconstruction properly: it looks at where each piece of text sits, groups anything on the same horizontal line into a row, and splits that row into separate cells wherever there's a gap noticeably wider than normal character spacing. That's the same logic a human eye uses to read a table, just applied programmatically.",
      ],
    },
    {
      heading: "Why some tables come out perfect and others don't",
      body: [
        "This reconstruction technique works best on tables with consistent, even spacing — the kind produced by spreadsheet exports, invoicing software, and most professionally formatted reports. If a table was originally built in Excel and exported to PDF, expect a near-perfect result, because the columns had uniform spacing to begin with.",
        "Where it struggles is anything irregular: cells whose content wraps across two lines, merged cells, or a table where column widths were manually adjusted to different, inconsistent gaps. These get flagged as multiple rows instead of one, or split at the wrong point. There's no way around this without true visual table-structure data, which PDF simply doesn't store — so always scan the first few rows of your output before trusting the whole file.",
      ],
    },
    {
      heading: "The scanned-PDF gotcha",
      body: [
        "One thing this kind of tool can't do is pull data from a table that's actually a photograph or scan rather than real text — a PDF made by scanning a printed page has no text layer at all, just a picture of a table. If you try to convert one of these, you'll get an empty or near-empty result, not because something went wrong, but because there's no text data to extract in the first place.",
        "The fix is running the scanned PDF through an OCR tool first to generate a real text layer, then converting the OCR output. It's an extra step, but skipping it is the single most common reason people think table extraction \"doesn't work\" when the actual issue is the source file type.",
      ],
    },
    {
      heading: "Handling multiple tables in one document",
      body: [
        "If your PDF has separate tables spread across different pages — say, a quarterly report with a summary table on page 2 and a detailed breakdown on page 8 — a full-document conversion will combine everything into one continuous CSV, which usually isn't what you want if the tables have different column structures.",
        "The cleaner workflow is extracting just the relevant pages into their own PDF first, then converting each extracted set separately. That way each resulting CSV corresponds to exactly one table, with column headers that actually make sense together.",
      ],
    },
  ],
  faqs: [
    {
      question: "Why did my converted CSV put everything in the wrong columns?",
      answer:
        "This usually happens with tables that have inconsistent spacing, merged cells, or wrapped multi-line content — the conversion relies on gap width to detect column boundaries, so irregular layouts can throw it off. Clean, evenly-spaced tables convert far more reliably.",
    },
    {
      question: "Can I convert a scanned document's table this way?",
      answer:
        "Not directly — a scanned PDF is just an image with no underlying text, so there's nothing to extract. Run it through an OCR tool first to create a real text layer, then convert the result.",
    },
    {
      question: "Is it safe to convert a table with sensitive financial data?",
      answer:
        "It's safe when the conversion happens locally in your browser rather than uploading the file to a server — check that the tool you're using works that way before feeding it anything sensitive.",
    },
  ],
};
