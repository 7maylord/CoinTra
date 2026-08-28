export interface Coin {
    id: string;
    name: string;
    symbol: string;
    current_price: number | null;
    price_change_percentage_24h: number | null;
    image: string;
    market_cap_rank?: number | null;
    high_24h?: number | null;
    low_24h?: number | null;
    market_cap?: number | null;
    total_volume?: number | null;
  }
  
export interface SearchCoin {
    id: string;
    name: string;
    symbol: string;
    thumb: string; // Small logo image
  }