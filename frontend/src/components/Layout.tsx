import { useState, useEffect } from "react";
import Header from "./Header";
import { getHoldings } from "../api";
import type { HoldingsResponse } from "../types";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const resp: HoldingsResponse = await getHoldings("live"); 
        if (resp.username) {
          setUsername(resp.username);
        }
      } catch (err) {
        console.error("Error fetching username:", err);
      }
    }
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-gray-800">
      <Header username={username} />
      <main className="pt-16">{children}</main>
    </div>
  );
}
