import { Coin } from '@/types';
import Image from 'next/image';

interface CoinCardProps {
  coin?: Coin; // Optional for skeleton loading
  onRemove?: (coinId: string) => void; // Callback for removing coin
}

export default function CoinCard({ coin, onRemove }: CoinCardProps) {
  if (!coin) {
    // Skeleton loading state with modern shimmer
    return (
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950/80 border border-white/[0.07] p-5 backdrop-blur-xl animate-pulse">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-800/80 rounded-xl" />
            <div className="space-y-1.5">
              <div className="h-4 w-24 bg-slate-800/80 rounded" />
              <div className="h-3 w-12 bg-slate-800/60 rounded" />
            </div>
          </div>
          <div className="w-8 h-8 bg-slate-800/50 rounded-lg" />
        </div>
        <div className="space-y-2 mb-4">
          <div className="h-7 w-32 bg-slate-800/80 rounded-lg" />
          <div className="h-4 w-20 bg-slate-800/60 rounded-md" />
        </div>
        <div className="pt-3 border-t border-white/[0.05] flex justify-between items-center">
          <div className="h-3 w-16 bg-slate-800/50 rounded" />
          <div className="h-3 w-20 bg-slate-800/50 rounded" />
        </div>
      </div>
    );
  }

  const priceChange = coin.price_change_percentage_24h;
  const hasPriceChange =
    typeof priceChange === 'number' && !Number.isNaN(priceChange);
  const isPositive = hasPriceChange && priceChange >= 0;

  // Format price nicely
  const formattedPrice =
    typeof coin.current_price === 'number'
      ? coin.current_price < 1
        ? `$${coin.current_price.toFixed(4)}`
        : `$${coin.current_price.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`
      : 'N/A';

  // Calculate 24h range percentage if high and low are available
  const hasRange =
    typeof coin.current_price === 'number' &&
    typeof coin.high_24h === 'number' &&
    typeof coin.low_24h === 'number' &&
    coin.high_24h > coin.low_24h;

  const rangePercent = hasRange
    ? Math.max(
        0,
        Math.min(
          100,
          ((coin.current_price! - coin.low_24h!) /
            (coin.high_24h! - coin.low_24h!)) *
            100
        )
      )
    : null;

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900/85 via-slate-900/70 to-slate-950/90 border border-white/[0.08] hover:border-cyan-500/40 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-8px_rgba(6,182,212,0.2)]">
      {/* Top accent glow line on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/0 to-transparent group-hover:via-cyan-400/80 transition-all duration-500" />

      {/* Header: Coin Logo, Name, Symbol, and Action */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative flex-shrink-0 w-10 h-10 rounded-xl bg-slate-800/80 p-1.5 border border-white/10 group-hover:border-cyan-500/30 transition-colors shadow-inner flex items-center justify-center">
            {coin.image ? (
              <Image
                src={coin.image}
                alt={coin.name}
                width={28}
                height={28}
                className="w-7 h-7 object-contain rounded-full"
              />
            ) : (
              <span className="text-xs font-bold text-cyan-400">
                {coin.symbol?.slice(0, 3).toUpperCase()}
              </span>
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-white text-base truncate group-hover:text-cyan-300 transition-colors">
                {coin.name}
              </h3>
              {coin.market_cap_rank && (
                <span className="text-[10px] font-semibold text-slate-400 bg-white/[0.06] px-1.5 py-0.5 rounded border border-white/[0.05]">
                  #{coin.market_cap_rank}
                </span>
              )}
            </div>
            <span className="inline-block text-xs font-mono font-medium text-cyan-400/80 tracking-wider">
              {coin.symbol?.toUpperCase()}
            </span>
          </div>
        </div>

        {onRemove && (
          <button
            onClick={() => onRemove(coin.id)}
            title="Remove coin"
            aria-label={`Remove ${coin.name}`}
            className="opacity-60 hover:opacity-100 p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all duration-200"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Main Price & Trend */}
      <div className="mb-4">
        <div className="text-xs text-slate-400 font-medium mb-1">Current Price</div>
        <div className="flex items-baseline justify-between gap-2 flex-wrap">
          <span className="text-2xl font-extrabold text-white tracking-tight font-mono">
            {formattedPrice}
          </span>
          <div
            className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${
              !hasPriceChange
                ? 'bg-slate-800 text-slate-400 border-slate-700'
                : isPositive
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
            }`}
          >
            {hasPriceChange && (
              <svg
                className={`w-3 h-3 ${isPositive ? 'rotate-0' : 'rotate-180'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M5 15l7-7 7 7"
                />
              </svg>
            )}
            <span>
              {hasPriceChange
                ? `${isPositive ? '+' : ''}${priceChange.toFixed(2)}%`
                : 'N/A'}
            </span>
          </div>
        </div>
      </div>

      {/* 24h Range Bar or Quick Stats */}
      {hasRange && rangePercent !== null ? (
        <div className="pt-3 border-t border-white/[0.06] space-y-1.5">
          <div className="flex justify-between text-[11px] text-slate-400 font-mono">
            <span>24h L: ${coin.low_24h?.toLocaleString()}</span>
            <span>24h H: ${coin.high_24h?.toLocaleString()}</span>
          </div>
          <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden p-0.5 border border-white/[0.04]">
            <div
              className="bg-gradient-to-r from-cyan-400 to-indigo-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${rangePercent}%` }}
            />
          </div>
        </div>
      ) : (
        <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400">
          <span>24h Window</span>
          <span className="font-mono text-slate-300">Live Feed</span>
        </div>
      )}
    </div>
  );
}