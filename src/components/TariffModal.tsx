import { useEffect, useState } from 'react';
import { X, ArrowRight, Info } from 'lucide-react';
import { fixedTiers, unlimitedTiers } from '../data';
import { formatPrice, pluralDays } from '../utils';
import {
  USD_RATE,
  type Country,
  type Currency,
  type TariffType,
  type SelectedTariff,
} from '../types';
import type { Language } from './translations';

interface TariffModalProps {
  open: boolean;
  country: Country | null;
  currency: Currency;
  onClose: () => void;
  onCheckout: (tariff: SelectedTariff) => void;
  t: (key: string) => string;
  lang: Language;
}

const labels: Record<Language, {
  fixed: string;
  unlimited: string;
  continue: string;
  information: string;
  fup: string;
  days: string;
}> = {
  ru: {
    fixed: 'Пакеты с ГБ', unlimited: 'Безлимит ∞', continue: 'Перейти к оформлению',
    information: 'Демо-тарифы для предварительного просмотра. Условия и доступность будут уточняться у поставщика.',
    fup: 'Условия ограничения скорости', days: 'дней',
  },
  en: {
    fixed: 'Data packages', unlimited: 'Unlimited ∞', continue: 'Continue to checkout',
    information: 'Demo plans for interface preview. Availability and conditions are subject to provider confirmation.',
    fup: 'Fair usage policy', days: 'days',
  },
  kk: {
    fixed: 'Интернет пакеттері', unlimited: 'Шексіз ∞', continue: 'Рәсімдеуге өту',
    information: 'Бұл — интерфейсті көруге арналған демо-тарифтер. Шарттар мен қолжетімділік жеткізушімен нақтыланады.',
    fup: 'Жылдамдық шектеулері', days: 'күн',
  },
  uz: {
    fixed: 'Internet paketlari', unlimited: 'Cheksiz ∞', continue: 'Rasmiylashtirishga o‘tish',
    information: 'Bu interfeysni ko‘rish uchun demo-tariflar. Shartlar va mavjudlik yetkazib beruvchidan aniqlanadi.',
    fup: 'Tezlikni cheklash shartlari', days: 'kun',
  },
  uk: {
    fixed: 'Пакети інтернету', unlimited: 'Безліміт ∞', continue: 'Перейти до оформлення',
    information: 'Демо-тарифи для попереднього перегляду. Умови й доступність потрібно уточнювати у постачальника.',
    fup: 'Обмеження швидкості', days: 'днів',
  },
  de: {
    fixed: 'Datenpakete', unlimited: 'Unbegrenzt ∞', continue: 'Weiter zur Bestellung',
    information: 'Demo-Tarife zur Vorschau. Verfügbarkeit und Bedingungen müssen vom Anbieter bestätigt werden.',
    fup: 'Geschwindigkeitsbegrenzung', days: 'Tage',
  },
};

export default function TariffModal({
  open,
  country,
  currency,
  onClose,
  onCheckout,
  t,
  lang,
}: TariffModalProps) {
  const [tariffType, setTariffType] = useState<TariffType>('fixed');
  const [selectedId, setSelectedId] = useState('3gb');

  useEffect(() => {
    if (open) {
      setTariffType('fixed');
      setSelectedId('3gb');
    }
  }, [open, country?.id]);

  if (!open || !country) return null;

  const text = labels[lang];
  const tierList = tariffType === 'fixed' ? fixedTiers : unlimitedTiers;
  const selected = tierList.find((tier) => tier.id === selectedId) ?? tierList[0];
  const selectedTariff: SelectedTariff = {
    ...selected,
    priceKzt: Math.round(country.startUsd * selected.mult * USD_RATE * 2.5),
  };
  const translatedCountry = t(country.id.toLowerCase());
  const countryName = translatedCountry === country.id.toLowerCase()
    ? (t(country.name.toLowerCase()) === country.name.toLowerCase() ? country.name : t(country.name.toLowerCase()))
    : translatedCountry;
  const formatDays = (days: number) => lang === 'ru' ? pluralDays(days) : `${days} ${text.days}`;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/80 backdrop-blur-md" role="dialog" aria-modal="true" aria-label={countryName}>
      <div className="drawer-slide-up mx-auto w-full max-w-md space-y-4 overflow-y-auto rounded-t-3xl border-t border-gray-800 bg-gray-950 p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] max-h-[92vh]">
        <div className="flex items-center justify-between border-b border-gray-800/80 pb-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{country.flag}</span>
            <h3 className="text-lg font-extrabold text-white">{countryName}</h3>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-full bg-gray-900 p-2 text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 rounded-2xl border border-gray-800 bg-gray-900 p-1 text-xs font-semibold">
          <button type="button" onClick={() => { setTariffType('fixed'); setSelectedId('3gb'); }}
            className={`rounded-xl py-2.5 transition-all ${tariffType === 'fixed' ? 'bg-brand-500 text-white shadow' : 'text-gray-400 hover:text-white'}`}>
            {text.fixed}
          </button>
          <button type="button" onClick={() => { setTariffType('unlimited'); setSelectedId('unlim_7d'); }}
            className={`rounded-xl py-2.5 transition-all ${tariffType === 'unlimited' ? 'bg-brand-500 text-white shadow' : 'text-gray-400 hover:text-white'}`}>
            {text.unlimited}
          </button>
        </div>

        <div className="space-y-2.5">
          {tierList.map((tier) => {
            const priceKzt = Math.round(country.startUsd * tier.mult * USD_RATE * 2.5);
            const isSelected = tier.id === selected.id;
            return (
              <button type="button" key={tier.id} onClick={() => setSelectedId(tier.id)} aria-pressed={isSelected}
                className={`flex w-full items-center justify-between rounded-2xl border p-3.5 text-left transition-all ${isSelected ? 'border-brand-500 bg-brand-500/10' : 'border-gray-800 bg-gray-900/60 hover:border-gray-700'}`}>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">{tariffType === 'unlimited' ? text.unlimited : tier.volume}</span>
                  <span className="text-sm font-semibold text-gray-300">{formatDays(tier.days)}</span>
                </div>
                <span className="text-sm font-extrabold text-brand-400">{formatPrice(priceKzt, currency)}</span>
              </button>
            );
          })}
        </div>

        {tariffType === 'unlimited' && 'fup' in selected && (
          <div className="rounded-2xl border border-amber-500/25 bg-amber-500/10 p-3 text-xs leading-relaxed text-amber-100">
            <strong>{text.fup}:</strong> {selected.fup}
          </div>
        )}

        <div className="flex items-start gap-2.5 rounded-2xl border border-gray-800/60 bg-gray-900/60 p-3 text-[11px] text-gray-400">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
          <p>{text.information}</p>
        </div>

        <button type="button" onClick={() => onCheckout(selectedTariff)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-500 to-brand-600 py-4 text-base font-bold text-white shadow-lg shadow-brand-500/25 transition-transform active:scale-[0.98]">
          <span>{text.continue}</span>
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
