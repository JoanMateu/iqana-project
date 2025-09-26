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
    handleRefresh();
  }, []);

  const ts = data?.timestamp
    ? new Date(data.timestamp * 1000).toLocaleString()
    : "-";

  return (
    <section className="min-h-screen bg-[#FFFFFF] flex items-center">
      <div className="mx-auto w-11/12 max-w-4xl">
        <div className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between bg-[#F8F8F8]">
            <h1 className="text-lg font-semibold text-gray-900">
              Your Holdings
            </h1>

            <div className="flex items-center gap-3">
              {lastUpdated && (
                <span className="text-xs text-gray-500">
                  Updated: {lastUpdated.toLocaleTimeString()} (source: {data?.source})
                </span>
              )}
              <RefreshButton onClick={handleRefresh} loading={loading} />
            </div>
          </div>

          {/* Error */}
          {err && (
            <div className="px-4 py-2 text-red-600 text-sm border-b border-gray-200 bg-red-50">
              Error: {err}
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="bg-[#EEEEEE] text-gray-700 uppercase text-xs tracking-wide border-b border-gray-300">
                <tr>
                  <th className="px-4 py-3 font-semibold">Asset</th>
                  <th className="px-4 py-3 font-semibold text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {(data?.data ?? []).map((h: Holding, idx: number) => (
                  <tr
                    key={h.asset}
                    className={`${
                      idx % 2 === 0 ? "bg-white" : "bg-[#F9F9F9]"
                    } border-b border-gray-200 hover:bg-[#F2FDF5]`}
                  >
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {h.asset}
                    </td>
                    <td className="px-4 py-3 text-right">{h.amount}</td>
                  </tr>
                ))}
                {(!data || data.data.length === 0) && !loading && (
                  <tr>
                    <td
                      colSpan={2}
                      className="px-4 py-3 text-gray-500 text-center bg-[#F9F9F9]"
                    >
                      No data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 text-xs text-gray-500 bg-[#F8F8F8] border-t border-gray-200">
            {ts !== "-" ? `Last update: ${ts}` : "No updates yet"}
          </div>
        </div>
      </div>
    </section>
  );
}
