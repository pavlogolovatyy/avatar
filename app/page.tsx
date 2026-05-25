const SITE_URL = "https://avatar.pavlo.sh";

const examples = [
  {
    url: "/pavlo",
    label: "/pavlo",
    note: "Default 180×180 PNG",
  },
  {
    url: "/pavlo?rounded=30",
    label: "/pavlo?rounded=30",
    note: "Rounded corners",
  },
  {
    url: "/pavlo?rounded=90",
    label: "/pavlo?rounded=90",
    note: "Full circle (rounded ≥ size/2)",
  },
  {
    url: "/pavlo?size=120",
    label: "/pavlo?size=120",
    note: "Custom size in px",
  },
  {
    url: "/pavlo.svg",
    label: "/pavlo.svg",
    note: "SVG instead of PNG",
  },
  {
    url: "/marco@example.com",
    label: "/marco@example.com",
    note: "Works with email addresses",
  },
  {
    url: "/pavlo?variant=qr",
    label: "/pavlo?variant=qr",
    note: "QR-like pixel grid",
  },
  {
    url: "/pavlo?variant=qr&rounded=20",
    label: "/pavlo?variant=qr&rounded=20",
    note: "QR variant with rounded corners",
  },
];

const gallery = ["pavlo", "claudia", "priya", "kenji", "noor", "lara"];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Avatar",
  url: SITE_URL,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  description:
    "Generate deterministic gradient avatars from any string. Free, open source, PNG or SVG, size and rounded options.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex flex-1 flex-col bg-zinc-50 font-sans text-zinc-900 dark:bg-black dark:text-zinc-100">
        <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-16 px-6 py-20 sm:px-10">
          <header className="flex flex-col gap-6">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Gradient avatars, by URL.
            </h1>
            <p className="max-w-xl text-lg leading-7 text-zinc-600 dark:text-zinc-400">
              Drop any name, email, or string into the URL. Get back a unique,
              deterministic gradient avatar in PNG or SVG. No editor, no
              signup, no account.
            </p>
            <div className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/pavlo?rounded=90"
                alt="Example gradient avatar for the seed 'pavlo'"
                width={64}
                height={64}
                className="h-16 w-16 shrink-0"
              />
              <pre className="min-w-0 flex-1 overflow-x-auto text-sm">
                <code className="font-mono">
                  {`<img src="${SITE_URL}/anyname" />`}
                </code>
              </pre>
            </div>
          </header>

          <section className="flex flex-col gap-4">
            <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500">
              Every name gets its own gradient
            </h2>
            <div className="flex flex-wrap gap-6">
              {gallery.map((seed) => (
                <a
                  key={seed}
                  href={`/${seed}`}
                  target="_blank"
                  className="flex flex-col items-center gap-2"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/${seed}?rounded=90`}
                    alt={`Gradient avatar for ${seed}`}
                    width={90}
                    height={90}
                    className="h-[90px] w-[90px]"
                  />
                  <code className="text-xs text-zinc-500">/{seed}</code>
                </a>
              ))}
            </div>
            <p className="text-sm text-zinc-500">
              Same string → same gradient. Forever.
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500">
              Or a QR-like pixel grid
            </h2>
            <div className="flex flex-wrap gap-6">
              {gallery.map((seed) => (
                <a
                  key={seed}
                  href={`/${seed}?variant=qr`}
                  target="_blank"
                  className="flex flex-col items-center gap-2"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/${seed}?variant=qr&rounded=12`}
                    alt={`QR-like avatar for ${seed}`}
                    width={90}
                    height={90}
                    className="h-[90px] w-[90px]"
                  />
                  <code className="text-xs text-zinc-500">/{seed}?variant=qr</code>
                </a>
              ))}
            </div>
            <p className="text-sm text-zinc-500">
              Same string → same pattern. Looks like a QR code, isn’t one.
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500">
              URL patterns
            </h2>
            <ul className="flex flex-col gap-3">
              {examples.map((example) => (
                <li
                  key={example.label}
                  className="flex items-center gap-4 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={example.url}
                    alt={example.note}
                    width={64}
                    height={64}
                    className="h-16 w-16 shrink-0"
                  />
                  <div className="flex min-w-0 flex-col gap-1">
                    <code className="truncate font-mono text-sm">
                      {example.label}
                    </code>
                    <span className="text-sm text-zinc-500">
                      {example.note}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col gap-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500">
              Parameters
            </h2>
            <p>
              <code className="font-mono text-zinc-900 dark:text-zinc-100">
                size
              </code>
              : square edge in pixels. Default <code>180</code>, clamped to{" "}
              <code>16–1024</code>.
            </p>
            <p>
              <code className="font-mono text-zinc-900 dark:text-zinc-100">
                rounded
              </code>
              : border-radius in pixels. Default <code>0</code>, clamped to{" "}
              <code>0–size/2</code>. Use <code>rounded ≥ size/2</code> for a
              full circle.
            </p>
            <p>
              Append{" "}
              <code className="font-mono text-zinc-900 dark:text-zinc-100">
                .svg
              </code>{" "}
              to the path to get an SVG response instead of PNG.
            </p>
            <p>
              <code className="font-mono text-zinc-900 dark:text-zinc-100">
                variant
              </code>
              : <code>gradient</code> (default) or <code>qr</code> for a
              QR-like 10x10 monochrome pixel grid. Purely visual, not a
              scannable code.
            </p>
          </section>

          <footer className="flex flex-wrap justify-between items-center gap-x-4 gap-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500 dark:border-zinc-800">
            <span>
              by{" "}
              <a
                href="https://pavlo.sh"
                className="font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-100"
                rel="noopener noreferrer"
              >
                Pavlo Golovatyy
              </a>
            </span>
            <a
              href="https://github.com/pavlogolovatyy/avatar"
              className="font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-100"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          </footer>
        </main>
      </div>
    </>
  );
}
