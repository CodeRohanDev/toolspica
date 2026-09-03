import type { ToolContent } from "./types";

export const licensePlateOcrContent: ToolContent = {
  heroSubtitle: "Read a License Plate From a Photo",
  overview: [
    "Reading a license plate number from a photo — for a parking record, an incident note, a personal log — is a specialized OCR task where the goal is a clean alphanumeric string, not full prose text. This tool runs the recognition (via Tesseract, compiled to WebAssembly, entirely in your browser) then strips the result down to letters and numbers only, matching a typical plate's format.",
    "The cleanup step removes spaces, dashes, and any other recognized characters that aren't letters or digits, since plates are conventionally rendered as a continuous alphanumeric code — this produces a cleaner result than raw OCR output would, which often includes stray punctuation or misread border characters.",
    "Accuracy depends heavily on the photo: a cropped, front-on, well-lit shot of just the plate recognizes far more reliably than a wider photo including the vehicle, since surrounding visual clutter (bumpers, reflections, background) can confuse the recognition.",
    "Everything runs locally — the photo and recognized plate content never leave your browser, relevant for anything involving vehicle identification you'd rather not send to a third-party server.",
  ],
  howItWorks: [
    { title: "Upload a photo of the plate", description: "A cropped, front-on, well-lit shot works best." },
    { title: "Recognition runs locally", description: "Text is extracted and cleaned to letters and numbers only." },
    { title: "Copy the plate number", description: "Review against the photo — angled shots reduce accuracy." },
  ],
  examples: [
    { label: "Reading a plate from a parking photo", input: "cropped, front-on plate photo", output: "cleaned alphanumeric plate text" },
  ],
  faqs: [
    { question: "Why does the result strip out spaces and dashes?", answer: "Plates are conventionally a continuous alphanumeric code — the cleanup step removes spaces, dashes, and other non-alphanumeric characters that raw OCR output often includes from stray marks or border misreads." },
    { question: "What kind of photo works best?", answer: "A cropped, front-on, well-lit shot of just the plate — a wider photo including the vehicle or an angled shot reduces accuracy since surrounding clutter can confuse recognition." },
    { question: "Is my photo uploaded anywhere?", answer: "No — recognition runs entirely in your browser via WebAssembly." },
    { question: "Can this recognize plates from any country?", answer: "It uses a general English-character OCR model, so plates using Latin letters and numbers work reasonably well, while plates with non-Latin scripts would need a different language model, similar to Multi-language OCR." },
    { question: "Should I trust this for legal or enforcement purposes?", answer: "Always manually verify against the actual photo — OCR can misread similar-looking characters (0/O, 1/I, 8/B), which matters a great deal for something like a plate number." },
  ],
};
