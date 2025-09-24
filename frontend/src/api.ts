import type { HoldingsResponse } from "./types";

const BASE = import.meta.env.VITE_BACKEND_URL;

export async function getHoldings(source: "mock" | "cache" | "live" = "live"): Promise<HoldingsResponse> {
  const res = await fetch(`${BASE}/holdings?source=${source}`);
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }
  return res.json();
}