# SolanaTracker Next.js App

A small Next.js (TypeScript) application built for [assignment name] that uses the [SolanaTracker Data API](https://docs.solanatracker.io) to display trending Solana tokens, look up wallet balances, and detect a Phantom wallet connection.

**Live demo:** [https://solana-tracker-app-navy.vercel.app/](https://solana-tracker-app-navy.vercel.app/)

## Features

### 1. Trending Tokens — `/`
Displays a live list of trending Solana tokens with name, symbol, current USD price, and 24h price change. Handles loading and error states.

### 2. Wallet Information — `/wallet/[address]`
Given a Solana wallet address, displays:
- SOL balance
- SPL token balances (mint, symbol, name, amount)
- Validates the address format and shows an error for invalid input

### 3. Phantom Wallet Detection (Bonus) — `/phantom`
- If the [Phantom](https://chromewebstore.google.com/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa?hl=en) extension is installed, connects and displays the wallet's public key
- If not installed, shows an install prompt with a link to the Chrome Web Store

## Tech Stack

- **Framework:** Next.js 15 (App Router), TypeScript
- **Styling:** [Tailwind CSS / inline styles — adjust to what you used]
- **Data source:** SolanaTracker Data API (`https://data.solanatracker.io`)
- **Wallet integration:** Phantom browser extension (`window.solana`)
- **Hosting:** Vercel

## Project Structure

├── app/
│ ├── page.tsx # Trending tokens page
│ ├── loading.tsx # Loading UI for trending page
│ ├── layout.tsx # Root layout + nav
│ ├── wallet/[address]/page.tsx # Wallet lookup page
│ └── phantom/page.tsx # Phantom detection page
├── components/
│ ├── TokenCard.tsx # Trending token row
│ ├── Loading.tsx # Shared loading state
│ └── ErrorMessage.tsx # Shared error state
├── lib/
│ └── api.ts # SolanaTracker API helper functions
├── .env.local # API key (not committed)
└── README.md


## Getting Started

### Prerequisites
- Node.js 18+
- A SolanaTracker API key ([sign up here](https://www.solanatracker.io/account))

### Setup

1. Clone the repo:
```bash
   git clone https://github.com/tiaraeshwara/solana-tracker-app.git
   cd solana-tracker-app
```

2. Install dependencies:
```bash
   npm install
```

3. Create a `.env.local` file in the project root:

SOLANA_TRACKER_API_KEY=your_api_key_here


4. Run the dev server:
```bash
   npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

| Variable | Description |
|---|---|
| `SOLANA_TRACKER_API_KEY` | API key for SolanaTracker Data API, used server-side only |

> The API key is never exposed to the client — all requests to SolanaTracker happen inside server components / API routes.

## Testing the App

- **Trending page:** loads automatically at `/`
- **Wallet page:** try a real address, e.g. `/wallet/DYw8jCTfwHNRJhhmFcbXvVDTqWMEVFBX6ZKUmG5CNSKK`, or an invalid one like `/wallet/123` to see the validation error
- **Phantom page:** visit `/phantom` with the Phantom extension installed vs. in an incognito window without it, to see both states

## Deployment

This app is deployed on [Vercel](https://solana-tracker-app-navy.vercel.app/). To deploy your own copy:

1. Push the repo to GitHub
2. Import the project in Vercel
3. Add `SOLANA_TRACKER_API_KEY` under Project Settings → Environment Variables
4. Deploy

## Notes / Known Limitations

- [e.g. "Trending token list is limited to the top N tokens returned by the API"]
- [e.g. "Wallet page does not paginate token lists for wallets with very large holdings"]
- [Add anything else worth flagging to a reviewer]

## Author

Tiara Eshwara — built as part of an assignment