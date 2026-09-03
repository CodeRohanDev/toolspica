import { Lock, Sparkles, UserX } from "lucide-react";

export function SeoIntroHero({
  toolName,
  introParagraph,
  usesCloud = false,
}: {
  toolName: string;
  introParagraph: string;
  usesCloud?: boolean;
}) {
  return (
    <section className="mx-auto max-w-3xl px-4 pt-8 sm:px-6 lg:px-8">
      <h2 className="text-lg font-semibold tracking-tight">
        Need to use {toolName} right now?
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {introParagraph}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <UserX className="size-3.5 text-brand" /> No sign-up
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Lock className="size-3.5 text-brand" />
          {usesCloud ? "Files auto-deleted" : "No uploads"}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Sparkles className="size-3.5 text-brand" /> 100% free
        </span>
      </div>
    </section>
  );
}
