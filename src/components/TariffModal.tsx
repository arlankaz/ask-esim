
import { useEffect, useState } from 'react';
import { X, ArrowRight, Info } from 'lucide-react';

import { getEsimPlans } from '../data/eSIMCatalog';
import { formatPrice, pluralDays } from '../utils';

import type {
  Country,
  Currency,
  SelectedTariff,
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

type TariffText = {
  title: string;
  continue: string;
  information: string;
  unavailable: string;
  days: string;
};

const labels: Record<Language, TariffText> = {
  ru: {
    title: 'Выберите интернет-пакет',
    continue: 'Перейти к оформлению',
    information:
      'Все тарифы действуют 30 дней. Для подключения установите eSIM с помощью QR-кода.',
    unavailable:
      'Для этой страны пока нет доступных тарифов.',
    days: 'дней',
  },

  en: {
    title: 'Choose a data package',
    continue: 'Continue to checkout',
    information:
      'All plans are valid for 30 days. Install your eSIM using the QR code.',
    unavailable:
      'No plans are currently available for this country.',
    days: 'days',
  },

  kk: {
    title: 'Интернет пакетін таңдаңыз',
    continue: 'Рәсімдеуге өту',
    information:
      'Барлық тарифтер 30 күн жарамды. eSIM-ді QR-код арқылы орнатыңыз.',
    unavailable:
      'Бұл ел үшін әзірге қолжетімді тарифтер жоқ.',
    days: 'күн',
  },

  uz: {
    title: 'Internet paketini tanlang',
    continue: 'Rasmiylashtirishga o‘tish',
    information:
      'Barcha tariflar 30 kun amal qiladi. eSIM-ni QR-kod orqali o‘rnating.',
    unavailable:
      'Bu mamlakat uchun hozircha tariflar mavjud emas.',
    days: 'kun',
  },

  uk: {
    title: 'Оберіть інтернет-пакет',
    continue: 'Перейти до оформлення',
    information:
      'Усі тарифи діють 30 днів. Установіть eSIM за допомогою QR-коду.',
    unavailable:
      'Для цієї країни поки немає доступних тарифів.',
    days: 'днів',
  },

  de: {
    title: 'Datenpaket auswählen',
    continue: 'Weiter zur Bestellung',
    information:
      'Alle Tarife sind 30 Tage gültig. Installieren Sie Ihre eSIM mit dem QR-Code.',
    unavailable:
      'Für dieses Land sind derzeit keine Tarife verfügbar.',
    days: 'Tage',
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
  const [selectedId, setSelectedId] = useState('');

  const plans = country
    ? getEsimPlans(country.id)
    : [];

  useEffect(() => {
    if (open && country) {
      const availablePlans = getEsimPlans(country.id);
      setSelectedId(availablePlans[0]?.id ?? '');
    }
  }, [open, country?.id]);

  if (!open || !country) return null;

  const text = labels[lang] ?? labels.ru;

  const selected =
    plans.find((plan) => plan.id === selectedId) ??
    plans[0];

  // Название страны на выбранном языке
  const idKey = country.id.toLowerCase();
  const nameKey = country.name.toLowerCase();

  const translatedId = t(idKey);
  const translatedName = t(nameKey);

  const countryName =
    translatedId !== idKey
      ? translatedId
      : translatedName !== nameKey
        ? translatedName
        : country.name;

  // Правильное обозначение срока действия
  const formatDays = (days: number) =>
    lang === 'ru'
      ? pluralDays(days)
      : `${days} ${text.days}`;

  const handleCheckout = () => {
    if (!selected) return;
    onCheckout(selected);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-end bg-black/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={countryName}
    >
      <div
        className="drawer-slide-up mx-auto max-h-[92vh] w-full max-w-md space-y-4 overflow-y-auto rounded-t-3xl border-t border-gray-800 bg-gray-950 p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))]"
      >
        {/* Заголовок */}
        <div className="flex items-center justify-between border-b border-gray-800/80 pb-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">
              {country.flag}
            </span>

            <h3 className="text-lg font-extrabold text-white">
              {countryName}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть"
            className="rounded-full bg-gray-900 p-2 text-gray-400 transition-colors hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Название раздела */}
        <h4 className="text-sm font-semibold text-gray-300">
          {text.title}
        </h4>

        {/* Список доступных тарифов */}
        <div className="space-y-2.5">
          {plans.map((plan) => {
            const isSelected = selected?.id === plan.id;

            return (
              <button
                type="button"
                key={plan.id}
                onClick={() => setSelectedId(plan.id)}
                aria-pressed={isSelected}
                className={`flex w-full items-center justify-between gap-3 rounded-2xl border p-3.5 text-left transition-all ${
                  isSelected
                    ? 'border-brand-500 bg-brand-500/10'
                    : 'border-gray-800 bg-gray-900/60 hover:border-gray-700'
                }`}
              >
                <div className="flex min-w-0 items-center gap-2">
                  <span className="text-base font-bold text-white">
                    {plan.volume}
                  </span>

                  <span className="text-sm font-medium text-gray-400">
                    {formatDays(plan.days)}
                  </span>
                </div>

                {/* Цена каждого тарифа */}
                <span className="shrink-0 text-base font-extrabold tabular-nums text-brand-400">
                  {formatPrice(plan.priceKzt, currency)}
                </span>
              </button>
            );
          })}

          {plans.length === 0 && (
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-4 text-sm text-gray-300">
              {text.unavailable}
            </div>
          )}
        </div>

        {/* Информация для покупателя */}
        <div className="flex items-start gap-2.5 rounded-2xl border border-gray-800/60 bg-gray-900/60 p-3 text-xs text-gray-400">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />

          <p className="leading-relaxed">
            {text.information}
          </p>
        </div>

        {/* Оформление заказа */}
        <button
          type="button"
          disabled={!selected}
          onClick={handleCheckout}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-500 to-brand-600 py-4 text-base font-bold text-white shadow-lg shadow-brand-500/25 transition-transform active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span>{text.continue}</span>
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
