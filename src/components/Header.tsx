import { Search, Wifi, Globe } from 'lucide-react';
import type { Currency } from '../types';

interface HeaderProps {
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
  search: string;
  onSearchChange: (s: string) => void;
  category: string;
  onCategoryChange: (c: string) => void;
  countryCount: string;
  compact?: boolean;
}

const CATEGORIES = [
  { id: 'popular', label: '🔥 Популярные' },
  { id: 'EU', label: 'Европа' },
  { id: 'ASIA', label: 'Азия' },
  { id: 'ME', label: 'Ближний Восток' },
  { id: 'AFRICA', label: 'Африка' },
  { id: 'AMERICA', label: 'Америка' },
  { id: 'all', label: 'Весь мир' },
];

export default function Header({
  currency,
  onCurrencyChange,
  search,
  onSearchChange,
  category,
  onCategoryChange,
  compact = false,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-gray-950/85 glass-header border-b border-gray-800/80 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-brand-500 via-sky-400 to-emerald-400 flex items-center justify-center shadow-lg shadow-brand-500/25">
            <Wifi className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-extrabold text-lg leading-none tracking-tight bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                A-Mobile eSIM
              </h1>
              <span className="text-[9px] bg-brand-500/20 text-brand-400 px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                5G LTE
              </span>
            </div>
            <p className="text-[10px] text-gray-400 font-medium tracking-wide">Global Internet</p>
          </div>
        </div>

        <div className="bg-gray-900 p-1 rounded-xl flex items-center border border-gray-800 text-xs shadow-inner">
          <button
            onClick={() => onCurrencyChange('KZT')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
              currency === 'KZT' ? 'bg-brand-500 text-white shadow-sm' : 'text-gray-400 hover:text-white'
            }`}
          >
            ₸ KZT
          </button>
          <button
            onClick={() => onCurrencyChange('USD')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
              currency === 'USD' ? 'bg-brand-500 text-white shadow-sm' : 'text-gray-400 hover:text-white'
            }`}
          >
            $ USD
          </button>
        </div>
      </div>

      {!compact && (
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Куда летите? ✈️ (например: Турция)"
            className="w-full bg-gray-900/90 text-xs text-white placeholder-gray-400 pl-10 pr-4 py-2.5 rounded-2xl border border-gray-800 focus:outline-none focus:border-brand-500 transition-colors shadow-inner"
          />
        </div>
      )}

      {!compact && (
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5 text-sm font-medium">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                category === cat.id
                  ? 'bg-brand-500 text-white font-semibold shadow-sm'
                  : 'bg-gray-900 text-gray-300 hover:bg-gray-800 border border-gray-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {!compact && (
        <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
          <Globe className="w-3 h-3" />
          <span>Направления для поездок</span>
        </div>
      )}
    </header>
  );
}
