'use client';

interface HeroSectionProps {
  coinCount?: number;
}

export default function HeroSection({ coinCount = 0 }: HeroSectionProps) {
  return (
    <section className="text-center mb-10">
      {/* Top Pill Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold tracking-wide uppercase mb-4 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.15)] animate-fade-in">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span>Live Crypto Market Pulse</span>
      </div>

      {/* Main Headline */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
        Track Crypto in{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">
          Real Time
        </span>
      </h2>

      {/* Subtitle */}
      <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
        Monitor real-time prices, 24h market volatility, and custom watchlists in a high-performance Web3 dashboard powered by CoinGecko.
      </p>

      {/* Feature / Stats Quick Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
        <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950/80 border border-white/[0.08] backdrop-blur-xl hover:border-cyan-500/40 transition-all text-left group">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Updates</span>
          </div>
          <p className="text-sm font-bold text-white">Live 30s Auto-Sync</p>
          <p className="text-xs text-slate-400 mt-0.5">Real-time market tickers</p>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950/80 border border-white/[0.08] backdrop-blur-xl hover:border-indigo-500/40 transition-all text-left group">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Watchlist</span>
          </div>
          <p className="text-sm font-bold text-white">{coinCount} Coins Monitored</p>
          <p className="text-xs text-slate-400 mt-0.5">Persisted to local storage</p>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950/80 border border-white/[0.08] backdrop-blur-xl hover:border-emerald-500/40 transition-all text-left group">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Precision</span>
          </div>
          <p className="text-sm font-bold text-white">Direct Market API</p>
          <p className="text-xs text-slate-400 mt-0.5">Accurate USD pricing</p>
        </div>
      </div>
    </section>
  );
}