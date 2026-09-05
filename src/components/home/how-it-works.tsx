import { Upload, Cpu, Download } from "lucide-react";

const STEPS = [
  {
    icon: Upload,
    title: "Drop your file",
    description: "Pick a tool and add your file. No account, no waiting room.",
  },
  {
    icon: Cpu,
    title: "Processed instantly",
    description:
      "Most tools run right in your browser tab — nothing is uploaded anywhere.",
  },
  {
    icon: Download,
    title: "Download the result",
    description: "Get your file back in seconds. Nothing is kept on our end.",
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          How it works
        </h2>
        <p className="mx-auto mt-2 max-w-md text-muted-foreground">
          Three steps, no detours.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {STEPS.map((step, index) => (
          <div
            key={step.title}
            className="flex flex-col gap-4 rounded-2xl border bg-card p-6"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                <step.icon className="size-5" />
              </span>
              <span className="text-3xl font-semibold text-muted-foreground">
                0{index + 1}
              </span>
            </div>
            <div>
              <h3 className="text-base font-semibold">{step.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
