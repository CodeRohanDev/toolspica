import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "pdf-form-filler",
  lang: "en",
  title: "Why Some PDF Forms Fill In Automatically and Others Don't",
  description:
    "The real reason a PDF form filler works perfectly on some documents and finds nothing on others — and what to do about the second case.",
  sections: [
    {
      heading: "Two PDFs that look identical, but aren't",
      body: [
        "Open two PDF forms side by side and they can look completely identical — labeled boxes, ruled lines, a layout clearly meant to be filled in. Yet one loads into a form-filler tool with every field ready to type into, and the other shows \"no fillable fields found.\" The difference has nothing to do with how the form looks and everything to do with whether it was actually built with the PDF format's interactive form technology (called AcroForm fields) or just designed to look like a form using regular lines and text.",
        "This trips people up constantly, because visually there's often no way to tell the difference just by looking — you find out only by trying to fill it in.",
      ],
    },
    {
      heading: "What's actually happening under the hood",
      body: [
        "A form-filler tool doesn't guess where fields might be based on layout — it reads the PDF's internal structure for genuine AcroForm objects: text fields, checkboxes, dropdowns, radio groups, each with a real name and defined properties baked into the file itself. When it finds them, it builds a matching input for each one automatically, using the field's actual name and options exactly as defined in the source document.",
        "When a PDF was created by printing a Word document or scanning a paper form, none of that structure exists — it's visually a form to a human eye, but structurally it's just static lines and text with nothing interactive underneath. That's precisely the case that produces \"no fillable fields found,\" and it's not a bug, it's an accurate report of what's actually in the file.",
      ],
    },
    {
      heading: "What to do when your form has nothing fillable",
      body: [
        "If the source of the form is a website or organization that generated it programmatically (a government portal, a company's HR system), there's often a genuinely fillable version available directly from them — worth checking before assuming you have to fill it by hand. If what you have is genuinely just a scanned or flattened form with no field data, a PDF editor that lets you place text anywhere on the page is the practical workaround: it won't be a true fillable form, but it gets your answers onto the document.",
        "Once you've filled in a genuinely fillable form, the fields typically stay live and editable in the saved file — which is expected, and only becomes a problem if you specifically need the values locked in place, which is what a flatten step is for.",
      ],
    },
  ],
  faqs: [
    {
      question: "Why does my form show \"no fillable fields found\" when it clearly has blanks to fill?",
      answer:
        "Visual blanks (lines and boxes designed to look fillable) are different from real AcroForm fields built into the PDF's structure. A scanned or flattened form has no underlying field data for a tool to detect, even though it looks exactly like a form that should be fillable.",
    },
    {
      question: "Will my filled-in answers stay editable after I save the form?",
      answer:
        "Yes, by default — filling a field doesn't lock it, so anyone opening the file afterward could still change the values. Use a separate flatten step if you need the entered values to become permanent, non-editable content.",
    },
    {
      question: "Can this fill in a form I photographed with my phone?",
      answer:
        "No — a photo or scan is just an image with no interactive field data underneath, regardless of how form-like it looks. Only PDFs with genuine, structurally-defined fields can be auto-detected and filled this way.",
    },
  ],
};
