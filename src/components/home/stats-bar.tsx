import { TOOL_CATEGORIES, TOTAL_TOOLS } from "@/lib/tools-data.generated";

const STATS = [
  { value: `${TOTAL_TOOLS}+`, label: "Free tools" },
  { value: `${TOOL_CATEGORIES.length}`, label: "Categories" },
  { value: "$0", label: "Cost, ever" },
  { value: "0", label: "Files stored" },
];

export function StatsBar() {
  return (
    <section className="border-b bg-background">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-4 py-10 sm:grid-cols-4 sm:px-6 lg:px-8">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-3xl font-semibold tracking-tight text-brand sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
