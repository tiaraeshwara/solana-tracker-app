const API_KEY = process.env.SOLANA_TRACKER_API_KEY;
const BASE_URL = "https://data.solanatracker.io";

function getHeaders() {
  const apiKey = API_KEY;
  if (!apiKey) {
    throw new Error("Missing SOLANA_TRACKER_API_KEY in .env.local");
  }
  return { "x-api-key": apiKey };
}

export async function getTrendingTokens(timeframe: string = "24h") {
  const res = await fetch(`${BASE_URL}/tokens/trending/${timeframe}`, {
    headers: getHeaders(),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch trending tokens (${res.status})`);
  }

  return res.json();
}
