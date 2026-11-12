import { useEffect, useState } from 'react';
import {
  X,
  ShieldCheck,
  ChevronRight,
  CreditCard,
  Apple,
  Info,
} from 'lucide-react';

import { formatPrice } from '../utils';

import type {
  Country,
  Currency,
  SelectedTariff,
} from '../types';

import type { Language } from './translations';

interface CheckoutModalProps {
  open: boolean;
  country: Country | null;
  tariff: SelectedTariff | null;
  currency: Currency;
  lang: Language;
  t: (key: string) => string;
  onClose: () => void;
  onPaySuccess: () => void;
  onShowToast: (
    msg: string,
    variant?: 'success' | 'error'
  ) => void;
}

type CheckoutText = {
  title: string;
  buyingFor: string;
  days: string;
  total: string;
  emailLabel: string;
  paymentTitle: string;
  cards: string;
  cardsDescription: string;
  wallets: string;
  walletsDescription: string;
  agreement: string;
  terms: string;
  invalidEmail: string;
  acceptTerms: string;
  demoTitle: string;
  demoDescription: string;
};

const translations: Record<Language, CheckoutText> = {
  ru: {
    title: 'Оформление и оплата',
    buyingFor: 'Вы оформляете интернет для',
    days: 'дней',
    total: 'Итого к оплате:',
    emailLabel: 'Укажите Email для получения QR-кода и чека:',
    paymentTitle: 'Выберите способ оплаты:',
    cards: 'Карты Visa & MasterCard',
    cardsDescription: 'Международные банковские карты',
    wallets: 'Apple Pay / Google Pay',
    walletsDescription: 'Быстрая оплата в одно касание',
    agreement: 'Согласен с',
    terms: 'условиями покупки',
    invalidEmail: 'Укажите корректный Email',
    acceptTerms: 'Подтвердите согласие с условиями',
    demoTitle: 'Демонстрационный режим',
    demoDescription:
      'Оплата пока не подключена. Вы можете посмотреть процесс оформления, но деньги не будут списаны.',
  },

  en: {
    title: 'Checkout & Payment',
    buyingFor: 'You are purchasing internet for',
    days: 'days',
    total: 'Total to pay:',
    emailLabel: 'Enter your email for the QR code and receipt:',
    paymentTitle: 'Choose a payment method:',
    cards: 'Visa & MasterCard',
    cardsDescription: 'International bank cards',
    wallets: 'Apple Pay / Google Pay',
    walletsDescription: 'Fast one-tap payment',
    agreement: 'I agree to the',
    terms: 'purchase terms',
    invalidEmail: 'Enter a valid email address',
    acceptTerms: 'Please accept the terms',
    demoTitle: 'Demo mode',
    demoDescription:
      'Payments are not connected yet. You can preview checkout, but no money will be charged.',
  },

  kk: {
    title: 'Рәсімдеу және төлеу',
    buyingFor: 'Интернет пакетін сатып алатын ел:',
    days: 'күн',
    total: 'Төленетін сома:',
    emailLabel: 'QR-код пен түбіртек үшін Email енгізіңіз:',
    paymentTitle: 'Төлем әдісін таңдаңыз:',
    cards: 'Visa және MasterCard',
    cardsDescription: 'Халықаралық банк карталары',
    wallets: 'Apple Pay / Google Pay',
    walletsDescription: 'Бір түртумен жылдам төлеу',
    agreement: 'Мен келісемін:',
    terms: 'сатып алу шарттары',
    invalidEmail: 'Дұрыс Email енгізіңіз',
    acceptTerms: 'Шарттармен келісіңіз',
    demoTitle: 'Демонстрациялық режим',
    demoDescription:
      'Төлем әлі қосылмаған. Рәсімдеу процесін көре аласыз, бірақ ақша алынбайды.',
  },

  uz: {
    title: 'Rasmiylashtirish va to‘lov',
    buyingFor: 'Internet xarid qilinayotgan mamlakat:',
    days: 'kun',
    total: 'Jami to‘lov:',
    emailLabel: 'QR-kod va chek uchun Email kiriting:',
    paymentTitle: 'To‘lov usulini tanlang:',
    cards: 'Visa va MasterCard',
    cardsDescription: 'Xalqaro bank kartalari',
    wallets: 'Apple Pay / Google Pay',
    walletsDescription: 'Bir tegishda tez to‘lov',
    agreement: 'Men roziman:',
    terms: 'xarid shartlari',
    invalidEmail: 'To‘g‘ri Email kiriting',
    acceptTerms: 'Shartlarga rozilik bildiring',
    demoTitle: 'Demo rejim',
    demoDescription:
      'To‘lov hali ulanmagan. Rasmiylashtirishni ko‘rishingiz mumkin, ammo pul yechilmaydi.',
  },

  uk: {
    title: 'Оформлення та оплата',
    buyingFor: 'Ви оформлюєте інтернет для',
    days: 'днів',
    total: 'Разом до сплати:',
    emailLabel: 'Вкажіть Email для QR-коду та чека:',
    paymentTitle: 'Оберіть спосіб оплати:',
    cards: 'Картки Visa та MasterCard',
    cardsDescription: 'Міжнародні банківські картки',
    wallets: 'Apple Pay / Google Pay',
    walletsDescription: 'Швидка оплата одним дотиком',
    agreement: 'Погоджуюся з',
    terms: 'умовами покупки',
    invalidEmail: 'Вкажіть правильний Email',
    acceptTerms: 'Підтвердіть згоду з умовами',
    demoTitle: 'Демонстраційний режим',
    demoDescription:
      'Оплату ще не підключено. Можна переглянути оформлення, але гроші не списуватимуться.',
  },

  de: {
    title: 'Bestellung & Zahlung',
    buyingFor: 'Du kaufst Internet für',
    days: 'Tage',
    total: 'Gesamtbetrag:',
    emailLabel: 'E-Mail für QR-Code und Beleg eingeben:',
    paymentTitle: 'Zahlungsmethode auswählen:',
    cards: 'Visa & MasterCard',
    cardsDescription: 'Internationale Bankkarten',
    wallets: 'Apple Pay / Google Pay',
    walletsDescription: 'Schnelle Zahlung mit einem Tippen',
    agreement: 'Ich stimme den',
    terms: 'Kaufbedingungen zu',
    invalidEmail: 'Bitte gültige E-Mail eingeben',
    acceptTerms: 'Bitte den Bedingungen zustimmen',
    demoTitle: 'Demomodus',
    demoDescription:
      'Zahlungen sind noch nicht verbunden. Du kannst den Bestellvorgang ansehen, aber es wird kein Geld abgebucht.',
  },
};

export default function CheckoutModal({
  open,
  country,
  tariff,
  currency,
  lang,
  t,
  onClose,
  onPaySuccess,
  onShowToast,
}: CheckoutModalProps) {
  const [email, setEmail] = useState('');
  const [terms, setTerms] = useState(false);

  useEffect(() => {
    if (open) {
      setEmail('');
      setTerms(false);
    }
  }, [open]);

  if (!open || !country || !tariff) {
    return null;
  }

  const text = translations[lang] ?? translations.ru;

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

  // Итоговая стоимость равна цене выбранного тарифа
  const displayTotal = formatPrice(
    tariff.priceKzt,
    currency
  );

  // Название тарифа
  const volume =
    tariff.id.startsWith('unlim')
      ? t('unlimited') !== 'unlimited'
        ? t('unlimited')
        : lang === 'ru'
          ? 'Безлимит'
          : lang === 'en'
            ? 'Unlimited'
            : lang === 'kk'
              ? 'Шексіз'
              : lang === 'uz'
                ? 'Cheksiz'
                : lang === 'uk'
                  ? 'Безліміт'
                  : 'Unbegrenzt'
      : tariff.volume;

  const daysLabel = `${tariff.days} ${text.days}`;

  // Проверка данных перед демонстрационным оформлением
  const handleContinue = () => {
    const validEmail =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email.trim()
      );

    if (!validEmail) {
      onShowToast(text.invalidEmail, 'error');
      return;
    }

    if (!terms) {
      onShowToast(text.acceptTerms, 'error');
      return;
    }

    // Реальная оплата пока не подключена
    onPaySuccess();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-end bg-black/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-title"
    >
      <div className="drawer-slide-up mx-auto max-h-[92vh] w-full max-w-md space-y-4 overflow-y-auto rounded-t-3xl border-t border-gray-800 bg-gray-950 p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))]">

        {/* Заголовок */}
        <div className="flex items-center justify-between gap-3 border-b border-gray-800 pb-3">
          <h3
            id="checkout-title"
            className="flex items-center gap-2 text-lg font-bold text-white"
          >
            <ShieldCheck className="h-5 w-5 shrink-0 text-brand-400" />

            <span>
              {text.title}
            </span>
          </h3>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full bg-gray-900 p-2 text-gray-400 transition-colors hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Выбранная страна */}
        <div className="flex items-center gap-2.5 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-3.5 text-sm font-semibold text-brand-300">

          <span className="shrink-0 text-lg">
            {country.flag}
          </span>

          <span>
            {text.buyingFor}{' '}

            <strong className="text-white">
              {countryName}
            </strong>
          </span>
        </div>

        {/* Выбранный тариф и стоимость */}
        <div className="space-y-2.5 rounded-2xl border border-gray-800 bg-gray-900 p-4">

          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-white">
              {volume} · {daysLabel}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-gray-800 pt-2 text-sm">

            <span className="text-gray-400">
              {text.total}
            </span>

            <span className="text-lg font-extrabold text-brand-400">
              {displayTotal}
            </span>
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label
            htmlFor="checkout-email"
            className="text-sm font-semibold text-gray-300"
          >
            {text.emailLabel}
          </label>

          <input
            id="checkout-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            placeholder="yourname@gmail.com"
            className="w-full rounded-xl border border-gray-800 bg-gray-900 px-3.5 py-3 text-sm text-white placeholder-gray-500 focus:border-brand-500 focus:outline-none"
          />
        </div>

        {/* Способы оплаты */}
        <div className="space-y-2">

          <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">
            {text.paymentTitle}
          </p>

          {/* Visa / MasterCard */}
          <button
            type="button"
            onClick={handleContinue}
            className="flex w-full items-center justify-between gap-3 rounded-2xl border border-gray-800 bg-gray-900 p-3.5 text-left transition-all hover:border-brand-500/50"
          >
            <div className="flex min-w-0 items-center gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-500/20 text-brand-400">
                <CreditCard className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-bold text-white">
                  {text.cards}
                </p>

                <p className="mt-1 text-[11px] text-gray-400">
                  {text.cardsDescription}
                </p>
              </div>
            </div>

            <ChevronRight className="h-4 w-4 shrink-0 text-gray-500" />
          </button>

          {/* Apple Pay / Google Pay */}
          <button
            type="button"
            onClick={handleContinue}
            className="flex w-full items-center justify-between gap-3 rounded-2xl border border-gray-800 bg-gray-900 p-3.5 text-left transition-all hover:border-brand-500/50"
          >
            <div className="flex min-w-0 items-center gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
                <Apple className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-bold text-white">
                  {text.wallets}
                </p>

                <p className="mt-1 text-[11px] text-gray-400">
                  {text.walletsDescription}
                </p>
              </div>
            </div>

            <ChevronRight className="h-4 w-4 shrink-0 text-gray-500" />
          </button>
        </div>

{/* Согласие с условиями */}
<label className="flex min-h-[52px] cursor-pointer items-center gap-3 py-2 text-base font-medium text-gray-300">

  <input
    type="checkbox"
    checked={terms}
    onChange={(event) =>
      setTerms(event.target.checked)
    }
    className="h-6 w-6 shrink-0 cursor-pointer rounded-md border-2 border-gray-600 bg-gray-900 accent-cyan-500 focus:ring-2 focus:ring-cyan-400"
  />

  <span className="leading-snug">
    {text.agreement}{' '}

    <span className="font-semibold text-brand-400">
      {text.terms}
    </span>
  </span>

</label>

        {/* Демонстрационный режим */}
        <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/20 bg-amber-500/10 p-3">

          <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />

          <div className="space-y-1">
            <p className="text-xs font-bold text-amber-200">
              {text.demoTitle}
            </p>

            <p className="text-xs leading-relaxed text-amber-100/80">
              {text.demoDescription}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
