import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "image-metadata-viewer",
  lang: "en",
  title: "The Hidden Data Every Phone Photo Carries (and How to Check It)",
  description:
    "Every JPEG from your phone quietly stores camera details, timestamps, and sometimes location — here's how to actually see it.",
  sections: [
    {
      heading: "What's riding along inside a photo you took today",
      body: [
        "A photo taken on any modern phone or camera isn't just pixels — tucked inside the file is a block of metadata called EXIF, recording things like the exact camera model, the date and time down to the second, exposure settings, and in many cases precise GPS coordinates of where the shot was taken. None of this is visible when you look at the image; it sits in the file's binary structure, invisible until something actually reads it out.",
        "Most people never think about this until it becomes relevant — a journalist verifying when a photo was actually taken, someone realizing a shared vacation photo could reveal their home address via embedded GPS data, or simple curiosity about what a phone's camera app actually recorded alongside the picture.",
      ],
    },
    {
      heading: "Why this only really works reliably on JPEGs",
      body: [
        "EXIF is a JPEG-specific metadata system — it's a data block embedded directly in the file using the TIFF format, sitting right at the start of the file before the actual image data. PNG files don't have this system at all; they carry only basic technical information like pixel dimensions in their header, because PNG was designed primarily for graphics and screenshots, not photography, and never adopted the EXIF convention JPEG uses.",
        "This is exactly why phone cameras and dedicated cameras almost universally save as JPEG rather than PNG for photos — the format choice is tied directly to whether all that camera metadata gets preserved in the first place.",
      ],
    },
    {
      heading: "Why a photo you downloaded might show nothing at all",
      body: [
        "If you've ever checked a photo's metadata after downloading it from social media or a messaging app and found nothing there, that's not a broken tool — most major platforms deliberately strip EXIF data from images during upload, specifically as a privacy protection, since stripping GPS coordinates before public distribution prevents accidentally broadcasting where a photo was taken. By the time you re-download that same photo, the metadata that existed on the original file is already gone.",
        "This means checking metadata is really only meaningful on an original, unshared file straight off a device — once it's passed through most platforms, there's typically nothing left to read.",
      ],
    },
    {
      heading: "Checking before you share, not after",
      body: [
        "If you're about to publicly post a photo taken on your own device — before it goes through any platform's own stripping — checking its metadata first tells you exactly what information would be embedded if you shared the raw file directly (over email, a private file transfer, or anywhere that doesn't strip metadata automatically). If GPS or timestamp data feels like more than you want attached, a separate metadata-removal step before sharing keeps that information from ever leaving with the file.",
      ],
    },
  ],
  faqs: [
    {
      question: "Why does my PNG show almost no metadata compared to my JPEG?",
      answer:
        "PNG doesn't use the EXIF system JPEG relies on — it only stores basic technical details like dimensions. This is a structural difference between the formats, not a fault in the viewer.",
    },
    {
      question: "Why does a photo I downloaded from Instagram or WhatsApp show no metadata?",
      answer:
        "Most social and messaging platforms strip EXIF data automatically during upload for privacy reasons, particularly to remove GPS coordinates. Once a photo has been through one of these services, its original metadata is typically already gone.",
    },
    {
      question: "Is checking metadata the same as removing it?",
      answer:
        "No — a metadata viewer only reads and displays what's embedded, it doesn't change the file. Removing metadata is a separate step using a dedicated stripping tool.",
    },
  ],
};
