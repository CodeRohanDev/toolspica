import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "File Retention Policy",
  description:
    "Exactly how long Toolspica retains files for the limited set of tools that use temporary cloud processing, and how automatic deletion is enforced.",
  path: "/file-retention-policy",
});

export default function FileRetentionPolicyPage() {
  return (
    <>
      <LegalPage
        title="File Retention Policy"
        lastUpdated="August 31, 2026"
        intro="This policy applies only to the limited set of tools that use temporary cloud processing. Browser-processed tools never send your file to us at all."
      >
        <h2>1. Default: no server involvement</h2>
        <p>
          The large majority of tools on Toolspica process your file
          entirely in your browser. There is no upload, no server-side
          copy, and therefore nothing to retain or delete — your file
          simply never reaches our infrastructure.
        </p>

        <h2>2. When a tool uses temporary cloud processing</h2>
        <p>
          For the specific tools that are clearly labeled as using cloud
          processing (for example, certain OCR and AI-assisted features),
          we apply the following rules without exception:
        </p>
        <ul>
          <li>
            <strong>Immediate deletion when possible.</strong> Uploaded
            files are deleted as soon as processing completes and the
            result has been returned to you.
          </li>
          <li>
            <strong>Maximum retention window.</strong> Where immediate
            deletion isn't technically feasible (for example, to allow you
            to re-download a result within the same session), files are
            retained for no longer than <strong>60 minutes</strong> before
            automatic, permanent deletion.
          </li>
          <li>
            <strong>No manual cleanup required.</strong> Deletion is
            enforced automatically by our infrastructure (Cloudflare
            Workers with time-to-live storage rules) — not by a person
            remembering to run a cleanup job.
          </li>
          <li>
            <strong>No backups of processed files.</strong> We do not keep
            backup copies of files submitted to cloud-processed tools.
          </li>
          <li>
            <strong>Refreshing or closing the page</strong> does not extend
            retention — the same automatic expiry window still applies.
          </li>
        </ul>

        <h2>3. What we retain instead of your file</h2>
        <p>
          For basic service operation and abuse prevention, we may keep
          minimal, non-content metadata about a processing request (such as
          timestamp, file size, and tool used) for a limited period, kept
          separately from the file content itself and never re-associated
          with your file after it's deleted.
        </p>

        <h2>4. Security while a file is in transit or processing</h2>
        <p>
          Files sent to cloud-processed tools are transmitted over
          encrypted connections (HTTPS/TLS) and processed on Cloudflare's
          infrastructure for the minimum time necessary to complete the
          task.
        </p>

        <h2>5. Your responsibility</h2>
        <p>
          Because retained copies (where they briefly exist at all) are
          deleted automatically and cannot be recovered afterward, please
          download or save your results promptly after a cloud-processed
          tool finishes.
        </p>

        <h2>6. Related policy</h2>
        <p>
          For the broader explanation of which tools run locally versus in
          the cloud, and why, see our{" "}
          <Link href="/data-processing-policy">Data Processing Policy</Link>.
        </p>

        <h2>7. Contact us</h2>
        <p>
          Questions about file retention for a specific tool? Email{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
      </LegalPage>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          {
            name: "File Retention Policy",
            path: "/file-retention-policy",
          },
        ])}
      />
    </>
  );
}
