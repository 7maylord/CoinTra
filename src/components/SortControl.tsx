'use client';

import { useState, useRef, useEffect } from 'react';

export type SortKey = 'change_desc' | 'change_asc' | 'price_desc' | 'price_asc' | 'name_asc';

interface SortControlProps {
  currentSort: SortKey;
  onSortChange: (order: SortKey) => void;
}

export const SORT_OPTIONS: { value: SortKey; label: string; short: string }[] = [
  { value: 'change_desc', label: '24h Change (Highest First)', short: 'Top Gainers' },
  { value: 'change_asc', label: '24h Change (Lowest First)', short: 'Top Losers' },
  { value: 'price_desc', label: 'Price (Highest First)', short: 'Price: High to Low' },
  { value: 'price_asc', label: 'Price (Lowest First)', short: 'Price: Low to High' },
  { value: 'name_asc', label: 'Name (A to Z)', short: 'Name: A - Z' },
];

export default function SortControl({ currentSort, onSortChange }: SortControlProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (order: SortKey) => {
    onSortChange(order);
    setIsOpen(false);
  };

  const activeOption =
    SORT_OPTIONS.find((opt) => opt.value === currentSort) || SORT_OPTIONS[0];

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-3.5 px-4 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/10 text-white flex items-center justify-between focus:outline-none focus:border-cyan-400/80 focus:ring-2 focus:ring-cyan-400/20 transition-all text-sm font-medium hover:bg-slate-800/80 shadow-inner group"
      >
        <div className="flex items-center gap-2 truncate">
          <svg
            className="w-4 h-4 text-cyan-400 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
            />
          </svg>
          <span className="text-slate-400 text-xs sm:inline hidden">Sort:</span>
          <span className="text-white truncate font-medium">{activeOption.short}</span>
        </div>
        <svg
          className={`w-4 h-4 text-cyan-400 transition-transform duration-200 ml-2 flex-shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 left-0 sm:left-auto sm:w-64 mt-2 bg-slate-900/95 backdrop-blur-2xl border border-cyan-500/30 rounded-2xl shadow-2xl z-30 animate-fade-in overflow-hidden divide-y divide-white/[0.05]">
          <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400 bg-white/[0.02]">
            Sort Watchlist
          </div>
          {SORT_OPTIONS.map((option) => {
            const isSelected = currentSort === option.value;
            return (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`w-full px-4 py-3 text-left text-sm flex items-center justify-between hover:bg-cyan-500/10 transition-colors ${
                  isSelected ? 'text-cyan-300 font-semibold bg-cyan-500/5' : 'text-slate-300'
                }`}
              >
                <span>{option.label}</span>
                {isSelected && (
                  <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}