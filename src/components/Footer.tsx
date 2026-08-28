'use client';

export default function Footer() {
  return (
    <footer className="mt-16 pt-8 pb-10 border-t border-white/[0.08] text-center relative">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto px-4 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Market data synchronized via</span>
          <a
            href="https://www.coingecko.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 font-semibold underline-offset-2 hover:underline transition-all"
          >
            CoinGecko API
          </a>
        </div>

        <p className="text-slate-400">
          Crafted with ⚡ by{' '}
          <a
            href="https://github.com/7maylord"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 font-bold underline-offset-2 hover:underline transition-all"
          >
            Maylord
          </a>
        </p>

        <div className="text-[11px] text-slate-500 font-mono">
          CoinTra v1.2 • Real-Time Tracker
        </div>
      </div>
    </footer>
  );
}