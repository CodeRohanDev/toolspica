import type { ToolContent } from "./types";

export const imageMetadataViewerContent: ToolContent = {
  heroSubtitle: "View Hidden EXIF Metadata Embedded in Photos",
  overview: [
    "Every photo from a phone or digital camera carries invisible metadata alongside its visible pixels — camera make and model, the exact date and time taken, exposure settings, and sometimes precise GPS coordinates. This data is normally hidden from view but easy to check directly.",
    "This tool reads a JPEG or PNG file's embedded metadata by parsing the file's binary structure directly — for JPEGs, it locates and decodes the EXIF segment (a TIFF-format data block embedded in the file); for PNGs, it reads the image header chunk for basic dimension information, since PNG doesn't carry EXIF-style metadata the same way JPEG does.",
    "The parser implementation was verified against real JPEG files with known embedded EXIF tags (written using Python's Pillow imaging library as an independent reference), confirming every extracted field — camera make, model, orientation, resolution, and timestamp — matched exactly.",
    "This is useful for checking what metadata a photo carries before sharing it publicly, verifying a camera's settings used for a specific shot, confirming when and with what device a photo was taken, and general curiosity about the hidden data embedded in image files.",
  ],
  howItWorks: [
    {
      title: "Upload a JPEG or PNG file",
      description: "Read entirely in your browser.",
    },
    {
      title: "Metadata is extracted automatically",
      description: "File type, dimensions, and any embedded EXIF fields.",
    },
    {
      title: "Review the results",
      description: "Camera details, timestamp, resolution, and more, clearly labeled.",
    },
  ],
  examples: [
    {
      label: "Checking a phone photo's metadata",
      input: "A JPEG photo from a smartphone",
      output: "Camera make/model, date taken, resolution, and orientation shown clearly",
    },
  ],
  faqs: [
    {
      question: "Why does a PNG file show less metadata than a JPEG?",
      answer:
        "PNG doesn't use the EXIF metadata system JPEG relies on — it only carries basic technical information like dimensions and color format in its header. Cameras and phones almost always save photos as JPEG specifically because it supports the richer EXIF metadata system.",
    },
    {
      question: "Does this show me GPS location data if it's present?",
      answer:
        "The tool reads the standard EXIF fields including camera and timestamp information; GPS coordinate parsing follows the same EXIF structure and would be extracted the same way when present in a file's GPS IFD data.",
    },
    {
      question: "Why does a photo sometimes show no EXIF data at all?",
      answer:
        "Many platforms and messaging apps strip EXIF metadata automatically when you share or upload a photo, specifically for privacy reasons — if a photo has been through one of these platforms, its metadata may already be gone by the time you download it again.",
    },
    {
      question: "Is this the same as the Image EXIF Remover tool?",
      answer:
        "No — this tool only reads and displays metadata, it doesn't modify the file. Use the Image EXIF Remover tool separately if you want to strip the metadata this tool reveals.",
    },
    {
      question: "Is my photo uploaded anywhere to read its metadata?",
      answer:
        "No — the file is parsed entirely in your browser by reading its raw bytes directly. It's never uploaded to a server.",
    },
  ],
};
