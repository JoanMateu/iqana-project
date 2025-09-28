// src/pages/NextSteps.tsx
export default function NextSteps() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Next Steps</h1>
      <ul className="list-disc list-inside space-y-3 text-[15px] leading-relaxed">
        <li>
          <strong>Add alarms & visibility:</strong> Add <em>Alarms</em> (SNS) for error rate and p95 latency, and cache fail.
        </li>
        <li>
          <strong>Frontend tests:</strong> Add React Testing Library for component tests
          (refresh action)
        </li>
        <li>
          <strong>Containerization:</strong> for backend and frontend (multi-stage builds) - Kubernetes
        </li>
      </ul>
    </div>
  );
}