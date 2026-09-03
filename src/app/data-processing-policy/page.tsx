import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Server, MonitorSmartphone } from "lucide-react";
import { LegalPage } from "@/components/legal-page";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Data Processing Policy",
  description:
    "How Toolspica processes your files: browser-first by default, with strict automatic deletion for the limited tools that require server-side processing.",
  path: "/data-processing-policy",
});

export default function DataProcessingPolicyPage() {
  return (
    <>
      <LegalPage
        title="Data Processing Policy"
        lastUpdated="August 31, 2026"
        intro="A plain-language explanation of exactly where your files are processed, and why."
      >
        <h2>The short version</h2>
        <ul>
          <li>
            <strong>Most tools run entirely in your browser.</strong> Your
            file is read, processed, and the result generated on your own
            device using JavaScript, WebAssembly, and browser APIs. It is
            never uploaded anywhere.
          </li>
          <li>
            <strong>A small number of tools require server-side
            processing</strong> — generally where a task needs more
            computing power or a model than a browser can reasonably run
            (for example, certain OCR and AI-assisted features).
          </li>
          <li>
            <strong>When server processing is used</strong>, it is
            temporary. Files are automatically deleted — see our{" "}
            <Link href="/file-retention-policy">File Retention Policy</Link>{" "}
            for exact timing.
          </li>
        </ul>

        <h2>How to tell which mode a tool uses</h2>
        <p>
          Every tool page displays a clear notice stating whether
          processing happens locally in your browser or via temporary cloud
          processing. If a tool doesn't say otherwise, it processes your
          file locally.
        </p>

        <h2>Why some tools need server-side processing</h2>
        <p>
          Browsers are remarkably capable today, but they have real limits:
          large machine-learning models (used in some AI and advanced OCR
          tools), very large file batches, and a handful of legacy file
          formats are impractical or impossible to handle purely
          client-side. For those specific tools, we use temporary
          server-side processing on Cloudflare's infrastructure, with the
          strict deletion guarantees described in our File Retention
          Policy.
        </p>

        <h2>What we do not do</h2>
        <ul>
          <li>We do not permanently store files you process, in either mode.</li>
          <li>We do not use your files to train AI models.</li>
          <li>We do not sell or share your files with third parties.</li>
          <li>
            We do not require an account or sign-up to use any tool on the
            platform.
          </li>
        </ul>

        <h2>Related policies</h2>
        <p>
          For details on retention windows and automatic deletion, see the{" "}
          <Link href="/file-retention-policy">File Retention Policy</Link>.
          For our broader approach to personal data (such as contact form
          submissions and analytics), see the{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>.
        </p>

        <h2>Contact us</h2>
        <p>
          Questions about how a specific tool processes your data? Email{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
      </LegalPage>

      <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border bg-card p-6">
            <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
              <MonitorSmartphone className="size-5" />
            </span>
            <h3 className="mt-4 text-base font-semibold">
              Browser-processed tools (most tools)
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Your file never leaves your device. Processing happens using
              JavaScript, WebAssembly, and browser APIs, right in the tab
              you're using.
            </p>
          </div>
          <div className="rounded-2xl border bg-card p-6">
            <span className="flex size-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
              <Server className="size-5" />
            </span>
            <h3 className="mt-4 text-base font-semibold">
              Cloud-processed tools (a small subset)
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Clearly labeled on the tool page. Files are processed
              temporarily and deleted automatically per our retention
              policy — never kept permanently.
            </p>
          </div>
        </div>
        <div className="mt-6 flex items-center gap-2 rounded-xl border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
          <ShieldCheck className="size-4 shrink-0 text-emerald-600" />
          Privacy-first processing is a core design principle, not a
          marketing claim — it shapes how every new tool is built.
        </div>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          {
            name: "Data Processing Policy",
            path: "/data-processing-policy",
          },
        ])}
      />
    </>
  );
}
