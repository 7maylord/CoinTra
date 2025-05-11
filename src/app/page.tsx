'use client'

import { Coin } from "@/types";
import ParticlesBackground from "@/components/Background";
import { useQuery } from "@tanstack/react-query";
import CoinCard from "@/components/Coins";
import { fetchCoins } from "@/services/CoinGecko";
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import SearchBar from "@/components/SearchBar";

const defaultCoinIds = ['bitcoin', 'ethereum', 'solana', 'matic-network', 'dogecoin'];


export default function Home() {

  const [coinIds, setCoinIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('coinIds');
      return saved ? JSON.parse(saved) : defaultCoinIds;
    }
    return defaultCoinIds;
  });

  useEffect(() => {
    localStorage.setItem('coinIds', JSON.stringify(coinIds));
  }, [coinIds]);

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

  return (
    <main className="min-h-screen relative">
    {/* Web3 Particle Background */}
    <ParticlesBackground />

    <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">
        CoinTra
      </h1>

      {/* Search Bar */}
      <div className="mb-10">
          <SearchBar onAddCoin={handleAddCoin} />
        </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array(coinIds.length)
              .fill(null)
              .map((_, index) => <CoinCard key={index} />)
          ) : coins && coins.length > 0 ? (
            coins.map((coin) => (
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