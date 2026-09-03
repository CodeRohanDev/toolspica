import type { Metadata } from "next";
import { Mail, Clock, Wrench, ShieldAlert } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { ContactForm } from "@/components/contact-form";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Get in touch with the Toolspica team — bug reports, tool requests, privacy questions, or general feedback.",
  path: "/contact",
});

const reasons = [
  {
    icon: Wrench,
    title: "Tool requests & bugs",
    description: "Found something broken, or want a tool we don't have yet?",
  },
  {
    icon: ShieldAlert,
    title: "Privacy & data questions",
    description:
      "Questions about how a specific tool processes your files.",
  },
  {
    icon: Clock,
    title: "Response time",
    description: "We typically reply within 1-2 business days.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        description="Questions, bug reports, tool requests, or feedback — we read every message."
      />

      <section className="mx-auto grid max-w-5xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-3">
          <ContactForm />
        </div>

        <div className="space-y-6 lg:col-span-2">
          <div className="flex items-center gap-3 rounded-xl border bg-card p-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
              <Mail className="size-5" />
            </span>
            <div>
              <p className="text-sm font-medium">Email us directly</p>
              <a
                href={`mailto:${SITE.email}`}
                className="text-sm text-brand hover:underline"
              >
                {SITE.email}
              </a>
            </div>
          </div>

          {reasons.map((reason) => (
            <div key={reason.title} className="flex gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                <reason.icon className="size-4 text-muted-foreground" />
              </span>
              <div>
                <p className="text-sm font-medium">{reason.title}</p>
                <p className="text-sm text-muted-foreground">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
    </>
  );
}
