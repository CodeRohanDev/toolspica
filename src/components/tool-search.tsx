"use client";

import * as React from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ALL_TOOLS } from "@/lib/tools-data.generated";
import { cn } from "@/lib/utils";

interface ToolSearchProps {
  className?: string;
  size?: "default" | "lg";
  placeholder?: string;
}

export function ToolSearch({
  className,
  size = "default",
  placeholder = "Search 570+ tools... e.g. \"merge pdf\" or \"compress image\"",
}: ToolSearchProps) {
  const [query, setQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return ALL_TOOLS.filter((tool) => tool.name.toLowerCase().includes(q))
      .sort((a, b) => Number(b.done) - Number(a.done))
      .slice(0, 8);
  }, [query]);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          aria-label="Search tools"
          className={cn(
            "pl-11 pr-4 shadow-sm",
            size === "lg" && "h-14 rounded-2xl text-base"
          )}
        />
      </div>

      {open && query.trim().length > 0 && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border bg-popover shadow-lg">
          {results.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-muted-foreground">
              No tools found for &ldquo;{query}&rdquo;
            </p>
          ) : (
            <ul className="max-h-80 overflow-y-auto py-1">
              {results.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/tools/${tool.slug}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm hover:bg-accent hover:text-accent-foreground"
                  >
                    <span className="flex flex-col">
                      <span className="font-medium">{tool.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {tool.categoryName}
                      </span>
                    </span>
                    {!tool.done && (
                      <Badge variant="secondary" className="shrink-0 text-[10px]">
                        Coming soon
                      </Badge>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {results.length > 0 && (
            <Link
              href={`/search?q=${encodeURIComponent(query)}`}
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-1.5 border-t bg-muted/40 px-4 py-2.5 text-xs font-medium text-muted-foreground hover:text-foreground"
            >
              See all results <ArrowRight className="size-3.5" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
