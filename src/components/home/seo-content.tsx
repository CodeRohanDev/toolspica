export function SeoContent() {
  return (
    <section className="border-t bg-muted/30">
      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="prose prose-neutral max-w-none prose-headings:font-semibold prose-headings:tracking-tight">
          <h2>A free, privacy-first alternative to iLovePDF, TinyWow, and Convertio</h2>
          <p>
            Toolspica brings together the utilities scattered across
            dozens of separate websites — PDF editors, image converters,
            video compressors, developer formatters, calculators, and AI
            writing assistants — into a single, fast, ad-light platform. You
            no longer need a different bookmark for every file type or task.
          </p>

          <h3>Browser-first processing, whenever possible</h3>
          <p>
            Most tool sites upload your files to a remote server, process
            them, and send the result back — which means your documents,
            photos, and personal files pass through infrastructure you don't
            control. Toolspica takes a different approach: whenever a
            task can be completed entirely inside your browser using modern
            web technology (WebAssembly, Web Workers, and native browser
            APIs), it is. Your file never leaves your device.
          </p>
          <p>
            For the smaller set of tools that genuinely require server-side
            processing — such as certain OCR and AI-assisted features — we
            use temporary cloud processing with automatic deletion. You can
            read the exact details in our{" "}
            <a href="/data-processing-policy">Data Processing Policy</a> and{" "}
            <a href="/file-retention-policy">File Retention Policy</a>.
          </p>

          <h3>Built for every kind of task</h3>
          <p>
            Whether you're merging PDFs before a submission, resizing an
            image for a marketplace listing, formatting JSON for a code
            review, calculating a loan payment, generating a QR code for a
            flyer, or getting a quick AI-assisted summary of a document,
            Toolspica has a dedicated tool built specifically for that
            job — not a generic converter that does everything poorly.
          </p>

          <h3>No installs, no accounts, no clutter</h3>
          <p>
            Every tool works the moment you land on the page. There's no
            software to install, no account to create, and no forced trial
            period. We keep the interface clean and fast so you can get in,
            finish the task, and get out.
          </p>
        </div>
      </div>
    </section>
  );
}
