import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ToolPageHeaderProps {
  categoryName: string;
  categorySlug: string;
  breadcrumbLabel: string;
  h1: string;
  subtitle?: string;
  icon: LucideIcon;
  accentClass: string;
}

export function ToolPageHeader({
  categoryName,
  categorySlug,
  breadcrumbLabel,
  h1,
  subtitle,
  icon: Icon,
  accentClass,
}: ToolPageHeaderProps) {
  return (
    <div className="border-b">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs text-muted-foreground"
        >
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="size-3" />
          <Link href={`/${categorySlug}`} className="hover:text-foreground">
            {categoryName}
          </Link>
          <ChevronRight className="size-3" />
          <span className="text-foreground">{breadcrumbLabel}</span>
        </nav>

        <div className="mt-4 flex items-start gap-3">
          <span
            className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${accentClass}`}
          >
            <Icon className="size-5" />
          </span>
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
              {h1}
            </h1>
            {subtitle && (
              <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
