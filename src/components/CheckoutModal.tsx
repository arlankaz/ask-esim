
import { useEffect, useState } from 'react';
import {
  X,
  ShieldCheck,
  Zap,
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
  upsell: string;
  discount: string;
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
    upsell: 'Добавить +3 GB про запас',
    discount: 'Скидка 20%',
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
    upsell: 'Add an extra 3 GB',
    discount: '20% discount',
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
    upsell: 'Қосымша 3 GB қосу',
    discount: '20% жеңілдік',
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
    upsell: 'Qo‘shimcha 3 GB qo‘shish',
    discount: '20% chegirma',
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
    upsell: 'Додати ще 3 GB',
    discount: 'Знижка 20%',
    emailLabel: 'Вкажіть Email для QR-коду та чека:',
    paymentTitle: 'Оберіть спосіб оплати:',
    cards: 'Картки Visa та MasterCard',
    cardsDescription: 'Міжнародні банківські картки',
    wallets: 'Apple Pay / Google Pay',
    walletsDescription: 'Швидка оплата одним дотиком',
    agreement: 'Погоджуюся з',
    terms: 'умовами покупки',
    invalidEmail: 'Вкажіть правильний Email',
    acceptTerms: 'Підтвердьте згоду з умовами',
    demoTitle: 'Демонстраційний режим',
    demoDescription:
      'Оплату ще не підключено. Можна переглянути оформлення, але гроші не списуватимуться.',
  },
  de: {
    title: 'Bestellung & Zahlung',
    buyingFor: 'Du kaufst Internet für',
    days: 'Tage',
    total: 'Gesamtbetrag:',
    upsell: 'Zusätzliche 3 GB hinzufügen',
    discount: '20 % Rabatt',
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
  const [hasUpsell, setHasUpsell] = useState(false);
  const [terms, setTerms] = useState(false);

  useEffect(() => {
    if (open) {
      setEmail('');
      setHasUpsell(false);
      setTerms(false);
    }
  }, [open]);

  if (!open || !country || !tariff) {
    return null;
  }

  const text = translations[lang] ?? translations.ru;

  // Перевод страны по существующему словарю приложения.
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

  // Демонстрационная стоимость дополнительной опции.
  const upsellPriceKzt = 890;
  const totalKzt =
    tariff.priceKzt +
    (hasUpsell ? upsellPriceKzt : 0);

  const displayTotal = formatPrice(totalKzt, currency);
  const upsellDisplay =
    '+' + formatPrice(upsellPriceKzt, currency);

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

  const daysLabel =
    `${tariff.days} ${text.days}`;

  const handleContinue = () => {
    const validEmail =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

    if (!validEmail) {
      onShowToast(text.invalidEmail, 'error');
      return;
    }

    if (!terms) {
      onShowToast(text.acceptTerms, 'error');
      return;
    }

    // App.tsx открывает демонстрационное завершение.
    // Реальный платёж здесь НЕ производится.
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
            <span>{text.title}</span>
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

        {/* Детали тарифа */}
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

        {/* Дополнительный пакет */}
        <button
          type="button"
          onClick={() => setHasUpsell((value) => !value)}
          aria-pressed={hasUpsell}
          className={`flex w-full items-center justify-between gap-2 rounded-2xl border p-3.5 transition-all ${
            hasUpsell
              ? 'border-amber-500 bg-amber-500/15 shadow-lg shadow-amber-500/10'
              : 'border-amber-500/30 bg-gray-900'
          }`}
        >
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
              <Zap className="h-4 w-4" />
            </div>

            <div className="min-w-0 text-left">
              <p className="text-sm font-bold text-white">
                {text.upsell}
              </p>

              <p className="mt-1 text-[11px] font-medium text-amber-400">
                {text.discount} ({upsellDisplay})
              </p>
            </div>
          </div>

          <span
            aria-hidden="true"
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
              hasUpsell
                ? 'border-brand-500 bg-brand-500 text-white'
                : 'border-gray-600 bg-gray-800'
            }`}
          >
            {hasUpsell ? '✓' : ''}
          </span>
        </button>

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

        {/* Согласие */}
        <label className="flex cursor-pointer items-start gap-2 pt-1 text-xs text-gray-400">
          <input
            type="checkbox"
            checked={terms}
            onChange={(event) =>
              setTerms(event.target.checked)
            }
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-700 bg-gray-900 text-brand-500 focus:ring-brand-500"
          />

          <span>
            {text.agreement}{' '}
            <span className="text-brand-400">
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
