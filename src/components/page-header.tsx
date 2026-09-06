import { Fragment } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface StatItem {
  label: string;
  value: string | number;
}

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  icon?: LucideIcon;
  accentClass?: string;
  breadcrumb?: BreadcrumbItem[];
  stats?: StatItem[];
  glowClass?: string;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  icon: Icon,
  accentClass,
  breadcrumb,
  stats,
  glowClass,
}: PageHeaderProps) {
  return (
    <section className="relative -mt-[76px] overflow-hidden border-b bg-muted/30 pt-[76px] sm:-mt-20 sm:pt-20">
      {glowClass && (
        <div
          aria-hidden
          className={`pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-[0.15] blur-3xl ${glowClass}`}
        />
      )}
      <div
        aria-hidden
        className="bg-grid-fade pointer-events-none absolute inset-0"
      />
      <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        {breadcrumb && breadcrumb.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center justify-center gap-1.5 text-xs text-muted-foreground"
          >
            {breadcrumb.map((item, index) => (
              <Fragment key={index}>
                {index > 0 && <ChevronRight className="size-3" />}
                {item.href ? (
                  <Link href={item.href} className="hover:text-foreground">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-foreground">{item.label}</span>
                )}
              </Fragment>
            ))}
          </nav>
        )}
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
        {stats && stats.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            {stats.map((stat, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1.5 text-xs font-medium shadow-sm"
              >
                <span className="text-foreground">{stat.value}</span>
                <span className="text-muted-foreground">{stat.label}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
