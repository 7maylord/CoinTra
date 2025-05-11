'use client';

import { useState, useRef, useEffect } from 'react';

interface SortControlProps {
  onSortChange: (order: 'asc' | 'desc') => void;
}

export default function SortControl({ onSortChange }: SortControlProps) {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
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

  const handleSortChange = (order: 'asc' | 'desc') => {
    setSortOrder(order);
    onSortChange(order);
    setIsOpen(false);
  };

  const options = [
    { value: 'desc', label: '24h Change (High to Low)' },
    { value: 'asc', label: '24h Change (Low to High)' }
  ];

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 rounded-xl bg-white/10 backdrop-blur-md border border-cyan-500/30 text-white flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
      >
        <span>Sort By</span>
        <svg 
          className={`w-4 h-4 text-cyan-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute w-full mt-2 bg-white/10 backdrop-blur-md border border-cyan-500/30 rounded-xl shadow-lg z-20 animate-fade-in">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSortChange(option.value as 'asc' | 'desc')}
              className={`w-full p-4 text-left hover:bg-cyan-500/20 transition-all ${
                sortOrder === option.value ? 'text-cyan-400' : 'text-white'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}