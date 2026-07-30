const API_KEY = process.env.SOLANA_TRACKER_API_KEY;

export async function fetchFromAPI(endpoint: string) {
    const response = await fetch(endpoint, {
        headers: {
            "x-api-key": API_KEY!
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch");
    }

    return response.json();
}