import { Lock, Zap, Ban, Infinity as InfinityIcon, Smartphone, Server } from "lucide-react";

const benefits = [
  {
    icon: Lock,
    title: "Privacy-first by design",
    description:
      "Whenever a tool can run entirely in your browser, it does. Your files never touch our servers, so there's nothing to leak.",
    accent: "bg-emerald-500/10 text-emerald-600",
  },
  {
    icon: Zap,
    title: "Instant processing",
    description:
      "No upload queue, no waiting on a server. Most tools start working the moment you drop a file in.",
    accent: "bg-amber-500/10 text-amber-600",
  },
  {
    icon: Ban,
    title: "No sign-up required",
    description:
      "Every tool is free to use immediately. No accounts, no email walls, no forced trials.",
    accent: "bg-rose-500/10 text-rose-600",
  },
  {
    icon: InfinityIcon,
    title: "500+ tools, one platform",
    description:
      "PDF, image, video, audio, developer, SEO, security, and AI tools — all under one roof instead of a dozen bookmarks.",
    accent: "bg-blue-500/10 text-blue-600",
  },
  {
    icon: Server,
    title: "Automatic deletion when servers are used",
    description:
      "A handful of tools need temporary cloud processing. When they do, uploaded files are deleted automatically and are never kept permanently.",
    accent: "bg-violet-500/10 text-violet-600",
  },
  {
    icon: Smartphone,
    title: "Works on any device",
    description:
      "Fully responsive, keyboard-accessible, and built to feel just as good on mobile as it does on desktop.",
    accent: "bg-cyan-500/10 text-cyan-600",
  },
];

export function Benefits() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Why Toolspica
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
          Built to be the tool platform we'd actually want to use ourselves.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="rounded-2xl border bg-card p-6 transition-shadow hover:shadow-lg hover:shadow-black/5"
          >
            <span
              className={`flex size-10 items-center justify-center rounded-xl ${benefit.accent}`}
            >
              <benefit.icon className="size-5" />
            </span>
            <h3 className="mt-4 text-base font-semibold">{benefit.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
