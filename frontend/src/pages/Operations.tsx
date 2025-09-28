export default function Operations() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Operations & Monitoring</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          Cost Optimization <span className="text-gray-500 font-normal">— How not to burn money</span>
        </h2>
        <ul className="list-disc list-inside space-y-1 text-[15px]">
          <li><strong>Serverless:</strong> API Gateway + Lambda keeps idle cost near zero and scales on demand.</li>
          <li><strong>Static frontend:</strong> S3 + CloudFront is extremely cheap for hosting and bandwidth.</li>
          <li>
            <strong>No managed cache costs:</strong> fallback caching is in-memory only so there's no DynamoDB/Redis spend. It's used strictly on failure, with TTL enforced via.
          </li>
          <li>
            <strong>Test coverage as cost control:</strong> higher coverage reduces regression risk, prevents accidental API breaks, and keeps refactors cheap. It delays “legacy” by making change safe.
          </li>
        </ul>
      </section>

      {/* RELIABILITY & ERROR HANDLING */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Reliability & error handling</h2>
        <ul className="list-disc list-inside space-y-1 text-[15px]">
        <li>
          <strong>Graceful degradation:</strong> even if the live fetch fails, the API keeps working by serving the last
          valid snapshot within TTL Time from in-memory cache, not 100% up-to-date, but functional.
        </li>
          <li><strong>Error classification:</strong> <code>BadSourceError</code> / <code>BadSourceErrorNoCacheData</code> etc... mapped to structured 400s/500s in <code>handlers/exception_handlers.py</code>.</li>
          <li><strong>Type-safe payloads:</strong> Pydantic (<code>schemas.HoldingsResponse</code>, <code>Holding</code>) validates shapes and types.</li>
          <li><strong>Config isolation:</strong> secrets via env (backed by Secrets Manager) in <code>core/settings.py</code>.</li>
        </ul>
      </section>

      {/* MONITORING */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">How we monitor the application</h2>
        <ul className="list-disc list-inside space-y-1 text-[15px]">
          <li><strong>Structured JSON logs:</strong> <code>core/logging.py</code> emits <code>log_info</code>/<code>log_error</code> with an <code>event</code> key for easy CloudWatch filtering.</li>
          <li><strong>Health probe:</strong> <code>GET /health</code> logs <code>health_ok</code> and returns <code>{"{status:'ok'}"}</code>.</li>
          <li><strong>Key events:</strong> <code>holdings_ok</code>, <code>holdings_bad_source</code>, <code>holdings_fallback_cache</code>, <code>holdings_no_cache_error</code>.</li>
          <li><strong>CloudWatch:</strong> ship logs from Lambda; set metric filters & alarms by event name.</li>
        </ul>
        <div className="mt-3 rounded-md border bg-gray-50 p-3">
          <pre className="whitespace-pre-wrap text-xs font-mono">{`[INFO] 2025-09-28T11:22:27.096Z 858f1821-be37-461f-a1f9-db463b9da97c {"event": "holdings_ok", "source": "live", "items": 3, "username": "joan mateu"}
        [INFO] 2025-09-28T11:22:27.097Z 858f1821-be37-461f-a1f9-db463b9da97c {"event": "request_end", "method": "GET", "path": "/api/holdings", "status": 200}`}</pre>
        </div>
      </section>

      {/* METRICS */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Key metrics & logs to track</h2>
        <ul className="list-disc list-inside space-y-1 text-[15px]">
          <li><strong>Availability:</strong> <em>health_ok</em> count; 2XX/4XX/5XX rates (API Gateway/Lambda).</li>
          <li><strong>Latency:</strong> p50/p95/p99 for <code>GET /holdings</code> (API GW + Lambda duration).</li>
          <li><strong>Upstream stability:</strong> frequency of <code>holdings_fallback_cache</code> and Coinbase-tagged errors.</li>
          <li><strong>Throughput:</strong> requests/min; <code>items</code> per response from <code>holdings_ok</code>.</li>
          <li><strong>Cost drivers:</strong> Lambda invocations/duration, API Gateway requests, CloudFront/S3 bandwidth.</li>
        </ul>
      </section>
    </div>
  );
}
