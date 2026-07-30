import { getWalletInfo } from "@/lib/api";

const SOL_MINT = "So11111111111111111111111111111111111111112";

function isValidSolanaAddress(address: string) {
  // Basic check: Solana addresses are base58, 32-44 chars
  return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
}

export default async function WalletPage({
  params,
}: {
  params: { address: string };
}) {
  const { address } = params;

  if (!isValidSolanaAddress(address)) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Wallet Info</h1>
        <p style={{ color: "red" }}>Invalid wallet address.</p>
      </main>
    );
  }

  let portfolio: any = null;
  let error: string | null = null;

  try {
    portfolio = await getWalletInfo(address);
  } catch (e) {
    error = e instanceof Error ? e.message : "Something went wrong";
  }

  if (error) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Wallet Info</h1>
        <p style={{ color: "red" }}>Error: {error}</p>
      </main>
    );
  }

  const solHolding = portfolio.tokens?.find(
    (t: any) => t.token?.mint === SOL_MINT
  );
  const otherTokens = portfolio.tokens?.filter(
    (t: any) => t.token?.mint !== SOL_MINT
  );

  return (
    <main style={{ padding: 24 }}>
      <h1>Wallet Info</h1>
      <p style={{ wordBreak: "break-all" }}>{address}</p>

      <h2>SOL Balance</h2>
      <p>{solHolding ? `${solHolding.balance} SOL` : "0 SOL"}</p>

      <h2>Token Balances</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th align="left">Symbol</th>
            <th align="left">Name</th>
            <th align="left">Mint</th>
            <th align="left">Balance</th>
          </tr>
        </thead>
        <tbody>
          {otherTokens?.map((holding: any) => (
            <tr key={holding.token.mint} style={{ borderTop: "1px solid #eee" }}>
              <td>{holding.token?.symbol ?? "N/A"}</td>
              <td>{holding.token?.name ?? "N/A"}</td>
              <td style={{ fontSize: 12 }}>{holding.token.mint}</td>
              <td>{holding.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}