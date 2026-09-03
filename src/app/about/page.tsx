import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Zap, Globe2, HeartHandshake } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { TOTAL_TOOLS, TOOL_CATEGORIES } from "@/lib/tools-data.generated";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About Toolspica",
  description:
    "Toolspica is a privacy-first platform of 500+ free, browser-based utilities. Learn why we built it and how we handle your files.",
  path: "/about",
});

const values = [
  {
    icon: ShieldCheck,
    title: "Privacy by default",
    description:
      "We build every tool to run in your browser first. If a task can be done without a server, it is — your files simply never leave your device.",
    accent: "bg-emerald-500/10 text-emerald-600",
  },
  {
    icon: Zap,
    title: "Speed over friction",
    description:
      "No sign-up walls, no forced trials, no artificial waiting screens. You land on a tool and it works immediately.",
    accent: "bg-amber-500/10 text-amber-600",
  },
  {
    icon: Globe2,
    title: "One platform, not a dozen",
    description:
      "We consolidate the utilities people bounce between across dozens of ad-heavy sites into a single, consistent, fast experience.",
    accent: "bg-blue-500/10 text-blue-600",
  },
  {
    icon: HeartHandshake,
    title: "Honest about trade-offs",
    description:
      "A small number of tools genuinely need server-side processing. When they do, we say so clearly and delete what we process automatically.",
    accent: "bg-violet-500/10 text-violet-600",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="Building the tool platform we'd actually want to use"
        description="Toolspica exists because switching between a dozen ad-cluttered, upload-your-file-to-a-stranger's-server websites just to merge a PDF or resize an image is a bad way to spend an afternoon."
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="prose prose-neutral max-w-none prose-headings:font-semibold">
          <h2>Why we built Toolspica</h2>
          <p>
            Most online tool sites follow the same playbook: get you to
            upload a file to their server, show you ads while you wait, and
            hope you don't notice how little you know about what happens to
            your file afterward. We wanted something different — a platform
            where the default behavior is to respect your files and your
            time.
          </p>
          <p>
            That meant rethinking how these tools are built. Wherever a
            task can be completed using modern browser technology —
            WebAssembly, Web Workers, the Canvas and Web Crypto APIs — we
            build it that way, so your file is processed on your own device
            and never transmitted anywhere.
          </p>

          <h2>What we're building</h2>
          <p>
            Toolspica currently spans {TOTAL_TOOLS}+ tools across{" "}
            {TOOL_CATEGORIES.length}+ categories — PDF editing, image and
            video conversion, developer utilities, calculators, SEO
            helpers, security tools, and AI-assisted writing tools — with
            new tools shipping regularly. Our goal is to be the single
            place you bookmark for "I need to quickly do X to a file."
          </p>

          <h2>How we think about your files</h2>
          <p>
            For full detail, read our{" "}
            <Link href="/data-processing-policy">Data Processing Policy</Link>{" "}
            and <Link href="/file-retention-policy">File Retention Policy</Link>.
            The short version: most tools never send your file anywhere, and
            the few that require temporary cloud processing delete what
            they receive automatically, on a short, enforced schedule.
          </p>

          <h2>Who's behind Toolspica</h2>
          <p>
            Toolspica is built and maintained by{" "}
            <a
              href={SITE.parentUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {SITE.parentBrand}
            </a>
            . Toolspica is our flagship product — the same commitment to
            speed, privacy, and craft carries across everything we build.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-2xl border bg-card p-6 transition-shadow hover:shadow-lg hover:shadow-black/5"
            >
              <span
                className={`flex size-10 items-center justify-center rounded-xl ${value.accent}`}
              >
                <value.icon className="size-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold">{value.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Button render={<Link href="/categories" />} nativeButton={false}>
            Browse all tools
          </Button>
          <Button variant="outline" render={<Link href="/contact" />} nativeButton={false}>
            Get in touch
          </Button>
        </div>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
    </>
  );
}
