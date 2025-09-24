import React from "react";

type Props = {
  onClick: () => void;
  loading?: boolean;
  label?: string;
};

export default function RefreshButton({ onClick, loading, label = "Refresh" }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-lg border border-gray-300
                 px-3 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50
                 disabled:opacity-50 disabled:cursor-not-allowed
                 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:hover:bg-gray-600"
      aria-label="Refresh"
      title="Refresh"
    >
      <svg className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} viewBox="0 0 20 20" fill="currentColor">
        <path d="M4 4v4h.01L6 6a6 6 0 116 10 1 1 0 10-1.5 1.32A8 8 0 104 6l-.01 2H0V4h4z" />
      </svg>
      {loading ? "Refreshing..." : label}
    </button>
  );
}