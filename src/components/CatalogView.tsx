
import { Search, Smartphone, ChevronRight } from 'lucide-react';
import type { Country, Currency } from '../types';
import { getLowestPriceKzt } from '../data/eSIMCatalog';
import { formatPrice } from '../utils';

interface CatalogViewProps {
  search: string;
  setSearch: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  countries: Country[];
  currency: Currency;
  onSelectCountry: (country: Country) => void;
  onOpenCompat: () => void;
  t?: (key: string) => string;
}

const CATEGORIES = [
  'popular',
  'europe',
  'asia',
  'middleEast',
  'america',
  'africa',
  'global',
] as const;

export default function CatalogView({
  search,
  setSearch,
  category,
  setCategory,
  countries,
  currency,
  onSelectCountry,
  onOpenCompat,
  t = (key) => key,
}: CatalogViewProps) {

  const countryName = (country: Country): string => {
    const idKey = country.id.toLowerCase();
    const translatedById = t(idKey);

    if (translatedById !== idKey) {
      return translatedById;
    }

    const nameKey = country.name.toLowerCase();
    const translatedByName = t(nameKey);

    return translatedByName !== nameKey
      ? translatedByName
      : country.name;
  };

  const priceFrom = (country: Country): string => {
  const priceKzt = getLowestPriceKzt(country.id);

  if (priceKzt === null) return '—';

  return formatPrice(priceKzt, currency);
};
  
  return (
    <section className="mx-auto w-full max-w-2xl space-y-5 px-4 pb-5 pt-4">

      {/* Поиск */}
      <div className="relative">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400"
        />

        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={t('searchPlaceholder')}
          aria-label={t('searchPlaceholder')}
          className="w-full rounded-2xl border border-slate-700/80 bg-slate-800/80 py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-slate-400 outline-none transition-colors focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/15"
        />
      </div>

      {/* Категории */}
      <div
        className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1"
        role="group"
        aria-label={t('travelDestinations')}
      >
        {CATEGORIES.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setCategory(id)}
            aria-pressed={category === id}
            className={`shrink-0 rounded-xl border px-3.5 py-2.5 text-xs font-semibold transition-colors active:scale-[0.98] ${
              category === id
                ? 'border-cyan-400/70 bg-cyan-500 text-white shadow-md shadow-cyan-500/15'
                : 'border-slate-700/70 bg-slate-800/70 text-slate-300 hover:border-slate-500 hover:text-white'
            }`}
          >
            {t(id)}
          </button>
        ))}
      </div>

      {/* Заголовок */}
      <div className="flex items-end justify-between gap-3">
        <h2 className="min-w-0 text-xs font-bold uppercase tracking-[0.12em] text-slate-300">
          {t('travelDestinations')}
        </h2>

        <span className="shrink-0 text-xs font-medium tabular-nums text-slate-400">
          {countries.length} {t('countriesCount')}
        </span>
      </div>

      {/* Карточки стран */}
      {countries.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {countries.map((country) => (
            <button
              key={country.id}
              type="button"
              onClick={() => onSelectCountry(country)}
              aria-label={`${countryName(country)}, ${t('from')} ${priceFrom(country)}`}
              className="group flex min-h-[138px] min-w-0 flex-col rounded-[20px] border border-slate-700/70 bg-gradient-to-b from-slate-800/95 to-slate-900/90 p-3.5 text-left shadow-md shadow-black/10 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-950/20 active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              {/* Флаг — без стрелки */}
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/5 bg-white/5 text-[27px] leading-none">
                {country.flag}
              </div>

              {/* Название и цена */}
              <div className="mt-3 min-w-0 space-y-1.5">
                <h3 className="break-words text-[16px] font-extrabold leading-snug text-white transition-colors group-hover:text-cyan-300">
                  {countryName(country)}
                </h3>

                <p className="text-[14px] font-semibold leading-tight text-slate-400">
                  {t('from')}{' '}
                  <span className="font-extrabold tabular-nums text-cyan-300">
                    {priceFrom(country)}
                  </span>
                </p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-800/40 px-5 py-12 text-center">
          <Search className="mx-auto mb-3 h-8 w-8 text-slate-500" />

          <p className="text-sm font-semibold text-slate-300">
            {t('noResults') === 'noResults'
              ? 'Страна не найдена'
              : t('noResults')}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {t('tryAnotherSearch') === 'tryAnotherSearch'
              ? 'Попробуйте изменить запрос'
              : t('tryAnotherSearch')}
          </p>
        </div>
      )}

      {/* Совместимость */}
      <button
        type="button"
        onClick={onOpenCompat}
        className="group flex w-full items-center gap-3 rounded-2xl border border-slate-700/70 bg-slate-800/60 p-4 text-left transition-colors hover:border-cyan-500/40 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-400">
          <Smartphone className="h-5 w-5" />
        </span>

        <span className="min-w-0 flex-1">
          <span className="block text-xs font-bold leading-snug text-white">
            {t('compatibilityTitle') === 'compatibilityTitle'
              ? 'Работает ли eSIM на моём телефоне?'
              : t('compatibilityTitle')}
          </span>

          <span className="mt-1 block text-[11px] text-slate-400">
            {t('compatibilitySubtitle') === 'compatibilitySubtitle'
              ? 'Инструкция для iOS и Android'
              : t('compatibilitySubtitle')}
          </span>
        </span>

        <ChevronRight className="h-5 w-5 shrink-0 text-slate-500 transition-transform group-hover:translate-x-0.5" />
      </button>

    </section>
  );
}
