// src/pages/Documentation.tsx
export default function Documentation() {
  // Carga SVGs con el nuevo API (query + import)
  const diagrams = import.meta.glob("../assets/architecture-*.svg", {
    eager: true,
    query: "?url",
    import: "default",
  }) as Record<string, string>;

  const items = Object.entries(diagrams)
    .map(([path, url]) => {
      const file = path.split("/").pop() || "";
      let title = file
        .replace(/architecture[-_]?/i, "")
        .replace(/[-_]/g, " ")
        .replace(/\.svg$/i, "");
      title = title.charAt(0).toUpperCase() + title.slice(1);
      return { file, url, title };
    })
    .sort((a, b) => a.file.localeCompare(b.file));

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-gray-800">
      {/* OVERVIEW */}
      <div id="overview" className="relative -top-16"></div>

      <h1 className="text-3xl font-bold mb-4">Technical Test — Overview</h1>

      <p className="text-[15px] leading-relaxed mb-4">
        This project delivers a small end-to-end system consisting of a lightweight{" "}
        <strong>backend API</strong>, a minimal <strong>React</strong> frontend,
        and a <strong>Coinbase connector</strong>, all deployed on{" "}
        <strong>AWS</strong> using infrastructure as code. The service fetches
        and returns a user’s Coinbase holdings and if the upstream call
        fails serves recent <strong>cached data</strong> to preserve
        user experience.
      </p>

      <ul className="list-disc list-inside space-y-1 text-[15px] mb-8">
        <li>Backend: FastAPI on AWS Lambda (via SAM)</li>
        <li>Frontend: React + Vite + TypeScript + Tailwind</li>
        <li>Secrets: AWS Secrets Manager</li>
        <li>Observability: CloudWatch logs & basic metrics</li>
        <li>Fallback: In-memory TTL cache for degraded mode</li>
      </ul>

      {/* ARCHITECTURE */}
      <div id="architecture" className="relative -top-16"></div>
      <h2 className="text-2xl font-semibold mb-3">Architecture</h2>

      {items.length === 0 ? (
        <p className="text-sm text-gray-600">
          Add SVGs under <code>src/assets/</code> with names starting with{" "}
          <code>architecture-</code> (e.g., <code>architecture-system-backend.svg</code>).
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {items.map(({ file, url, title }) => (
            <figure key={file} className="rounded-xl border bg-white p-3 shadow-sm">
              <img src={url} alt={title} className="w-full h-auto" loading="lazy" />
              <figcaption className="mt-2 text-sm text-gray-600">
                {title}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
