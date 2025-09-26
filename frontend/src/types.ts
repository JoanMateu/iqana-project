export type Holding = {
  asset: string;
  amount: number;
};

export type HoldingsResponse = {
  source: "mock" | "cache" | "live";
  data: Holding[];
  timestamp: number | null;
  username?: string | null;
};