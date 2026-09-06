import { FaqSection } from "@/components/faq-section";
import type { ToolContent } from "@/lib/tools-content/types";

export function ToolContentSections({
  toolName,
  content,
}: {
  toolName: string;
  content: ToolContent;
}) {
  return (
    <>
      <section className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="prose prose-neutral max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-xl">
            <h2>About {toolName}</h2>
            {content.overview.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}

            <h2>How it works</h2>
            <ol>
              {content.howItWorks.map((step, index) => (
                <li key={index}>
                  <strong>{step.title}.</strong> {step.description}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold tracking-tight">Examples</h2>
          <div className="mt-5 space-y-4">
            {content.examples.map((example, index) => (
              <div key={index} className="rounded-xl border bg-card p-4">
                <p className="text-sm font-medium">{example.label}</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Input
                    </p>
                    <pre className="mt-1.5 whitespace-pre-wrap break-words rounded-lg bg-muted/60 p-3 font-mono text-xs">
                      {example.input}
                    </pre>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Output
                    </p>
                    <pre className="mt-1.5 whitespace-pre-wrap break-words rounded-lg bg-muted/60 p-3 font-mono text-xs">
                      {example.output}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <FaqSection
            faqs={content.faqs}
            title="Frequently asked questions"
          />
        </div>
      </div>
    </>
  );
}
