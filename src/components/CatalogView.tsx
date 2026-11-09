import { ChevronRight, SearchX } from 'lucide-react';
import { formatPrice, pluralCountries } from '../utils';
import { USD_RATE, type Country, type Currency } from '../types';
import { Smartphone } from 'lucide-react';

interface CatalogViewProps {
  countries: Country[];
  currency: Currency;
  onSelectCountry: (c: Country) => void;
  onOpenCompat: () => void;
}

export default function CatalogView({
  countries,
  currency,
  onSelectCountry,
  onOpenCompat,
}: CatalogViewProps) {
  return (
    <section className="space-y-4 fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold text-gray-400 tracking-wider uppercase">Направления для поездок</h2>
        <span className="text-[11px] text-gray-500 font-medium">{pluralCountries(countries.length)}</span>
      </div>

      {countries.length === 0 ? (
        <div className="text-center py-12 space-y-3 bg-gray-900/50 rounded-3xl border border-gray-800">
          <div className="w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto text-gray-500">
            <SearchX className="w-6 h-6" />
          </div>
          <p className="text-gray-400 text-xs">Страна не найдена. Но скоро появится.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {countries.map((item) => {
            const startPriceKzt = Math.round(item.startUsd * USD_RATE * 3.5);
            const displayPrice = formatPrice(startPriceKzt, currency);
            return (
              <button
                key={item.id}
                onClick={() => onSelectCountry(item)}
                className="bg-gray-900 border border-gray-800 rounded-3xl p-3.5 flex flex-col justify-between hover:border-brand-500/50 transition-all cursor-pointer active:scale-95 shadow-md text-left"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl">{item.flag}</span>
                    <span className="text-[9px] bg-emerald-500/15 text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-500/20">
                      5G / 4G
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-base leading-tight">{item.name}</h3>
                </div>
                <div className="mt-3 pt-2 border-t border-gray-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-gray-500 block leading-none">от</span>
                    <span className="font-extrabold text-brand-400 text-xs">{displayPrice}</span>
                  </div>
                  <div className="w-6 h-6 bg-brand-500/20 text-brand-400 rounded-lg flex items-center justify-center">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      <button
        onClick={onOpenCompat}
        className="w-full bg-gray-900/80 border border-gray-800 rounded-2xl p-3.5 flex items-center justify-between cursor-pointer hover:border-gray-700 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gray-800 flex items-center justify-center text-brand-400">
            <Smartphone className="w-4 h-4" />
          </div>
          <div className="text-left">
            <p className="text-xs font-semibold text-white">Работает ли eSIM на моем телефоне?</p>
            <p className="text-[10px] text-gray-400">Инструкция проверки iOS / Android</p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-500" />
      </button>
    </section>
  );
}
