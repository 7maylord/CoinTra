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
    <div className="relative">
      <input
        type="text"
        placeholder="Search for a coin (e.g., Lisk)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-4 rounded-xl bg-white/10 backdrop-blur-md border border-cyan-500/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
      />
      {debouncedQuery && (searchResults || isLoading) && (
        <div className="absolute w-full mt-2 bg-white/10 backdrop-blur-md border border-cyan-500/30 rounded-xl shadow-lg z-20 max-h-64 overflow-y-auto animate-fade-in">
          {isLoading ? (
            <p className="p-4 text-gray-400">Searching...</p>
          ) : searchResults && searchResults.length > 0 ? (
            searchResults.map((coin) => (
              <button
                key={coin.id}
                onClick={() => handleSelectCoin(coin)}
                className="w-full flex items-center p-4 hover:bg-cyan-500/20 transition-all text-left"
              >
                {coin.thumb && isValidImageUrl(coin.thumb) ? (
                  <Image
                    src={coin.thumb}
                    alt={coin.name}
                    width={24}
                    height={24}
                    className="mr-2"
                  />
                ) : (
                    <div className='w-6 h-6 bg-gray-600 rounded-full mr-2' />
                )}
                <span className="text-white">{coin.name} ({coin.symbol.toUpperCase()})</span>
              </button>
            ))
          ) : (
            <p className="p-4 text-gray-400">No coins found</p>
          )}
        </div>
      )}
    </div>
  );
}