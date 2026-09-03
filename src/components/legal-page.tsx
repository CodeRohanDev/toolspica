import { PageHeader } from "@/components/page-header";

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  intro?: string;
  children: React.ReactNode;
}

export function LegalPage({
  title,
  lastUpdated,
  intro,
  children,
}: LegalPageProps) {
  return (
    <>
      <PageHeader title={title} description={intro} />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="mb-10 text-sm text-muted-foreground">
          Last updated: {lastUpdated}
        </p>
        <div className="prose prose-neutral max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-brand">
          {children}
        </div>
      </div>
    </>
  );
}
