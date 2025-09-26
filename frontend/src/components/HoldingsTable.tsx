import { useState, useEffect } from "react";
import type { Holding, HoldingsResponse } from "../types";
import RefreshButton from "./RefreshButton";
import { getHoldings } from "../api";


export default function HoldingsTable() {
  const [data, setData] = useState<HoldingsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function handleRefresh() {
    try {
      setLoading(true);
      setErr(null);
      const resp = await getHoldings("live");
      setData(resp);
      setLastUpdated(new Date());
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // Al cargar, intenta mostrar cache o mock
    handleRefresh();
  }, []);

  const ts = data?.timestamp ? new Date(data.timestamp * 1000).toLocaleString() : "-";

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center">
      <div className="mx-auto w-11/12 max-w-5xl">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              Your Holdings
            </h1>

            <div className="flex items-center gap-3">
              {lastUpdated && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Updated: {lastUpdated.toLocaleTimeString()} (source: {data?.source})
                </span>
              )}
              <RefreshButton onClick={handleRefresh} loading={loading} />
            </div>
          </div>

          {/* Error */}
          {err && <div className="px-4 py-2 text-red-600 text-sm">Error: {err}</div>}

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300">
              <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700/80 dark:text-gray-200">
                <tr>
                  <th className="px-4 py-3">Asset</th>
                  <th className="px-4 py-3">Amount</th>
                </tr>
              </thead>
              <tbody>
                {(data?.data ?? []).map((h: Holding) => (
                  <tr
                    key={h.asset}
                    className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/60"
                  >
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                      {h.asset}
                    </td>
                    <td className="px-4 py-3">{h.amount}</td>
                  </tr>
                ))}
                {(!data || data.data.length === 0) && !loading && (
                  <tr>
                    <td colSpan={2} className="px-4 py-3 text-gray-500 text-center">
                      No data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400">
            {ts !== "-" ? `Last update: ${ts}` : "No updates yet"}
          </div>
        </div>
      </div>
    </section>
  );
}
