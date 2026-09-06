import { Check } from "lucide-react";

export function ToolFeaturesAndAudience({
  features,
  audience,
}: {
  features: string[];
  audience: string[];
}) {
  return (
    <section className="border-t">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-base font-semibold tracking-tight">Features</h2>
          <ul className="mt-3 space-y-2">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-base font-semibold tracking-tight">
            Who uses this tool?
          </h2>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {audience.map((who) => (
              <span
                key={who}
                className="rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground"
              >
                {who}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
