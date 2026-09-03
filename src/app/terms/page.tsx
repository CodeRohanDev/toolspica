import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description:
    "The terms that govern your use of Toolspica — acceptable use, intellectual property, disclaimers, and liability.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <LegalPage
        title="Terms of Service"
        lastUpdated="August 31, 2026"
        intro="Please read these terms carefully before using Toolspica."
      >
        <h2>1. Acceptance of terms</h2>
        <p>
          By accessing or using Toolspica (the "Service"), you agree
          to be bound by these Terms of Service. If you do not agree,
          please do not use the Service.
        </p>

        <h2>2. Description of service</h2>
        <p>
          Toolspica provides a collection of free, primarily
          browser-based utilities for file conversion, editing,
          calculation, and related tasks. Most tools process data locally
          in your browser; some tools use temporary server-side processing
          as described in our{" "}
          <Link href="/data-processing-policy">Data Processing Policy</Link>.
        </p>

        <h2>3. Acceptable use</h2>
        <p>You agree not to use Toolspica to:</p>
        <ul>
          <li>Violate any applicable law or regulation</li>
          <li>
            Process content you do not have the legal right to process
            (e.g. copyrighted material without authorization)
          </li>
          <li>
            Attempt to interfere with, disrupt, or gain unauthorized access
            to the Service or its infrastructure
          </li>
          <li>
            Use automated means to scrape, overload, or abuse the Service
            in a way that degrades it for other users
          </li>
          <li>Upload malware or attempt to compromise other users</li>
        </ul>

        <h2>4. Your content</h2>
        <p>
          You retain all rights to any files or content you process using
          Toolspica. For browser-processed tools, we never receive
          your content. For the limited tools that use temporary
          server-side processing, we do not claim any ownership over your
          content and delete it automatically per our{" "}
          <Link href="/file-retention-policy">File Retention Policy</Link>.
        </p>

        <h2>5. No professional advice</h2>
        <p>
          Calculators, generators, and similar tools on Toolspica
          (including but not limited to financial, health, legal-document,
          and tax-related calculators) are provided for general
          informational purposes only and do not constitute financial,
          medical, legal, or tax advice. Always consult a qualified
          professional before making decisions based on these tools. See
          also our <Link href="/disclaimer">Disclaimer</Link>.
        </p>

        <h2>6. Intellectual property</h2>
        <p>
          The Toolspica name, logo, design, and underlying software
          are the property of {SITE.legalEntity} and are protected by
          applicable intellectual property laws. You may not copy,
          reproduce, or create derivative works from the Service without
          permission, except as necessary to use the tools as intended.
        </p>

        <h2>7. Third-party links and services</h2>
        <p>
          The Service may contain links to third-party websites or
          services, and may display advertising served by third parties.
          We are not responsible for the content, policies, or practices of
          any third party.
        </p>

        <h2>8. Disclaimer of warranties</h2>
        <p>
          The Service is provided "as is" and "as available" without
          warranties of any kind, whether express or implied, including
          but not limited to warranties of merchantability, fitness for a
          particular purpose, and non-infringement. We do not warrant that
          the Service will be uninterrupted, error-free, or that every
          conversion or calculation will be perfectly accurate.
        </p>

        <h2>9. Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, {SITE.legalEntity} shall
          not be liable for any indirect, incidental, special,
          consequential, or punitive damages, or any loss of data, profits,
          or revenue, arising from your use of or inability to use the
          Service.
        </p>

        <h2>10. Changes to these terms</h2>
        <p>
          We may update these terms from time to time. Continued use of the
          Service after changes take effect constitutes acceptance of the
          revised terms.
        </p>

        <h2>11. Contact us</h2>
        <p>
          Questions about these terms? Email{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
      </LegalPage>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Terms of Service", path: "/terms" },
        ])}
      />
    </>
  );
}
