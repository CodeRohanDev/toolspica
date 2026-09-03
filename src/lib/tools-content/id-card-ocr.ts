import type { ToolContent } from "./types";

export const idCardOcrContent: ToolContent = {
  heroSubtitle: "Extract Text From an ID Card, Entirely On-Device",
  overview: [
    "ID cards, driver's licenses, and similar documents often need their printed text copied somewhere — a form, a record, a verification note — without manually retyping every field. This tool recognizes the printed text on an ID card photo using a real OCR engine (Tesseract, compiled to WebAssembly) that runs entirely inside your browser.",
    "Given how sensitive ID document content is — full legal names, dates of birth, ID numbers — running this entirely on-device rather than uploading to a server is a genuinely important property, not just a convenience. Nothing about your ID card image or its content is ever transmitted anywhere during recognition.",
    "This produces generic recognized text, not structured field extraction — it doesn't automatically separate the name, date of birth, ID number, and other fields into distinct labeled outputs, since ID card layouts vary enormously across issuing countries and document types.",
    "Recognition accuracy depends on photo quality — a clear, well-lit, straight-on photo of the card recognizes far more reliably than an angled or glare-affected shot, which is true of OCR generally but especially relevant for the small, dense text typical on ID documents.",
  ],
  howItWorks: [
    { title: "Upload a photo of the ID card", description: "A clear, straight-on, well-lit photo works best." },
    { title: "Recognition runs locally", description: "Text is extracted entirely on your device, nothing uploaded." },
    { title: "Copy or download the text", description: "Review the recognized fields manually." },
  ],
  examples: [
    { label: "Copying text from a driver's license", input: "clear photo of an ID card", output: "recognized printed text from the card" },
  ],
  faqs: [
    { question: "Is my ID card image uploaded anywhere?", answer: "No — recognition runs entirely on your device via WebAssembly. Given how sensitive ID content is, this is a deliberate design choice, not just a convenience." },
    { question: "Does this separate the name, DOB, and ID number automatically?", answer: "No — this produces generic recognized text without structured field separation, since ID card layouts vary widely across countries and document types." },
    { question: "What photo quality works best?", answer: "A clear, well-lit, straight-on photo without glare — angled shots or reflections on laminated cards significantly reduce recognition accuracy." },
    { question: "Can this read holographic or security-printed text?", answer: "No — this only recognizes standard printed text; embedded security features, holograms, or microprint aren't something OCR can reliably read." },
    { question: "Should I trust this for legal or official purposes?", answer: "Always manually verify the recognized text against the original document — OCR can make errors, especially on small or dense card text." },
  ],
};
