import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Cta() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <div
        className="relative overflow-hidden rounded-3xl px-6 py-16 text-center text-brand-foreground sm:px-12"
        style={{
          background:
            "linear-gradient(135deg, var(--brand), color-mix(in oklch, var(--brand), black 35%))",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-grid-fade opacity-20"
        />
        <h2 className="relative text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Stop juggling a dozen tool sites.
        </h2>
        <p className="relative mx-auto mt-3 max-w-xl text-balance text-brand-foreground/85">
          One fast, private, ad-light home for every file and text task you
          run into — bookmark it once, use it for everything.
        </p>
        <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            render={<Link href="/categories" />}
            nativeButton={false}
            size="lg"
            variant="secondary"
          >
            Browse all tools
          </Button>
          <Button
            render={<Link href="/pdf-tools" />}
            nativeButton={false}
            size="lg"
            variant="outline"
            className="border-brand-foreground/30 bg-transparent text-brand-foreground hover:bg-brand-foreground/10 hover:text-brand-foreground"
          >
            Start with PDF tools
          </Button>
        </div>
      </div>
    </section>
  );
}
