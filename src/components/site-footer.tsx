import Link from "next/link";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { TOOL_CATEGORIES } from "@/lib/tools-data.generated";
import { SITE } from "@/lib/site";

const footerCategoryGroups = [
  ["pdf-tools", "image-tools", "video-tools", "audio-tools"],
  ["developer-tools", "text-tools", "security-tools", "seo-tools"],
  ["calculators", "unit-and-measurement-converters", "ai-tools", "qr-code-and-barcode-tools"],
];

function findCategory(slug: string) {
  return TOOL_CATEGORIES.find((category) => category.slug === slug);
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Image
                src="/logo.png"
                alt="Toolspica"
                width={32}
                height={28}
                className="h-8 w-auto"
              />
              <span className="text-lg tracking-tight">Toolspica</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              500+ free browser-based tools for PDF, image, video, audio,
              developer, SEO, and AI workflows. Your files are processed
              locally whenever possible and never permanently stored.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Toolspica is built by{" "}
              <a
                href={SITE.parentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-brand hover:underline"
              >
                {SITE.parentBrand}
              </a>
              .
            </p>
            <div className="mt-5 flex items-center gap-2 rounded-lg border bg-background px-3 py-2 text-xs text-muted-foreground">
              <ShieldCheck className="size-4 shrink-0 text-emerald-600" />
              Privacy-first: files stay in your browser whenever possible.
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold">Tools</h3>
            <div className="mt-4 grid grid-cols-3 gap-6">
              {footerCategoryGroups.map((group, index) => (
                <ul key={index} className="space-y-2.5">
                  {group.map((slug) => {
                    const category = findCategory(slug);
                    if (!category) return null;
                    return (
                      <li key={slug}>
                        <Link
                          href={`/${category.slug}`}
                          className="text-sm text-muted-foreground hover:text-foreground"
                        >
                          {category.name}
                        </Link>
                      </li>
                    );
                  })}
                  {index === footerCategoryGroups.length - 1 && (
                    <li>
                      <Link
                        href="/categories"
                        className="text-sm font-medium text-brand hover:underline"
                      >
                        All categories →
                      </Link>
                    </li>
                  )}
                </ul>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-10 border-t pt-10 sm:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold">Company</h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Legal & Privacy</h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-sm text-muted-foreground hover:text-foreground">Disclaimer</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Data & File Handling</h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/data-processing-policy" className="text-sm text-muted-foreground hover:text-foreground">Data Processing Policy</Link>
              </li>
              <li>
                <Link href="/file-retention-policy" className="text-sm text-muted-foreground hover:text-foreground">File Retention Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-8 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {year} Toolspica by{" "}
            <a
              href={SITE.parentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground hover:underline"
            >
              {SITE.parentBrand}
            </a>
            . All rights reserved.
          </p>
          <p>Processed locally in your browser whenever possible. No files permanently stored.</p>
        </div>
      </div>
    </footer>
  );
}
