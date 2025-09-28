// src/pages/Documentation.tsx
export default function Documentation() {
  const diagrams = import.meta.glob("../assets/architecture-*.svg", {
    eager: true,
    query: "?url",
    import: "default",
  }) as Record<string, string>;

  const items = Object.entries(diagrams)
    .map(([path, url]) => {
      const file = path.split("/").pop() || "";
      const base = (file || "").replace(/\.svg$/i, "");
      let displayTitle = "Architecture — Diagram";
      if (/backend/i.test(base)) displayTitle = "Architecture — Backend";
      if (/frontend/i.test(base)) displayTitle = "Architecture — Frontend";
      return { file, url, displayTitle };
    })
    .sort((a, b) => a.file.localeCompare(b.file));

  const cicdBackendMatch = import.meta.glob("../assets/ci_cd_backend.svg", {
    eager: true,
    query: "?url",
    import: "default",
  }) as Record<string, string>;
  const cicdFrontendMatch = import.meta.glob("../assets/ci_cd_frontend.svg", {
    eager: true,
    query: "?url",
    import: "default",
  }) as Record<string, string>;

  const cicdBackendUrl = Object.values(cicdBackendMatch)[0];
  const cicdFrontendUrl = Object.values(cicdFrontendMatch)[0];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-gray-800">
      {/* OVERVIEW */}
      <div id="overview" className="relative -top-16"></div>

      <h1 className="text-3xl font-bold mb-4">Technical Test — Overview</h1>

      <p className="text-[15px] leading-relaxed mb-4">
        This project delivers a small, end-to-end solution with a lightweight{" "}
        <strong>backend API</strong>, a minimal <strong>React</strong> frontend, and a{" "}
        <strong>Coinbase connector</strong>, all deployed on <strong>AWS</strong> via
        infrastructure as code. The architecture is simple, reliable, and resilient: it
        fetches and returns a user's Coinbase holdings and, if the upstream call fails,
        serves recent <strong>cached data</strong> to preserve responsiveness.
      </p>

      {/* ARCHITECTURE */}
      <div id="architecture" className="relative -top-16"></div>
      <h2 className="text-2xl font-semibold mb-3">Architecture</h2>

      {items.length === 0 ? (
        <p className="text-sm text-gray-600">
          Add SVGs under <code>src/assets/</code> with names starting with{" "}
          <code>architecture-</code> (e.g., <code>architecture-system-backend.svg</code>).
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 mb-6">
          {items.map(({ file, url, displayTitle }) => (
            <figure key={file} className="rounded-xl border bg-white p-3 shadow-sm">
              {/* Title above the rectangle */}
              <h3 className="text-base font-semibold mb-2">{displayTitle}</h3>
              <img src={url} alt={displayTitle} className="w-full h-auto" loading="lazy" />
            </figure>
          ))}
        </div>
      )}

      {/* CI/CD — Backend */}
      <div id="ci-cd-backend" className="relative -top-16"></div>
      {cicdBackendUrl ? (
        <figure className="rounded-xl border bg-white p-3 shadow-sm mb-8">
          <h3 className="text-base font-semibold mb-2">CI/CD — Backend</h3>
          <img src={cicdBackendUrl} alt="CI/CD Backend" className="w-full h-auto" loading="lazy" />
        </figure>
      ) : (
        <p className="text-sm text-gray-600 mb-8">
          Add <code>src/assets/ci_cd_backend.svg</code> to display the backend pipeline diagram.
        </p>
      )}

      {/* CI/CD — Frontend */}
      <div id="ci-cd-frontend" className="relative -top-16"></div>
      {cicdFrontendUrl ? (
        <figure className="rounded-xl border bg-white p-3 shadow-sm mb-10">
          <h3 className="text-base font-semibold mb-2">CI/CD — Frontend</h3>
          <img src={cicdFrontendUrl} alt="CI/CD Frontend" className="w-full h-auto" loading="lazy" />
        </figure>
      ) : (
        <p className="text-sm text-gray-600 mb-10">
          Add <code>src/assets/ci_cd_frontend.svg</code> to display the frontend pipeline diagram.
        </p>
      )}

      {/* KEY DECISIONS */}
      <div id="decisions" className="relative -top-16"></div>
      <h2 className="text-2xl font-semibold mb-3">Key Decisions</h2>

      <div className="space-y-6 text-[15px] leading-relaxed">
        <section>
          <h3 className="font-semibold mb-1">Backend — FastAPI - Python</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>Fast to build, low boilerplate:</strong> concise routing and validation with Pydantic.
            </li>
            <li>
              <strong>Easy HTTP integration:</strong> maps naturally to API Gateway (HTTP API).
            </li>
          </ul>
        </section>

        <section>
          <h3 className="font-semibold mb-1">Frontend — React + Vite + TypeScript + Tailwind</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>TypeScript:</strong> type safety across API models (holdings).
            </li>
            <li>
              <strong>Tailwind:</strong> state-of-the-art utility CSS, very fast to ship clean UIs.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="font-semibold mb-1">Caching</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>In-memory TTL (L1):</strong> simplest and most efficient for a single-user demo.
            </li>
            <li>
              <strong>Fallback behavior:</strong> when upstream is unavailable, serve the cached snapshot within TTL.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="font-semibold mb-1">Quality & CI/CD</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>GitHub Actions:</strong> pipeline with lint, tests, and builds (backend & frontend) on each merge.
            </li>
            <li>
              <strong>Testing:</strong> <code>pytest</code> for unit and integration; coverage target{" "}
              <strong>75%</strong>.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="font-semibold mb-1">Infrastructure as Code</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>AWS SAM:</strong> chosen for this MVP to keep infra definitions concise and tightly integrated
              with Lambda/API Gateway.
            </li>
            <li>
              <strong>Secrets Manager:</strong> keeps Coinbase credentials out of code and local env files.
            </li>
          </ul>
        </section>
      </div>

      {/* TRADE-OFFS & ALTERNATIVES */}
      <div id="tradeoffs" className="relative -top-16"></div>
      <h2 className="text-2xl font-semibold mt-10 mb-3">Trade-offs & Alternatives</h2>

      <div className="space-y-6 text-[15px] leading-relaxed">
        <section>
          <h3 className="font-semibold mb-1">Compute Model — Serverless vs. Server-based</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>Chosen:</strong> Serverless (<em>API Gateway → Lambda</em>) for pay-per-use, scale-to-zero, and
              minimal ops.
            </li>
            <li>
              <strong>Alternative:</strong> Server-based (EC2/ECS/EKS) adds operational overhead for this MVP.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="font-semibold mb-1">Infrastructure as Code — SAM vs. Terraform</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>Chosen:</strong> AWS SAM for a lean MVP and tight Lambda/API Gateway integration.
            </li>
            <li>
              <strong>Alternative:</strong> Terraform for larger teams or multi-cloud standardization.
            </li>
            <li>
              <strong>Rationale:</strong> SAM provides reproducible config (timeouts, memory, permissions) with less
              boilerplate now.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="font-semibold mb-1">Caching — In-memory L1 vs. DynamoDB/Redis</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>Chosen:</strong> In-memory TTL because the scope is single-user and cold-start tolerance is
              acceptable.
            </li>
            <li>
              <strong>Alternative:</strong> DynamoDB (L2) or Redis for cross-instance sharing and longer retention.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="font-semibold mb-1">Event-driven Refresh — Button vs. EventBridge</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>Chosen:</strong> manual “Refresh” button to keep the system simple and predictable.
            </li>
            <li>
              <strong>Alternative:</strong> EventBridge scheduled refreshes.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
