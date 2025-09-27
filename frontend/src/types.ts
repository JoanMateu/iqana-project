export type Holding = {
  asset: string;
  amount: number;
  value_eur?: number | null;
};

export type HoldingsResponse = {
  source: "mock" | "cache" | "live";
  data: Holding[];
  timestamp: number | null;
  username?: string | null;
  
};