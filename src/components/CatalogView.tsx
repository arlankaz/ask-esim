import React from 'react';
import type { Country, Currency } from '../types';

interface CatalogViewProps {
  search: string;
  setSearch: (s: string) => void;
  category: string;
  setCategory: (c: string) => void;
  countries: Country[];
  currency: Currency;
  onSelectCountry: (country: Country) => void;
  onOpenCompat: () => void;
  t?: (key: string) => string;
}

export default function CatalogView({
  search,
  setSearch,
  category,
  setCategory,
  countries,
  currency,
  onSelectCountry,
  onOpenCompat,
  t = (k) => k,
}: CatalogViewProps) {
  const categories = [
    { id: 'popular', label: t('popular') || '🔥 Популярные' },
    { id: 'europe', label: t('europe') || 'Европа' },
    { id: 'asia', label: t('asia') || 'Азия' },
    { id: 'middleEast', label: t('middleEast') || 'Ближний Восток' },
    { id: 'america', label: t('america') || 'Америка' },
    { id: 'africa', label: t('africa') || 'Африка' },
    { id: 'global', label: t('global') || 'Весь мир' },
  ];

  return (
    <div className="px-4 pt-4 space-y-5">
      {/* Поисковая строка */}
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('searchPlaceholder') || 'Куда летите? ✈️ (например: Турция)'}
          className="w-full py-3 pl-10 pr-4 bg-slate-800/90 border border-slate-700/80 rounded-2xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition shadow-inner"
        />
        <svg
          className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Категории (все 7 регионов) */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              category === cat.id
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                : 'bg-slate-800/80 text-slate-300 border border-slate-700/50 hover:bg-slate-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Заголовок секции */}
      
<div className="flex items-center justify-between text-xs text-slate-400 font-medium">
  <span className="uppercase tracking-wider">
    {t('travelDestinations')}
  </span>
  <span>
    {countries.length} {t('countriesCount')}
  </span>
</div>


      {/* Сетка стран */}
      {countries.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {countries.map((country) => (
            <div
              key={country.id}
              onClick={() => onSelectCountry(country)}
              className="group relative bg-slate-800/60 border border-slate-700/60 hover:border-cyan-500/50 rounded-2xl p-3.5 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg flex flex-col justify-between h-32"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{country.flag}</span>
              </div>

              <div>
                <h3 className="font-bold text-sm text-white group-hover:text-cyan-400 transition">
                  {t(country.id.toLowerCase()) === country.id.toLowerCase()
  ? country.name
  : t(country.id.toLowerCase())}
                </h3>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[11px] text-slate-400">
                    {t('from')}{' '}
                    <strong className="text-white">
                      {currency === 'KZT'
  ? `${Math.round(country.startUsd * 500 * 2.5)
      .toLocaleString('ru-RU')} ₸`
  : `$${(country.startUsd * 2.5).toFixed(2)}`}
                    </strong>
                  </span>
                  <div className="w-5 h-5 rounded-full bg-slate-700/60 flex items-center justify-center text-slate-300 group-hover:bg-cyan-500 group-hover:text-white transition">
                    →
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center bg-slate-800/40 rounded-2xl border border-slate-700/40">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-700/40 flex items-center justify-center text-slate-400">
            🔍
          </div>
          <p className="text-sm text-slate-300 font-medium">Страна не найдена</p>
          <p className="text-xs text-slate-500 mt-1">Попробуйте изменить запрос</p>
        </div>
      )}

      {/* Баннер проверки совместимости */}
      <div
        onClick={onOpenCompat}
        className="p-4 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700/80 flex items-center justify-between cursor-pointer hover:border-cyan-500/40 transition"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            📱
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Работает ли eSIM на моем телефоне?</h4>
            <p className="text-[11px] text-slate-400">Инструкция проверки iOS / Android</p>
          </div>
        </div>
        <span className="text-slate-400 text-sm">›</span>
      </div>
    </div>
  );
}
