'use client'

import { Coin } from "@/types";
import ParticlesBackground from "@/components/Background";
import { useQuery } from "@tanstack/react-query";
import CoinCard from "@/components/Coins";
import { fetchCoins } from "@/services/CoinGecko";
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import SearchBar from "@/components/SearchBar";
import SortControl from "@/components/SortControl";

const defaultCoinIds = ['bitcoin', 'ethereum', 'solana', 'matic-network', 'dogecoin'];


export default function Home() {

  const [coinIds, setCoinIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('coinIds');
      return saved ? JSON.parse(saved) : defaultCoinIds;
    }
    return defaultCoinIds;
  });

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sortOrder');
      return saved ? (saved as 'asc' | 'desc') : 'desc';
    }
    return 'desc';
  });

  useEffect(() => {
    localStorage.setItem('coinIds', JSON.stringify(coinIds));
  }, [coinIds]);

  useEffect(() => {
    localStorage.setItem('sortOrder', sortOrder);
  }, [sortOrder]);

  const { data: coins, isLoading, isError, refetch } = useQuery<Coin[]>({
    queryKey: ['coins', coinIds],
    queryFn: () => fetchCoins(coinIds),
    refetchInterval: 30_000,
  });

  useEffect(() => {
    if (isError) {
      toast.error(
        <div>
          Failed to load coin data.
          <button
            onClick={() => refetch()}
            className="ml-2 underline text-cyan-400 hover:text-cyan-300"
          >
            Retry
          </button>
        </div>,
        { duration: 5000 }
      );
    }
  }, [isError, refetch]);

  const handleAddCoin = (coinId: string) => {
    if (coinIds.includes(coinId)) {
      toast.error('Coin already added', { duration: 3000 });
      return;
    }
    setCoinIds((prev) => [...prev, coinId]);
    toast.success('Coin added', { duration: 3000 });
  };

  const handleRemoveCoin = (coinId: string) => {
    setCoinIds((prev) => prev.filter((id) => id !== coinId));
    toast.success('Coin removed', { duration: 3000 });
  };

  const handleSortChange = (order: 'asc' | 'desc') => {
    setSortOrder(order);
    toast.success(`Sorted by 24h change (${order === 'asc' ? 'low to high' : 'high to low'})`, {
      duration: 3000,
    });
  };

  // Sort coins by price_change_percentage_24h
  const sortedCoins = coins
    ? [...coins].sort((a, b) => {
        return sortOrder === 'asc'
          ? a.price_change_percentage_24h - b.price_change_percentage_24h
          : b.price_change_percentage_24h - a.price_change_percentage_24h;
      })
    : [];

  return (
    <main className="min-h-screen relative">
    {/* Particle Background */}
    <ParticlesBackground />

    <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">
        CoinTra
      </h1>

      {/* Search Bar and Sort Control */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <SearchBar onAddCoin={handleAddCoin} />
          </div>
          <div className="w-full sm:w-48">
            <SortControl onSortChange={handleSortChange} />
          </div>
        </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 animate-fade-in">
          {isLoading ? (
            Array(coinIds.length)
              .fill(null)
              .map((_, index) => <CoinCard key={index} />)
          ) : sortedCoins.length > 0 ? (
            sortedCoins.map((coin) => (
              <CoinCard
                key={coin.id}
                coin={coin}
                onRemove={handleRemoveCoin}
              />
            ))
          ) : (
            <p className="text-white text-center col-span-full">
              No coins available. Please try again later.
            </p>
          )}
        </div>
    </div>
  </main>
);
}