import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "pdf-crop",
  lang: "en",
  title: "How to Remove Ugly White Margins From a Scanned PDF",
  description:
    "Why scans and exports end up with huge blank borders, and how cropping a PDF's margins works without touching the actual content.",
  sections: [
    {
      heading: "Where those huge white borders actually come from",
      body: [
        "It's one of the most common annoyances with scanned documents: you scan a single page, and it comes back on paper twice as large as the content actually needs, with a wide moat of blank white space around it. This happens because scanners and some export tools capture the entire physical page or canvas size rather than the specific area your content occupies — the scanner doesn't know or care where your text ends, it just captures the whole bed.",
        "The same thing happens with some PDF exports from design or presentation software set to a larger canvas than the actual content uses, or with printouts that got captured with extra margin around the edges by whatever process created the PDF.",
      ],
    },
    {
      heading: "The right way to crop a PDF (and the wrong way)",
      body: [
        "The wrong way to fix this is opening an image editor, converting each page to a picture, cropping it there, and rebuilding a PDF from cropped images — that flattens your content, kills selectable text, and is painfully manual for anything more than a couple of pages. The correct way works with a PDF-native property called the crop box: a standard part of the PDF specification that defines what portion of a page is actually visible and printable, completely separate from the underlying content itself.",
        "Setting the crop box doesn't touch or delete anything — the full original content stays exactly where it was in the file, just outside the new visible boundary. This is why it's fast, completely safe, and doesn't rasterize or degrade anything: you're changing what window the viewer looks through, not what's behind the window.",
      ],
    },
    {
      heading: "Cropping unevenly when a scan is off-center",
      body: [
        "Real scans are rarely perfectly centered — a page fed slightly crooked into a scanner often has noticeably more margin on one side than the other. Independent sliders for the top, bottom, left, and right margins matter here, since a uniform crop applied evenly to all four sides would either leave too much on the wide side or cut into actual content on the narrow side. Set the margins as percentages of the page dimensions rather than fixed measurements, and check the preview on the side with the least margin first — that's the side most likely to accidentally clip real content if you crop too aggressively.",
        "A safe habit: crop conservatively on your first pass, check that nothing important got clipped, then increase the crop percentage in a second pass if there's still more excess margin to remove.",
      ],
    },
    {
      heading: "What cropping doesn't do (and why that's fine)",
      body: [
        "Because the underlying content isn't touched, cropping a PDF's margins doesn't meaningfully reduce file size — the full page data is still there, just outside the visible window, so don't expect a smaller file as a side effect. It also doesn't affect text selectability or image quality within whatever area remains visible, since nothing about the actual content was re-rendered or compressed.",
        "If you genuinely need a smaller file, that's a separate goal handled by a dedicated compression tool — cropping and compressing solve two different, unrelated problems and it's worth doing both if you want a smaller, cleaner-looking file.",
      ],
    },
  ],
  faqs: [
    {
      question: "Is cropping a PDF reversible?",
      answer:
        "Not directly through this tool once downloaded, but because the crop box is a non-destructive PDF property rather than deleted content, the original full page remains technically recoverable using a more advanced PDF editor capable of resetting the crop box.",
    },
    {
      question: "Will cropping make my scanned document's file size smaller?",
      answer:
        "Only marginally, if at all — the underlying page content isn't deleted or compressed, just hidden outside the new visible boundary, so file size stays roughly the same regardless of how much margin you trim.",
    },
    {
      question: "Can I use different crop amounts for different sides of the same page?",
      answer:
        "Yes — top, bottom, left, and right margins are independently adjustable, which is exactly what you need for an off-center scan where one side has noticeably more excess space than the opposite side.",
    },
  ],
};
