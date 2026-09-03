import type { ToolContent } from "./types";

export const tiffToJpgContent: ToolContent = {
  heroSubtitle: "Convert TIFF Files to Universally Compatible JPG",
  overview: [
    "TIFF is a common format for scanners, professional photography, and print workflows, but browsers can't display it directly and plenty of everyday tools and platforms don't accept it — making conversion to JPG necessary before a TIFF file can be viewed or shared normally online.",
    "This tool includes a from-scratch TIFF decoder built specifically for this site (since browsers have no native TIFF support at all, unlike most other image formats), supporting uncompressed and PackBits-compressed TIFF files — the two most common cases produced by scanners and standard image editing software.",
    "The decoder was verified against real TIFF files written by Pillow (Python's imaging library) in both supported compression modes, with decoded pixel colors matching Pillow's own independent reader exactly at multiple sample points. LZW-compressed TIFFs (a different, more complex compression scheme) aren't currently supported and are detected and reported clearly rather than silently producing a broken image.",
    "This is useful for converting a scanned document or photo from TIFF to a web-friendly JPG, preparing professional photography files for online sharing, converting TIFF files for use in software that doesn't support the format, and general TIFF-to-JPG compatibility conversion.",
  ],
  howItWorks: [
    {
      title: "Upload a TIFF file",
      description: "Uncompressed or PackBits-compressed.",
    },
    {
      title: "Decoding happens automatically",
      description: "Using a from-scratch TIFF parser built for this site.",
    },
    {
      title: "Download as JPG",
      description: "Converted at high quality, ready for normal use.",
    },
  ],
  examples: [
    {
      label: "Converting a scanned document",
      input: "scan.tiff (uncompressed)",
      output: "scan.jpg, viewable in any browser or image viewer",
    },
  ],
  faqs: [
    {
      question: "Why doesn't the browser just handle TIFF the way it handles other formats?",
      answer:
        "Unlike JPEG, PNG, WebP, and even AVIF, no major browser has ever added native TIFF decoding support — it's simply not part of the standard web image format set, which is exactly why this tool needed a from-scratch decoder rather than relying on the browser's built-in image handling.",
    },
    {
      question: "What does it mean if I get an 'unsupported compression' error?",
      answer:
        "It means your TIFF file uses a compression scheme (like LZW) this decoder doesn't currently support. Rather than attempt to read it anyway and risk producing a corrupted or wrong image, the tool detects this and reports it clearly so you know to try a different file or re-export it with different compression settings.",
    },
    {
      question: "How do I know if my TIFF uses a supported compression type?",
      answer:
        "You generally won't know in advance — just try the conversion. If your TIFF uses uncompressed or PackBits compression (both common defaults in many scanning and editing tools), it converts successfully; otherwise you'll see a clear error rather than a broken result.",
    },
    {
      question: "Does converting to JPG lose any of the TIFF's original quality?",
      answer:
        "TIFF is typically stored losslessly, while JPG uses lossy compression, so there is some quality trade-off — the conversion uses a high quality setting (95%) specifically to keep that loss minimal and visually negligible for most images.",
    },
    {
      question: "Is my TIFF file uploaded anywhere to convert it?",
      answer:
        "No — decoding and conversion both happen entirely in your browser. The file is never uploaded to a server.",
    },
  ],
};
