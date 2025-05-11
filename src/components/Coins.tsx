import { Coin } from '@/types';
import Image from 'next/image';

interface CoinCardProps {
  coin?: Coin; // Optional for skeleton loading
  onRemove?: (coinId: string) => void; // Callback for removing coin
}

export default function CoinCard({ coin, onRemove }: CoinCardProps) {
  if (!coin) {
    // Skeleton loading state
    return (
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-cyan-500/30 animate-pulse">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-gray-600 rounded-full mr-2"></div>
          <div className="h-6 w-1/2 bg-gray-600 rounded"></div>
        </div>
        <div className="h-4 w-1/3 bg-gray-600 rounded mb-2"></div>
        <div className="h-5 w-1/4 bg-gray-600 rounded mb-2"></div>
        <div className="h-4 w-1/5 bg-gray-600 rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-cyan-500/30 hover:border-cyan-400 transition-all hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {coin.image && (
            <Image
              src={coin.image}
              alt={coin.name}
              width={32}
              height={32}
              className="mr-2"
            />
          )}
          <h2 className="text-xl font-semibold text-white">{coin.name}</h2>
        </div>
        {onRemove && (
          <button
            onClick={() => onRemove(coin.id)}
            className="text-sm text-red-400 hover:text-red-300 bg-white/5 rounded-full px-3 py-1 transition-all"
          >
            Remove
          </button>
        )}
      </div>
      <p className="text-gray-300">Symbol: {coin.symbol.toUpperCase()}</p>
      <p className="text-lg font-bold text-cyan-300">${coin.current_price.toLocaleString()}</p>
      <p
        className={`text-sm font-medium ${
          coin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'
        }`}
      >
        {coin.price_change_percentage_24h >= 0 ? '+' : ''}
        {coin.price_change_percentage_24h.toFixed(2)}% (24h)
      </p>
    </div>
  );
}