import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Disclaimer",
  description:
    "Toolspica disclaimer covering accuracy, professional advice, and use of calculators, converters, and generators.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <>
      <LegalPage
        title="Disclaimer"
        lastUpdated="August 31, 2026"
        intro="Important information about the accuracy and intended use of tools on Toolspica."
      >
        <h2>General informational use</h2>
        <p>
          All tools on Toolspica are provided for general
          informational and productivity purposes. While we work to make
          every calculation, conversion, and generated file as accurate as
          possible, we make no guarantee that results are complete, current,
          or error-free.
        </p>

        <h2>Not financial, medical, legal, or tax advice</h2>
        <p>
          Tools in categories such as Calculators, Finance & Business
          Calculators, Health & Fitness Calculators, and Legal & Business
          Document Tools (including generators for privacy policies, NDAs,
          contracts, and similar documents) are for general guidance only.
          They do not constitute financial, medical, legal, or tax advice,
          and should not be relied upon as a substitute for consultation
          with a qualified professional (a financial advisor, physician,
          attorney, or accountant, as applicable) before making any
          decision.
        </p>

        <h2>Generated legal documents</h2>
        <p>
          Documents produced by our Legal & Business Document Tools (such
          as privacy policy, terms, NDA, or contract generators) are
          templates intended as a starting point. Laws vary by
          jurisdiction and change over time; you are responsible for having
          any generated document reviewed by a qualified attorney before
          relying on it.
        </p>

        <h2>File conversion accuracy</h2>
        <p>
          File conversion, compression, and OCR tools aim for high fidelity
          but cannot guarantee a perfect, lossless result in every case —
          particularly for complex layouts, unusual fonts, low-quality
          source files, or handwriting. Always review converted output
          before relying on it for important purposes.
        </p>

        <h2>Third-party content and links</h2>
        <p>
          Toolspica may link to third-party websites or use
          third-party services (including advertising and analytics
          providers). We do not endorse and are not responsible for the
          accuracy, content, or practices of third parties.
        </p>

        <h2>Use at your own risk</h2>
        <p>
          Your use of Toolspica, and any reliance on results it
          produces, is at your own risk. See also our{" "}
          <Link href="/terms">Terms of Service</Link> for our full
          disclaimer of warranties and limitation of liability.
        </p>

        <h2>Contact us</h2>
        <p>
          If you believe a tool is producing inaccurate results, please
          report it to <a href={`mailto:${SITE.email}`}>{SITE.email}</a> so
          we can investigate.
        </p>
      </LegalPage>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Disclaimer", path: "/disclaimer" },
        ])}
      />
    </>
  );
}
