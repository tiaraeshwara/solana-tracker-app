import { getTrendingTokens } from "@/lib/api";
import TokenCard from "@/components/TokenCard";
import ErrorMessage from "@/components/ErrorMessage";

type TrendingItem = {
  token: { name: string; symbol: string; mint: string };
  pools: { price: { usd: number } }[];
  events?: { "24h"?: { priceChangePercentage: number } };
};

export default async function HomePage() {
  let tokens: TrendingItem[] = [];
  let error: string | null = null;

  try {
    const data = await getTrendingTokens("24h");
    tokens = Array.isArray(data) ? data : data.data ?? [];
  } catch (e) {
    error = e instanceof Error ? e.message : "Something went wrong";
  }

  if (error) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Trending Tokens</h1>
        <ErrorMessage message={error} />
      </main>
    );
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Trending Tokens</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th align="left">Name</th>
            <th align="left">Symbol</th>
            <th align="left">Price (USD)</th>
            <th align="left">24h Change</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((t) => (
            <TokenCard
              key={t.token.mint}
              name={t.token.name}
              symbol={t.token.symbol}
              priceUsd={t.pools?.[0]?.price?.usd ?? null}
              change24h={t.events?.["24h"]?.priceChangePercentage ?? null}
            />
          ))}
        </tbody>
      </table>
    </main>
  );
}
