import type { ToolContent } from "./types";

export const htmlToPdfContent: ToolContent = {
  heroSubtitle: "Render HTML and Save It as a PDF Using Your Browser's Print Dialog",
  overview: [
    "Turning a piece of HTML — a snippet, an email template, a generated report fragment — into a PDF usually pulls in a heavyweight rendering library just to reproduce what a browser already does natively every time it prints a page. This tool skips that entirely: paste your HTML, see it rendered live in a preview, and use your browser's own built-in print-to-PDF capability to save it, with zero extra libraries and zero uploads.",
    "As you type or paste HTML into the source box, a live preview renders it immediately in an isolated frame with basic readable defaults (a clean system font and comfortable padding) applied, so you can see roughly how the content will look before generating the PDF. This isn't a full page layout engine simulation — it's your actual browser rendering the actual HTML, which is about as accurate a preview as is possible to get.",
    "Clicking \"Print / Save as PDF\" opens your browser's native print dialog scoped to just the rendered content, where choosing \"Save as PDF\" as the destination (available in every modern browser, on both desktop and mobile) produces the final PDF file. This is a deliberate design choice rather than a shortcut: browsers already contain a highly capable, standards-compliant HTML-to-PDF rendering pipeline used by millions of print jobs daily, so reproducing that with a separate library would be redundant and much heavier.",
    "Because this uses your browser's actual rendering and print engine, the output faithfully handles real CSS, fonts, and layout the same way printing any web page would — including print-specific CSS if you include it in your source. The one difference from a typical tool in this category is the extra step of the print dialog itself, rather than a single-click direct file download; that trade-off is what avoids pulling in an entire additional rendering library just for this one conversion.",
  ],
  howItWorks: [
    { title: "Paste or type your HTML", description: "The source updates a live preview immediately." },
    { title: "Check the preview", description: "See exactly how the content will render before generating anything." },
    { title: "Print and choose Save as PDF", description: "Your browser's native print dialog produces the final PDF file." },
  ],
  examples: [
    { label: "Turning an HTML snippet into a shareable PDF", input: "an HTML email template", output: "a PDF saved via the print dialog, matching the rendered preview exactly" },
  ],
  faqs: [
    { question: "Why does this open a print dialog instead of downloading a PDF directly?", answer: "It deliberately uses your browser's own built-in, standards-compliant HTML-to-PDF rendering (the same engine used every time you print any web page) rather than pulling in a separate, heavier rendering library just for this one conversion — the print dialog's \"Save as PDF\" option is the direct interface to that capability." },
    { question: "Will my CSS and fonts render correctly?", answer: "Yes — since it's your actual browser rendering the actual HTML and CSS you provide, styling, fonts, and layout are handled the same way they would be for any web page your browser displays or prints." },
    { question: "Is my HTML content uploaded anywhere?", answer: "No — the HTML is rendered directly in an isolated frame within your browser tab; nothing is sent to a server at any point." },
    { question: "Can I use print-specific CSS (like @media print rules)?", answer: "Yes — since the actual print dialog is used to generate the PDF, any print-specific CSS included in your HTML source will be respected the same way it would be when printing any web page." },
    { question: "Does the preview show exactly what the final PDF will look like?", answer: "Very closely — the preview is your actual browser rendering the actual HTML, so it's about as accurate as a preview can be, though final pagination (where page breaks fall) is only fully determined once you reach the print dialog itself." },
  ],
};
