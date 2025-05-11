'use client'

import { Coin } from "@/types";
import ParticlesBackground from "@/components/Background";
import { useQuery } from "@tanstack/react-query";
import CoinCard from "@/components/Coins";
import { fetchCoins } from "@/services/CoinGecko";
import toast from 'react-hot-toast';
import { useEffect } from 'react';

const defaultCoinIds = ['bitcoin', 'ethereum', 'solana', 'matic-network', 'dogecoin'];


export default function Home() {
  const { data: coins, isLoading, isError, refetch } = useQuery<Coin[]>({
    queryKey: ['coins', defaultCoinIds],
    queryFn: () => fetchCoins(defaultCoinIds),
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
        <input
          type="text"
          placeholder="Search for a coin (e.g., Cardano)"
          className="w-full p-4 rounded-xl bg-white/10 backdrop-blur-md border border-cyan-500/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
        />
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array(5)
              .fill(null)
              .map((_, index) => <CoinCard key={index} />)
          ) : coins && coins.length > 0 ? (
            coins.map((coin) => <CoinCard key={coin.id} coin={coin} />)
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