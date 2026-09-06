import { Wrench, LayoutGrid, Lock } from "lucide-react";
import { TOOL_CATEGORIES, TOTAL_TOOLS } from "@/lib/tools-data.generated";
import { LiveOperationsStat } from "@/components/home/live-operations-stat";

const STATS = [
  {
    icon: Wrench,
    value: `${TOTAL_TOOLS}+`,
    label: "Free tools",
    hint: "and growing weekly",
  },
  {
    icon: LayoutGrid,
    value: `${TOOL_CATEGORIES.length}`,
    label: "Categories",
    hint: "PDF to AI writing",
  },
  {
    icon: Lock,
    value: "0",
    label: "Files stored",
    hint: "processed, then gone",
  },
];

export function StatsBar() {
  return (
    <section className="border-b bg-muted/30">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 px-4 py-10 sm:grid-cols-4 sm:gap-4 sm:px-6 lg:px-8">
        <LiveOperationsStat />
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-2 rounded-2xl border bg-card px-4 py-6 text-center"
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-brand-soft text-brand">
              <stat.icon className="size-4" />
            </span>
            <p className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
              {stat.value}
            </p>
            <div>
              <p className="text-sm font-medium">{stat.label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{stat.hint}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
