'use client';

import { Coin } from "@/types";
import ParticlesBackground from "@/components/Background";
import { useQuery } from "@tanstack/react-query";
import CoinCard from "@/components/Coins";
import { fetchCoins } from "@/services/CoinGecko";
import toast from 'react-hot-toast';
import { useEffect, useState, useMemo } from 'react';
import SearchBar from "@/components/SearchBar";
import SortControl, { SortKey } from "@/components/SortControl";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";

const defaultCoinIds = ['bitcoin', 'ethereum', 'solana', 'matic-network', 'dogecoin', 'ripple', 'cardano', 'binancecoin'];

const popularSuggestions = [
  { id: 'bitcoin', name: 'BTC' },
  { id: 'ethereum', name: 'ETH' },
  { id: 'solana', name: 'SOL' },
  { id: 'ripple', name: 'XRP' },
  { id: 'dogecoin', name: 'DOGE' },
  { id: 'cardano', name: 'ADA' },
  { id: 'avalanche-2', name: 'AVAX' },
  { id: 'chainlink', name: 'LINK' },
];

export default function Home() {
  const [coinIds, setCoinIds] = useState<string[]>(defaultCoinIds);
  const [sortKey, setSortKey] = useState<SortKey>('change_desc');
  const [filterMode, setFilterMode] = useState<'all' | 'gainers' | 'losers'>('all');
  const [isClient, setIsClient] = useState(false);

  // Sync state with localStorage on client-side after hydration
  useEffect(() => {
    setIsClient(true);
    const savedCoinIds = localStorage.getItem('cointra_coinIds');
    if (savedCoinIds) {
      try {
        const parsed = JSON.parse(savedCoinIds);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCoinIds(parsed);
        }
      } catch (e) {
        console.error('Failed to parse saved coin IDs', e);
      }
    }

    const savedSortKey = localStorage.getItem('cointra_sortKey');
    if (savedSortKey) {
      setSortKey(savedSortKey as SortKey);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('cointra_coinIds', JSON.stringify(coinIds));
    }
  }, [coinIds, isClient]);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('cointra_sortKey', sortKey);
    }
  }, [sortKey, isClient]);

  const { data: coins, isLoading, isFetching, isError, refetch } = useQuery<Coin[]>({
    queryKey: ['coins', coinIds],
    queryFn: () => fetchCoins(coinIds),
    enabled: coinIds.length > 0,
    refetchInterval: 30_000,
  });

  useEffect(() => {
    if (isError) {
      toast.error(
        <div className="flex items-center gap-2">
          <span>Failed to load coin data.</span>
          <button
            onClick={() => refetch()}
            className="font-bold underline text-cyan-400 hover:text-cyan-300"
          >
            Retry
          </button>
        </div>,
        { duration: 5000 }
      );
    }
  }, [isError, refetch]);

  const handleAddCoin = (coinId: string) => {
    const normalizedId = coinId.toLowerCase().trim();
    if (coinIds.includes(normalizedId)) {
      toast.error('Coin is already in your watchlist', { duration: 3000 });
      return;
    }
    setCoinIds((prev) => [normalizedId, ...prev]);
    toast.success('Coin added to watchlist', { duration: 3000 });
  };

  const handleRemoveCoin = (coinId: string) => {
    setCoinIds((prev) => prev.filter((id) => id !== coinId));
    toast.success('Coin removed from watchlist', { duration: 2500 });
  };

  const handleResetDefaultCoins = () => {
    setCoinIds(defaultCoinIds);
    toast.success('Restored default coins', { duration: 3000 });
  };

  // Filter and sort coins
  const processedCoins = useMemo(() => {
    if (!coins) return [];

    // Filter
    let list = [...coins];
    if (filterMode === 'gainers') {
      list = list.filter((c) => (c.price_change_percentage_24h ?? 0) > 0);
    } else if (filterMode === 'losers') {
      list = list.filter((c) => (c.price_change_percentage_24h ?? 0) < 0);
    }

    // Sort
    return list.sort((a, b) => {
      const changeA = a.price_change_percentage_24h ?? 0;
      const changeB = b.price_change_percentage_24h ?? 0;
      const priceA = a.current_price ?? 0;
      const priceB = b.current_price ?? 0;

      switch (sortKey) {
        case 'change_desc':
          return changeB - changeA;
        case 'change_asc':
          return changeA - changeB;
        case 'price_desc':
          return priceB - priceA;
        case 'price_asc':
          return priceA - priceB;
        case 'name_asc':
          return a.name.localeCompare(b.name);
        default:
          return changeB - changeA;
      }
    });
  }, [coins, filterMode, sortKey]);

  return (
    <main className="min-h-screen relative bg-[#080c18] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Dynamic Background */}
      <ParticlesBackground />

      {/* Top Glass Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-slate-950/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-teal-400 to-indigo-500 p-0.5 shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-300 font-extrabold text-lg">
                  CT
                </span>
              </div>
            </div>
            <span className="text-xl font-black tracking-tight text-white flex items-center gap-1.5">
              CoinTra
              <span className="text-[10px] font-semibold text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20 uppercase tracking-widest">
                PRO
              </span>
            </span>
          </div>

          {/* Right Status & Refresh */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-white/10 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>30s Live Sync</span>
            </div>

            <button
              onClick={() => {
                refetch();
                toast.success('Refreshing prices...', { id: 'refresh-toast', duration: 1500 });
              }}
              disabled={isFetching}
              title="Refresh live prices"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold transition-all hover:shadow-[0_0_12px_rgba(6,182,212,0.3)] disabled:opacity-50"
            >
              <svg
                className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span className="hidden sm:inline">{isFetching ? 'Syncing...' : 'Refresh'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 relative z-10">
        {/* Hero Section */}
        <HeroSection coinCount={coinIds.length} />

        {/* Quick Suggestion Chips */}
        <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
          <span className="text-slate-400 font-medium whitespace-nowrap flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.527.82-1.173 2.13-1.602 3.824a25.5 25.5 0 00-.73 4.22c-.22 2.05-.28 3.73-.13 4.77.16 1.13.68 1.94 1.48 2.38.8.44 1.78.41 2.87-.1a9.98 9.98 0 003.54-3.03c.69-.93 1.12-1.97 1.25-3.06.13-1.1-.06-2.19-.57-3.13a9.93 9.93 0 00-2.34-2.82c-.52-.42-1.04-.8-1.5-1.13z" clipRule="evenodd" />
            </svg>
            Quick Add:
          </span>
          {popularSuggestions.map((item) => {
            const isAdded = coinIds.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => handleAddCoin(item.id)}
                disabled={isAdded}
                className={`px-2.5 py-1 rounded-lg border font-mono transition-all whitespace-nowrap ${
                  isAdded
                    ? 'bg-slate-800/40 text-slate-500 border-white/[0.04] cursor-default'
                    : 'bg-white/[0.05] hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border-white/10 hover:border-cyan-500/30'
                }`}
              >
                {item.name} {isAdded ? '✓' : '+'}
              </button>
            );
          })}
        </div>

        {/* Search Bar & Sort Control Bar */}
        <div className="mb-6 flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
          <div className="flex-1">
            <SearchBar onAddCoin={handleAddCoin} />
          </div>
          <div className="w-full sm:w-60">
            <SortControl
              currentSort={sortKey}
              onSortChange={(newSort) => {
                setSortKey(newSort);
                toast.success('Watchlist re-sorted', { duration: 2000 });
              }}
            />
          </div>
        </div>

        {/* Filter Pills (All / Gainers / Losers) & Watchlist Count Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterMode === 'all'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Coins ({coins?.length ?? coinIds.length})
            </button>
            <button
              onClick={() => setFilterMode('gainers')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                filterMode === 'gainers'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-emerald-400'
              }`}
            >
              <span>Gainers</span>
              <span className="text-[10px]">🚀</span>
            </button>
            <button
              onClick={() => setFilterMode('losers')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                filterMode === 'losers'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-rose-400'
              }`}
            >
              <span>Losers</span>
              <span className="text-[10px]">🔻</span>
            </button>
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span>Showing {processedCoins.length} of {coinIds.length} tokens</span>
            {coinIds.length > 0 && (
              <button
                onClick={handleResetDefaultCoins}
                className="text-xs text-slate-400 hover:text-cyan-400 underline underline-offset-2 transition-colors"
                title="Reset to default crypto list"
              >
                Reset Default
              </button>
            )}
          </div>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 animate-fade-in">
          {isLoading ? (
            Array(Math.max(4, coinIds.length))
              .fill(null)
              .map((_, index) => <CoinCard key={`skeleton-${index}`} />)
          ) : processedCoins.length > 0 ? (
            processedCoins.map((coin) => (
              <CoinCard
                key={coin.id}
                coin={coin}
                onRemove={handleRemoveCoin}
              />
            ))
          ) : (
            /* Empty State */
            <div className="col-span-full py-16 px-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl text-center max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mx-auto flex items-center justify-center mb-4 text-2xl">
                🔍
              </div>
              <h3 className="text-lg font-bold text-white mb-1">
                {filterMode !== 'all' ? 'No coins match this filter' : 'Your watchlist is empty'}
              </h3>
              <p className="text-sm text-slate-400 mb-6">
                {filterMode !== 'all'
                  ? 'Try switching back to "All Coins" to view your tracked assets.'
                  : 'Search for tokens above or click below to restore popular cryptocurrencies.'}
              </p>
              <div className="flex justify-center gap-3">
                {filterMode !== 'all' ? (
                  <button
                    onClick={() => setFilterMode('all')}
                    className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all"
                  >
                    View All Coins
                  </button>
                ) : (
                  <button
                    onClick={handleResetDefaultCoins}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white text-xs font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                  >
                    Restore Default Watchlist
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}