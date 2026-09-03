import Link from "next/link";
import { ShieldCheck, Zap, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ToolSearch } from "@/components/tool-search";
import { TOTAL_TOOLS } from "@/lib/tools-data.generated";

const QUICK_CATEGORIES = [
  { name: "PDF Tools", slug: "pdf-tools" },
  { name: "Image Tools", slug: "image-tools" },
  { name: "Developer Tools", slug: "developer-tools" },
  { name: "Calculators", slug: "calculators" },
  { name: "AI Tools", slug: "ai-tools" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-10rem] h-[36rem] w-[64rem] -translate-x-1/2 rounded-full opacity-[0.15] blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, var(--brand), transparent)",
        }}
      />
      <div
        aria-hidden
        className="bg-grid-fade pointer-events-none absolute inset-0"
      />
      <div className="relative mx-auto max-w-5xl px-4 pb-20 pt-20 text-center sm:px-6 sm:pt-28 lg:px-8">
        <Badge className="mb-6 gap-1.5 rounded-full border-none bg-brand-soft px-3 py-1 text-xs font-medium text-brand hover:bg-brand-soft">
          <ShieldCheck className="size-3.5" />
          Privacy-first · {TOTAL_TOOLS}+ free tools
        </Badge>

        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
          Every tool you need.
          <br />
          <span className="text-muted-foreground">Nothing leaves your browser.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-muted-foreground">
          PDF, image, video, audio, developer, SEO, and AI tools — free,
          fast, and processed locally in your browser whenever possible.
          No installs. No sign-ups. No files kept.
        </p>

        <div className="mx-auto mt-10 max-w-2xl">
          <ToolSearch size="lg" />
        </div>

        <div className="mx-auto mt-4 flex max-w-2xl flex-wrap items-center justify-center gap-2">
          {QUICK_CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/${category.slug}`}
              className="rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-brand/40 hover:text-brand"
            >
              {category.name}
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Zap className="size-4" /> Instant, no upload wait
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Lock className="size-4" /> Files stay local
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="size-4" /> No permanent storage
          </span>
        </div>
      </div>
    </section>
  );
}
