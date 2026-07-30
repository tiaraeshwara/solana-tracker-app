"use client";

import { useState } from "react";

export default function PhantomPage() {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isPhantomInstalled =
    typeof window !== "undefined" && (window as any).solana?.isPhantom;

  async function connectPhantom() {
    setError(null);
    try {
      const provider = (window as any).solana;
      const resp = await provider.connect();
      setPublicKey(resp.publicKey.toString());
    } catch (e) {
      setError("Connection request was rejected or failed.");
    }
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Phantom Wallet</h1>

      {!isPhantomInstalled && (
        <p>
          Install Phantom Wallet extension on Google Chrome to use this
          feature.{" "}
          <a
            href="https://chromewebstore.google.com/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa?hl=en"
            target="_blank"
            rel="noreferrer"
          >
            Get Phantom
          </a>
        </p>
      )}

      {isPhantomInstalled && !publicKey && (
        <button onClick={connectPhantom}>Connect Phantom</button>
      )}

      {publicKey && (
        <p>
          Connected: <strong>{publicKey}</strong>
        </p>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </main>
  );
}