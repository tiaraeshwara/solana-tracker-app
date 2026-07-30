import { getTrendingTokens } from "@/lib/api";

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
        <p style={{ color: "red" }}>Error: {error}</p>
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
            <tr key={t.token.mint} style={{ borderTop: "1px solid #eee" }}>
              <td>{t.token.name}</td>
              <td>{t.token.symbol}</td>
              <td>${t.pools?.[0]?.price?.usd?.toFixed(6) ?? "N/A"}</td>
              <td>
                {t.events?.["24h"]?.priceChangePercentage != null
                  ? `${t.events["24h"].priceChangePercentage.toFixed(2)}%`
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
