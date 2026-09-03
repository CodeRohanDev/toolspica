import type { ToolContent } from "./types";

export const pdfFlattenContent: ToolContent = {
  heroSubtitle: "Turn Fillable Form Fields Into Permanent, Uneditable Page Content",
  overview: [
    "PDF forms — the kind with text boxes, checkboxes, dropdowns, and radio buttons you can click into and fill out — are built from a special layer of interactive AcroForm fields sitting on top of the page content. That's convenient while the form is still being filled in, but it's often the wrong state for a finished document: anyone who opens a filled-but-not-flattened form can still change the answers, checkboxes can get accidentally toggled, and some viewers render form fields inconsistently depending on their PDF engine. Flattening solves this by converting every field's current value into permanent, static page content and removing the underlying interactive field entirely.",
    "This tool loads your PDF, reads its AcroForm fields with pdf-lib, and reports how many fillable fields it found before you commit to anything. If you've already filled the form out (in this browser, in Acrobat, in Preview, wherever), those entered values are exactly what gets baked in — flattening doesn't change what the fields say, it just locks them in place. A form with all its fields still blank will flatten to a document with permanently blank-looking fields, which is rarely what you want, so it's worth double-checking the fields are actually filled before running this.",
    "The underlying operation is pdf-lib's own `form.flatten()` — a well-tested, purpose-built routine that walks every field, renders its current appearance directly into the page's content stream, and deletes the field and its widget annotations. Unlike the PDF Redact or PDF Annotator tools on this site, flattening does not rasterize the page into an image: the rest of the page's original text and vector content is left completely untouched, and stays fully selectable and searchable. Only the form fields themselves become static.",
    "Once flattened, the document behaves like any ordinary, non-interactive PDF — it opens the same in every viewer, prints exactly as shown, and can't be accidentally (or deliberately) edited by whoever receives it next. That makes flattening a natural last step before archiving a completed application, submitting a signed agreement, or sending a finalized form to someone who should be able to read it but not alter the answers.",
  ],
  howItWorks: [
    { title: "Upload your PDF form", description: "The tool scans it and tells you how many fillable fields it found." },
    { title: "Confirm it's ready", description: "Make sure the fields already hold the values you want locked in." },
    { title: "Flatten and download", description: "Every field becomes permanent page content; the form can no longer be edited." },
  ],
  examples: [
    { label: "Locking a completed application", input: "12-field PDF form, all fields filled in", output: "Same PDF with 0 fillable fields — answers are now permanent page content" },
  ],
  faqs: [
    { question: "Will flattening change any of the values in my form?", answer: "No — it locks in whatever values are currently in the fields exactly as they are. If a field is blank, it flattens to a blank-looking area; fill in the form first if you want the entered answers preserved." },
    { question: "Does flattening turn my PDF into an image, like Redact or Compress do?", answer: "No. Only the form fields become static — the rest of the page's original text and graphics are left completely untouched and stay fully selectable, searchable, and sharp at any zoom level." },
    { question: "Can I undo flattening later and get the editable form back?", answer: "Not from the flattened file itself — the interactive fields are permanently removed. Keep your original, unflattened PDF if you might need to edit the form again." },
    { question: "What happens if my PDF has no form fields at all?", answer: "The tool will tell you it found none and the flatten button stays disabled — there's nothing to convert, so downloading would just give you back the same file." },
    { question: "Why would I flatten a form instead of just leaving it as-is?", answer: "An un-flattened form can be edited by anyone who opens it, which is a problem once a form represents a final, signed, or submitted answer — flattening prevents accidental or intentional changes and ensures the document displays consistently across every PDF viewer." },
  ],
};
