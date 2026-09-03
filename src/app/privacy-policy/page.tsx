import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Toolspica handles your data: what we collect, what we don't, browser-based processing, cookies, and your rights.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <LegalPage
        title="Privacy Policy"
        lastUpdated="August 31, 2026"
        intro="This policy explains what information Toolspica collects, how it's used, and the choices you have."
      >
        <h2>1. Our approach to privacy</h2>
        <p>
          Toolspica is built around a simple principle: whenever a
          tool can run entirely inside your web browser, it does — and your
          files, documents, and personal content are never transmitted to
          our servers. For the smaller set of tools that require
          server-side processing, we minimize what we collect and delete it
          automatically. Details on file handling specifically are in our{" "}
          <Link href="/data-processing-policy">Data Processing Policy</Link>{" "}
          and <Link href="/file-retention-policy">File Retention Policy</Link>.
        </p>

        <h2>2. Information we collect</h2>
        <h3>2.1 Information you provide</h3>
        <p>
          If you contact us via our <Link href="/contact">contact form</Link>{" "}
          or by email, we receive whatever information you choose to
          include (such as your name, email address, and message content).
          We use this only to respond to you.
        </p>
        <h3>2.2 Files processed by tools</h3>
        <p>
          Most tools process files locally in your browser and never send
          them to us. A limited number of tools require temporary
          server-side processing; for those, see our Data Processing and
          File Retention policies linked above.
        </p>
        <h3>2.3 Automatically collected information</h3>
        <p>
          Like most websites, our servers and any analytics or advertising
          providers we use may automatically log standard technical
          information when you visit — such as your IP address, browser
          type, device type, pages visited, and referring URL. This is used
          in aggregate to understand site usage and improve the product.
        </p>

        <h2>3. Cookies and similar technologies</h2>
        <p>
          We may use cookies and similar technologies (such as
          `localStorage`) for essential site functionality — for example,
          remembering your theme preference or your recently used tools,
          which are stored only in your own browser and never sent to us.
        </p>
        <p>
          We may also use third-party services such as Google Analytics
          (for aggregate usage statistics) and Google AdSense (to serve
          advertising that helps keep every tool free). These providers may
          set their own cookies and use them in accordance with their own
          privacy policies. You can control cookies through your browser
          settings, and opt out of personalized advertising through{" "}
          <a
            href="https://adssettings.google.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Ads Settings
          </a>
          .
        </p>

        <h2>4. How we use information</h2>
        <ul>
          <li>To operate, maintain, and improve Toolspica</li>
          <li>To respond to support requests and feedback</li>
          <li>To understand aggregate usage patterns and fix bugs</li>
          <li>To serve advertising that keeps the platform free</li>
          <li>To detect, prevent, and address abuse or security issues</li>
        </ul>

        <h2>5. How we share information</h2>
        <p>
          We do not sell your personal information. We may share limited
          information with service providers who help us operate the
          platform (such as hosting and analytics providers), and only to
          the extent necessary for them to perform those services, or when
          required by law.
        </p>

        <h2>6. Your rights and choices</h2>
        <p>
          Depending on where you live, you may have rights to access,
          correct, or delete personal information we hold about you, and to
          object to or restrict certain processing. Since most tools never
          transmit your files to us in the first place, there is often
          nothing for us to hold. To exercise any rights regarding
          information you've sent us directly (such as a support email),
          contact us at{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>

        <h2>7. Children's privacy</h2>
        <p>
          Toolspica is not directed at children under 13, and we do
          not knowingly collect personal information from children under
          13.
        </p>

        <h2>8. Changes to this policy</h2>
        <p>
          We may update this policy from time to time. Material changes
          will be reflected by updating the "Last updated" date above.
        </p>

        <h2>9. Contact us</h2>
        <p>
          Questions about this policy? Email us at{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or use our{" "}
          <Link href="/contact">contact page</Link>.
        </p>
      </LegalPage>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy-policy" },
        ])}
      />
    </>
  );
}
