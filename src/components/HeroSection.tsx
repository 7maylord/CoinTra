'use client';

export default function HeroSection() {
  return (
    <section className="text-center mb-12">
      
      {/* Intro */}
      <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
        Dive into the crypto universe with CoinTra! Track live prices, stay updated with the latest news, and customize your portfolio with a sleek Web3 interface. Built for enthusiasts and traders alike.
      </p>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-cyan-500/30 hover:border-cyan-400 transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] animate-fade-in">
          <h3 className="text-xl font-semibold text-white mb-2">Live Price Tracking</h3>
          <p className="text-gray-400">
            Monitor real-time prices for your favorite cryptocurrencies.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-cyan-500/30 hover:border-cyan-400 transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] animate-fade-in relative">
          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse-slow">
            Coming Soon
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Latest Crypto News</h3>
          <p className="text-gray-400">
            Stay informed with curated news from the crypto world, delivered in a sleek Web3 design.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-cyan-500/30 hover:border-cyan-400 transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] animate-fade-in">
          <h3 className="text-xl font-semibold text-white mb-2">Customizable Portfolio</h3>
          <p className="text-gray-400">
            Add, remove, and sort coins to build your perfect watchlist.
          </p>
        </div>
      </div>
    </section>
  );
}