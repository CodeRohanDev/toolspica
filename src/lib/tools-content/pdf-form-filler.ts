import type { ToolContent } from "./types";

export const pdfFormFillerContent: ToolContent = {
  heroSubtitle: "Fill In a PDF's Existing Text Fields, Checkboxes & Dropdowns",
  overview: [
    "Fillable PDF forms — job applications, government paperwork, intake forms, W-9s — are everywhere, and printing one out just to fill it by hand and scan it back in is a step most people would rather skip. This tool reads a PDF's existing interactive form fields directly and lets you fill them in through a normal web form, then saves your entries back into the actual PDF field values.",
    "When you upload a PDF, the tool inspects it for AcroForm fields (the PDF standard's interactive form technology) and automatically builds an editable field for each one it finds: text inputs for text fields, toggle switches for checkboxes, and dropdown selectors for both dropdown lists and radio button groups, using each field's actual name and defined options exactly as they exist in the source PDF.",
    "This only works on PDFs that already have real, defined form fields built into them — a document that merely looks like a form (printed lines and labels with no interactive fields underneath, common in scanned or flattened forms) won't have anything for this tool to detect, and you'll see a message that no fillable fields were found. This is a fundamental distinction in the PDF format between a form that's visually laid out and one that's structurally interactive.",
    "Saving writes your entered values directly into the PDF's form field data using the same mechanism a full-featured PDF reader would use, so the resulting file opens with your entries already in place in any standard PDF viewer — the fields remain live and editable afterward too, unless you specifically flatten them with a tool like PDF Flatten.",
  ],
  howItWorks: [
    { title: "Upload a fillable PDF", description: "The tool detects existing text fields, checkboxes, dropdowns, and radio groups." },
    { title: "Fill in the fields", description: "Enter values through the generated web form for each detected field." },
    { title: "Save and download", description: "Your entries are written into the PDF's actual form field data." },
  ],
  examples: [
    { label: "Filling a job application PDF", input: "form with Name, Email, and Position dropdown fields", output: "same PDF with those fields filled in, ready to submit" },
  ],
  faqs: [
    { question: "Why does this tool say my PDF has no fillable fields?", answer: "The PDF needs real, interactive AcroForm fields built into it — a document that only visually looks like a form (printed lines and labels, common in scanned forms) has no underlying field data for this tool to detect or fill." },
    { question: "What types of form fields are supported?", answer: "Text fields, checkboxes, dropdown lists, and radio button groups — the four standard interactive field types defined by the PDF format, detected automatically from whatever the source PDF actually contains." },
    { question: "Will the filled-in fields still be editable after I download the PDF?", answer: "Yes — filling in a field doesn't remove its interactivity; anyone opening the result in a PDF reader could still change the values, unless you separately flatten the form using the PDF Flatten tool." },
    { question: "Can I fill a form on a scanned or photographed document?", answer: "No — a scanned image of a form has no underlying field data, since it's just pixels. This tool only works on PDFs with genuine, structurally-defined form fields." },
    { question: "Does this work on password-protected fillable forms?", answer: "Not directly — remove the password first with PDF Unlock, then fill in the resulting file's fields." },
  ],
};
