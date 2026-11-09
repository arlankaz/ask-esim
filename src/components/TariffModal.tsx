import { useEffect, useState } from 'react';
import { X, ArrowRight, Info } from 'lucide-react';
import { fixedTiers, unlimitedTiers } from '../data';
import { formatPrice, pluralDays } from '../utils';
import { USD_RATE, type Country, type Currency, type TariffType, type SelectedTariff } from '../types';

interface TariffModalProps {
  open: boolean;
  country: Country | null;
  currency: Currency;
  onClose: () => void;
  onCheckout: (tariff: SelectedTariff) => void;
}

export default function TariffModal({ open, country, currency, onClose, onCheckout }: TariffModalProps) {
  const [tariffType, setTariffType] = useState<TariffType>('fixed');
  const [selectedId, setSelectedId] = useState<string>('3gb');

  useEffect(() => {
    if (open) {
      setTariffType('fixed');
      setSelectedId('3gb');
    }
  }, [open]);

  if (!open || !country) return null;

  const list = tariffType === 'fixed' ? fixedTiers : unlimitedTiers;

  const selected = list.find((t) => t.id === selectedId) ?? list[0];
  const selectedTariff: SelectedTariff = {
    ...selected,
    priceKzt: Math.round(country.startUsd * selected.mult * USD_RATE * 2.5),
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 backdrop-blur-md flex flex-col justify-end">
      <div className="bg-gray-950 border-t border-gray-800 rounded-t-3xl p-5 space-y-4 drawer-slide-up max-h-[92vh] overflow-y-auto mx-auto w-full max-w-md">
        <div className="flex items-center justify-between border-b border-gray-800/80 pb-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{country.flag}</span>
            <h3 className="font-extrabold text-lg text-white">{country.name}</h3>
          </div>
          <button onClick={onClose} className="p-2 bg-gray-900 rounded-full text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 p-1 bg-gray-900 rounded-2xl border border-gray-800 text-xs font-semibold">
          <button
            onClick={() => {
              setTariffType('fixed');
              setSelectedId('3gb');
            }}
            className={`py-2 rounded-xl transition-all ${
              tariffType === 'fixed' ? 'bg-brand-500 text-white shadow' : 'text-gray-400 hover:text-white'
            }`}
          >
            Фиксированный ГБ
          </button>
          <button
            onClick={() => {
              setTariffType('unlimited');
              setSelectedId('unlim_7d');
            }}
            className={`py-2 rounded-xl transition-all ${
              tariffType === 'unlimited' ? 'bg-brand-500 text-white shadow' : 'text-gray-400 hover:text-white'
            }`}
          >
            Безлимитный ∞
          </button>
        </div>

        <div className="space-y-2.5">
          {list.map((tier) => {
            const priceKzt = Math.round(country.startUsd * tier.mult * USD_RATE * 2.5);
            const displayPrice = formatPrice(priceKzt, currency);
            const isSelected = tier.id === selectedId;
            return (
              <button
                key={tier.id}
                onClick={() => setSelectedId(tier.id)}
                className={`w-full border p-3.5 rounded-2xl cursor-pointer transition-all flex items-center justify-between text-left ${
                  isSelected ? 'border-brand-500 bg-brand-500/10' : 'border-gray-800 bg-gray-900/60 hover:border-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{tier.volume}</span>
                  <span className="font-semibold text-gray-300 text-sm">{pluralDays(tier.days)}</span>
                </div>
                <span className="font-extrabold text-brand-400 text-sm">{displayPrice}</span>
              </button>
            );
          })}
        </div>

        <div className="bg-gray-900/60 p-3 rounded-2xl border border-gray-800/60 flex items-start gap-2.5 text-[11px] text-gray-400">
          <Info className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
          <p>Тариф активируется автоматически при подключении к сотовой сети в стране назначения.</p>
        </div>

        <div className="pt-2">
          <button
            onClick={() => onCheckout(selectedTariff)}
            className="w-full py-4 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-bold rounded-2xl shadow-lg shadow-brand-500/25 active:scale-[0.98] transition-transform flex items-center justify-center gap-2 text-base"
          >
            <span>Перейти к оформлению</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
