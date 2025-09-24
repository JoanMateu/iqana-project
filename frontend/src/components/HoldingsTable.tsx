import React, { useState } from "react";
import type { Holding } from "../types";
import RefreshButton from "./RefreshButton";

const MOCK: Holding[] = [
  { id: 1, name: "Bitcoin",  symbol: "BTC", amount: 0.245, value: 6500, percentage: 52.1 },
  { id: 2, name: "Ethereum", symbol: "ETH", amount: 2.1,   value: 3900, percentage: 31.2 },
  { id: 3, name: "Solana",   symbol: "SOL", amount: 15,    value: 2080, percentage: 16.7 },
];

export default function HoldingsTable() {
  const [data, setData] = useState<ReadonlyArray<Holding>>(MOCK);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  async function handleRefresh() {
    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 700));

      setData((prev) =>
        prev.map((h) => ({
          ...h,
          value: h.value + Math.round(Math.random() * 50 - 25),
        }))
      );
      setLastUpdated(new Date());
    } finally {
      setLoading(false);
    }
  }

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
                  Updated: {lastUpdated.toLocaleTimeString()}
                </span>
              )}
              <RefreshButton onClick={handleRefresh} loading={loading} />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300">
              <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700/80 dark:text-gray-200">
                <tr>
                  <th className="px-4 py-3">Asset</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Value ($)</th>
                  <th className="px-4 py-3">% Portfolio</th>
                </tr>
              </thead>
              <tbody>
                {data.map((h) => (
                  <tr
                    key={h.id}
                    className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/60"
                  >
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                      {h.name}{" "}
                      <span className="text-gray-500 dark:text-gray-300">
                        ({h.symbol})
                      </span>
                    </td>
                    <td className="px-4 py-3">{h.amount}</td>
                    <td className="px-4 py-3">
                      ${h.value.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">{h.percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          
          <div className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400">
            footer
          </div>
        </div>
      </div>
    </section>
  );
}
