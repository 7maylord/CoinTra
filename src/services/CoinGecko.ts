import { Coin } from "@/types";

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