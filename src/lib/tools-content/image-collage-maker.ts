import type { ToolContent } from "./types";

export const imageCollageMakerContent: ToolContent = {
  heroSubtitle: "Combine Multiple Photos into One Grid Collage",
  overview: [
    "Combining several photos into a single grid image — for a social media post, a printed keepsake, or a simple visual summary — usually means opening a design tool just for a simple layout task that shouldn't need one.",
    "This tool arranges any number of uploaded photos into an evenly-spaced grid layout, with adjustable column count and spacing between images. Each photo is automatically cropped to fill its grid cell using a cover-fit approach (scaling to fill the space completely, cropping any excess rather than leaving empty gaps or distorting the image).",
    "Photos fill the grid in the order you add them, left to right and top to bottom, giving predictable, easy-to-control placement without needing to manually position each image.",
    "This is useful for creating a simple photo grid collage for social media, combining a set of related photos into one shareable image, making a quick visual summary of a photo set, and any lightweight multi-photo layout task.",
  ],
  howItWorks: [
    {
      title: "Add multiple photos",
      description: "Select as many as you'd like to include.",
    },
    {
      title: "Set columns and spacing",
      description: "Photos fill the grid in the order added.",
    },
    {
      title: "Download your collage",
      description: "A single combined image, ready to share.",
    },
  ],
  examples: [
    {
      label: "Creating a 2-column photo collage",
      input: "6 vacation photos, 2 columns, 8px spacing",
      output: "A single image with all 6 photos arranged in a 2×3 grid",
    },
  ],
  faqs: [
    {
      question: "What does 'cover-fit' cropping mean for each photo?",
      answer:
        "Each photo is scaled up or down so it completely fills its grid cell with no empty space, then any part that extends beyond the cell is cropped away — the same behavior as a typical thumbnail grid, prioritizing a filled, consistent-looking layout over showing every pixel of the original photo.",
    },
    {
      question: "Can I control which photo goes in which grid position?",
      answer:
        "Photos fill the grid in the order you add them, left to right and top to bottom — to change the arrangement, remove and re-add photos in your desired order, since there's no drag-to-reorder within the grid itself.",
    },
    {
      question: "What happens if I have an odd number of photos for my grid?",
      answer:
        "The last row simply has fewer filled cells than a complete row would — the grid layout adapts to however many photos you've added rather than requiring an exact multiple of your column count.",
    },
    {
      question: "Can I use photos of very different aspect ratios together?",
      answer:
        "Yes — since each photo is cover-fit cropped to its cell regardless of its original proportions, portrait, landscape, and square photos can all be combined into the same uniform grid without any manual adjustment.",
    },
    {
      question: "Are my photos uploaded anywhere to create the collage?",
      answer:
        "No — the collage is assembled entirely in your browser using the Canvas API. Your photos are never uploaded to a server.",
    },
  ],
};
