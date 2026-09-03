import type { ToolContent } from "./types";

export const passportPhotoMakerContent: ToolContent = {
  heroSubtitle: "Crop a Photo to Standard Passport Photo Dimensions",
  overview: [
    "Passport and visa photos have strict, specific size requirements that vary by country — get the dimensions wrong and an application can be rejected outright, sending you back to take another photo and start the process over.",
    "This tool crops any photo to standard passport photo dimensions — including the US 2×2 inch standard and the 35×45mm size used across the UK, Schengen area, India, and many other countries — using a draggable, aspect-ratio-locked crop selection so you can position the face correctly within the frame.",
    "Beyond the single cropped photo, this tool also generates a 4×6 inch print sheet tiled with as many copies of your photo as fit — the standard way passport photos are printed at photo labs and pharmacies, letting you get multiple physical copies from a single 4×6 print without extra software.",
    "This is useful for preparing a passport or visa application photo to the correct dimensions, generating a printable sheet with multiple copies for physical printing, meeting a specific country's photo size requirement, and any official document photo preparation.",
  ],
  howItWorks: [
    {
      title: "Upload a photo and choose a size preset",
      description: "US 2×2in or international 35×45mm.",
    },
    {
      title: "Drag to position the crop area",
      description: "Locked to the correct aspect ratio for your chosen preset.",
    },
    {
      title: "Download the photo and print sheet",
      description: "A single cropped photo, plus a tiled 4×6in sheet for printing.",
    },
  ],
  examples: [
    {
      label: "Preparing a US passport photo",
      input: "A portrait photo, US 2×2in preset selected",
      output: "A 600×600px cropped photo plus a 4×6in sheet with multiple copies tiled",
    },
  ],
  faqs: [
    {
      question: "Does this guarantee my photo will be accepted for my passport application?",
      answer:
        "It correctly produces the right pixel dimensions for the size standard you select, but official requirements also cover things like background color, facial expression, lighting, and head positioning within the frame — always check your specific country's current official requirements beyond just the size.",
    },
    {
      question: "Which countries use the 35×45mm size?",
      answer:
        "It's the size standard used across the UK, the Schengen area (most of the EU), India, and many other countries worldwide — check your specific destination's current requirements to confirm, since standards occasionally change.",
    },
    {
      question: "What is the 4×6 inch print sheet for?",
      answer:
        "It's the standard way passport photos are physically printed — most photo labs and pharmacies print on 4×6in photo paper, so tiling multiple copies onto one sheet lets you get several physical prints from a single order rather than printing one photo per sheet.",
    },
    {
      question: "How many copies fit on the print sheet?",
      answer:
        "It depends on the photo size preset — the US 2×2in size typically fits several copies with margin spacing on a 4×6in sheet, calculated automatically based on your chosen preset's exact dimensions.",
    },
    {
      question: "Is my photo uploaded anywhere during this process?",
      answer:
        "No — cropping and print sheet generation both happen entirely in your browser using the Canvas API. Your photo is never uploaded to a server.",
    },
  ],
};
