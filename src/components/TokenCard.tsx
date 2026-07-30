type TokenCardProps = {
  name: string;
  symbol: string;
  priceUsd: number | null;
  change24h: number | null;
};

export default function TokenCard({
  name,
  symbol,
  priceUsd,
  change24h,
}: TokenCardProps) {
  const isPositive = change24h != null && change24h >= 0;

  return (
    <tr style={{ borderTop: "1px solid #eee" }}>
      <td>{name}</td>
      <td>{symbol}</td>
      <td>{priceUsd != null ? `$${priceUsd.toFixed(6)}` : "N/A"}</td>
      <td style={{ color: change24h != null ? (isPositive ? "green" : "red") : undefined }}>
        {change24h != null ? `${change24h.toFixed(2)}%` : "N/A"}
      </td>
    </tr>
  );
}