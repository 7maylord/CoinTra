import { Coin, SearchCoin } from "@/types";

export async function fetchCoins(coinIds: string[]): Promise<Coin[]> {
  const ids = coinIds.join(',');
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch coin data');
  }

  const data: Coin[] = await response.json();
  console.log('CoinGecko API Response:', data);
  return data;
}

export async function searchCoins(query: string): Promise<SearchCoin[]> {
    if (!query.trim()) {
      return [];
    }
    const response = await fetch(
      `https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(query)}`
    );
  
    if (!response.ok) {
      throw new Error('Failed to search coins');
    }
  
    const data = await response.json();
    console.log('CoinGecko Search Response:', data); 
    return data.coins || [];
  }