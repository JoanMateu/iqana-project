// export type Holding = {
//   id: number;
//   name: string;    
//   symbol: string;  
//   amount: number;  
//   value: number;   
//   percentage: number; 
// };

export type Holding = {
  asset: string;
  amount: number;
};

export type HoldingsResponse = {
  source: "mock" | "cache" | "live";
  data: Holding[];
  timestamp: number | null;
};