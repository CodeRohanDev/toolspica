import {
  FileText,
  Image as ImageIcon,
  Type,
  Code2,
  Video,
  Music,
  ScanText,
  Archive,
  Calculator,
  Landmark,
  HeartPulse,
  Ruler,
  Sparkles,
  Share2,
  Search,
  ShieldCheck,
  FileSpreadsheet,
  Table,
  Palette,
  QrCode,
  Dices,
  Globe,
  Clapperboard,
  Type as FontIcon,
  PenTool,
  Coins,
  Signature,
  Timer,
  GraduationCap,
  Presentation,
  Languages,
  Scale,
  Sigma,
  Mail,
  type LucideIcon,
} from "lucide-react";

export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "pdf-tools": FileText,
  "image-tools": ImageIcon,
  "text-tools": Type,
  "developer-tools": Code2,
  "video-tools": Video,
  "audio-tools": Music,
  "ocr-tools": ScanText,
  "archive-tools": Archive,
  calculators: Calculator,
  "finance-and-business-calculators": Landmark,
  "health-and-fitness-calculators": HeartPulse,
  "unit-and-measurement-converters": Ruler,
  "ai-tools": Sparkles,
  "social-media-tools": Share2,
  "seo-tools": Search,
  "security-tools": ShieldCheck,
  "document-and-office-tools": FileSpreadsheet,
  "spreadsheet-and-data-tools": Table,
  "color-tools": Palette,
  "qr-code-and-barcode-tools": QrCode,
  "random-generators": Dices,
  "website-and-network-tools": Globe,
  "gif-and-meme-tools": Clapperboard,
  "font-and-typography-tools": FontIcon,
  "writing-and-citation-tools": PenTool,
  "email-tools": Mail,
  "legal-and-business-document-tools": Scale,
  "math-tools": Sigma,
  "language-and-translation-tools": Languages,
  "crypto-and-currency-tools": Coins,
  "signature-tools": Signature,
  "time-and-productivity-tools": Timer,
  "education-tools": GraduationCap,
  "presentation-tools": Presentation,
};

export function getCategoryIcon(slug: string): LucideIcon {
  return CATEGORY_ICONS[slug] ?? Sparkles;
}

const ACCENT_PALETTE = [
  "bg-blue-500/10 text-blue-600",
  "bg-violet-500/10 text-violet-600",
  "bg-rose-500/10 text-rose-600",
  "bg-amber-500/10 text-amber-600",
  "bg-emerald-500/10 text-emerald-600",
  "bg-cyan-500/10 text-cyan-600",
  "bg-fuchsia-500/10 text-fuchsia-600",
  "bg-orange-500/10 text-orange-600",
  "bg-indigo-500/10 text-indigo-600",
  "bg-teal-500/10 text-teal-600",
];

const GLOW_PALETTE = [
  "bg-blue-500",
  "bg-violet-500",
  "bg-rose-500",
  "bg-amber-500",
  "bg-emerald-500",
  "bg-cyan-500",
  "bg-fuchsia-500",
  "bg-orange-500",
  "bg-indigo-500",
  "bg-teal-500",
];

const BORDER_PALETTE = [
  "hover:border-blue-500/40 hover:shadow-blue-500/10",
  "hover:border-violet-500/40 hover:shadow-violet-500/10",
  "hover:border-rose-500/40 hover:shadow-rose-500/10",
  "hover:border-amber-500/40 hover:shadow-amber-500/10",
  "hover:border-emerald-500/40 hover:shadow-emerald-500/10",
  "hover:border-cyan-500/40 hover:shadow-cyan-500/10",
  "hover:border-fuchsia-500/40 hover:shadow-fuchsia-500/10",
  "hover:border-orange-500/40 hover:shadow-orange-500/10",
  "hover:border-indigo-500/40 hover:shadow-indigo-500/10",
  "hover:border-teal-500/40 hover:shadow-teal-500/10",
];

const CATEGORY_ORDER = Object.keys(CATEGORY_ICONS);

export function getCategoryAccent(slug: string): string {
  const index = CATEGORY_ORDER.indexOf(slug);
  return ACCENT_PALETTE[(index < 0 ? 0 : index) % ACCENT_PALETTE.length];
}

export function getCategoryGlow(slug: string): string {
  const index = CATEGORY_ORDER.indexOf(slug);
  return GLOW_PALETTE[(index < 0 ? 0 : index) % GLOW_PALETTE.length];
}

export function getCategoryBorderGlow(slug: string): string {
  const index = CATEGORY_ORDER.indexOf(slug);
  return BORDER_PALETTE[(index < 0 ? 0 : index) % BORDER_PALETTE.length];
}
