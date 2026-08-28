'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { searchCoins } from '@/services/CoinGecko';
import { SearchCoin } from '@/types';
import { useDebounce } from 'use-debounce';
import Image from 'next/image';

interface SearchBarProps {
  onAddCoin: (coinId: string) => void;
}

export default function SearchBar({ onAddCoin }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 300);

  const { data: searchResults, isLoading } = useQuery<SearchCoin[]>({
    queryKey: ['searchCoins', debouncedQuery],
    queryFn: () => searchCoins(debouncedQuery),
    enabled: !!debouncedQuery.trim(),
  });

  const handleSelectCoin = (coin: SearchCoin) => {
    onAddCoin(coin.id);
    setQuery(''); // Clear input after selection
  };

  // Validate URL to ensure it's an absolute HTTPS URL
  const isValidImageUrl = (url: string) => {
    try {
      const parsed = new URL(url);
      return parsed.protocol === 'https:';
    } catch {
      return false;
    }
  };

  return (
    <div className="relative w-full">
      <div className="relative flex items-center">
        {/* Search Icon */}
        <div className="absolute left-4 pointer-events-none text-slate-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <input
          type="text"
          placeholder="Search any token or coin (e.g. Bitcoin, Solana, Pepe)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400/80 focus:ring-2 focus:ring-cyan-400/20 transition-all shadow-inner text-sm sm:text-base"
        />

        {/* Clear Button */}
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Clear search"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Autocomplete Dropdown */}
      {debouncedQuery && (searchResults || isLoading) && (
        <div className="absolute left-0 right-0 mt-2 bg-slate-900/95 backdrop-blur-2xl border border-cyan-500/30 rounded-2xl shadow-2xl z-30 max-h-72 overflow-y-auto animate-fade-in divide-y divide-white/[0.05]">
          {isLoading ? (
            <div className="flex items-center gap-3 p-4 text-slate-400 text-sm">
              <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
              <span>Searching crypto database...</span>
            </div>
          ) : searchResults && searchResults.length > 0 ? (
            searchResults.map((coin) => (
              <button
                key={coin.id}
                onClick={() => handleSelectCoin(coin)}
                className="w-full flex items-center justify-between p-3.5 hover:bg-cyan-500/10 transition-all text-left group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {coin.thumb && isValidImageUrl(coin.thumb) ? (
                    <Image
                      src={coin.thumb}
                      alt={coin.name}
                      width={24}
                      height={24}
                      className="w-6 h-6 rounded-full object-contain"
                    />
                  ) : (
                    <div className="w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center text-[10px] font-bold text-cyan-300">
                      {coin.symbol?.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div className="truncate">
                    <span className="font-semibold text-white group-hover:text-cyan-300 transition-colors text-sm">
                      {coin.name}
                    </span>
                    <span className="ml-2 text-xs font-mono text-slate-400 uppercase">
                      {coin.symbol}
                    </span>
                  </div>
                </div>

                <span className="text-xs font-medium text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 group-hover:bg-cyan-500/20 px-2.5 py-1 rounded-lg transition-all flex items-center gap-1">
                  <span>+ Add</span>
                </span>
              </button>
            ))
          ) : (
            <div className="p-4 text-center text-slate-400 text-sm">
              No matching coins found for &ldquo;{debouncedQuery}&rdquo;
            </div>
          )}
        </div>
      )}
    </div>
  );
}