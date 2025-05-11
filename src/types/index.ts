export interface Coin {
    id: string;
    name: string;
    symbol: string;
    current_price: number;
    price_change_percentage_24h: number;
    image: string;
  }
  
export interface SearchCoin {
    id: string;
    name: string;
    symbol: string;
    thumb: string; // Small logo image
  }