import type { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  icon?: LucideIcon;
  accentClass?: string;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  icon: Icon,
  accentClass,
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b bg-muted/30">
      <div
        aria-hidden
        className="bg-grid-fade pointer-events-none absolute inset-0"
      />
      <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        {Icon && (
          <span
            className={`mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl ${accentClass ?? "bg-brand-soft text-brand"}`}
          >
            <Icon className="size-6" />
          </span>
        )}
        {eyebrow && (
          <p className="text-sm font-medium uppercase tracking-wide text-brand">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-2 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-4 max-w-2xl text-balance text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
