
import { useEffect, useState } from 'react';
import {
  X,
  ShieldCheck,
  ChevronRight,
  CreditCard,
  Apple,
  Info,
  Send,
  Mail,
  CheckCircle2,
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
    message: string,
    variant?: 'success' | 'error'
  ) => void;
}

type CheckoutText = {
  title: string;
  buyingFor: string;
  days: string;
  total: string;
  deliveryTitle: string;
  telegramTitle: string;
  telegramDescription: string;
  telegramNote: string;
  emailLabel: string;
  emailPlaceholder: string;
  emailHint: string;
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
    deliveryTitle: 'Получение eSIM',
    telegramTitle: 'Через Telegram',
    telegramDescription:
      'После оплаты QR-код и инструкция по активации будут отправлены вам в Telegram.',
    telegramNote:
      'Основной способ доставки',
    emailLabel: 'Email (необязательно)',
    emailPlaceholder: 'example@gmail.com',
    emailHint:
      'Укажите почту, если хотите дополнительно получить копию eSIM.',
    paymentTitle: 'Выберите способ оплаты:',
    cards: 'Visa & MasterCard',
    cardsDescription: 'Банковские карты',
    wallets: 'Apple Pay / Google Pay',
    walletsDescription: 'Быстрая оплата',
    agreement: 'Согласен с',
    terms: 'условиями покупки',
    invalidEmail: 'Укажите корректный Email или оставьте поле пустым',
    acceptTerms: 'Подтвердите согласие с условиями',
    demoTitle: 'Демонстрационный режим',
    demoDescription:
      'Оплата и автоматическая доставка пока не подключены. Деньги не списываются, eSIM не выдаётся.',
  },

  en: {
    title: 'Checkout & Payment',
    buyingFor: 'You are buying internet for',
    days: 'days',
    total: 'Total:',
    deliveryTitle: 'eSIM delivery',
    telegramTitle: 'Via Telegram',
    telegramDescription:
      'After payment, your QR code and activation instructions will be sent to you via Telegram.',
    telegramNote: 'Primary delivery method',
    emailLabel: 'Email (optional)',
    emailPlaceholder: 'example@gmail.com',
    emailHint:
      'Enter your email if you would also like a copy of your eSIM.',
    paymentTitle: 'Choose a payment method:',
    cards: 'Visa & MasterCard',
    cardsDescription: 'Bank cards',
    wallets: 'Apple Pay / Google Pay',
    walletsDescription: 'Quick payment',
    agreement: 'I agree to the',
    terms: 'purchase terms',
    invalidEmail: 'Enter a valid email or leave the field blank',
    acceptTerms: 'Please accept the terms',
    demoTitle: 'Demo mode',
    demoDescription:
      'Payments and automatic delivery are not connected yet. No money will be charged and no eSIM will be issued.',
  },

  kk: {
    title: 'Рәсімдеу және төлеу',
    buyingFor: 'Интернет сатып алынатын ел:',
    days: 'күн',
    total: 'Төлем сомасы:',
    deliveryTitle: 'eSIM алу',
    telegramTitle: 'Telegram арқылы',
    telegramDescription:
      'Төлемнен кейін QR-код пен іске қосу нұсқаулығы Telegram арқылы жіберіледі.',
    telegramNote: 'Негізгі жеткізу тәсілі',
    emailLabel: 'Email (міндетті емес)',
    emailPlaceholder: 'example@gmail.com',
    emailHint:
      'eSIM көшірмесін қосымша алу үшін поштаңызды көрсетіңіз.',
    paymentTitle: 'Төлем әдісін таңдаңыз:',
    cards: 'Visa және MasterCard',
    cardsDescription: 'Банк карталары',
    wallets: 'Apple Pay / Google Pay',
    walletsDescription: 'Жылдам төлем',
    agreement: 'Мен келісемін:',
    terms: 'сатып алу шарттары',
    invalidEmail:
      'Дұрыс Email енгізіңіз немесе өрісті бос қалдырыңыз',
    acceptTerms: 'Шарттармен келісіңіз',
    demoTitle: 'Демонстрациялық режим',
    demoDescription:
      'Төлем мен автоматты жеткізу әлі қосылмаған. Ақша алынбайды, eSIM берілмейді.',
  },

  uz: {
    title: 'Rasmiylashtirish va to‘lov',
    buyingFor: 'Internet xarid qilinayotgan mamlakat:',
    days: 'kun',
    total: 'To‘lov summasi:',
    deliveryTitle: 'eSIM yetkazish',
    telegramTitle: 'Telegram orqali',
    telegramDescription:
      'To‘lovdan keyin QR-kod va faollashtirish yo‘riqnomasi Telegram orqali yuboriladi.',
    telegramNote: 'Asosiy yetkazish usuli',
    emailLabel: 'Email (ixtiyoriy)',
    emailPlaceholder: 'example@gmail.com',
    emailHint:
      'eSIM nusxasini ham olish uchun emailingizni kiriting.',
    paymentTitle: 'To‘lov usulini tanlang:',
    cards: 'Visa va MasterCard',
    cardsDescription: 'Bank kartalari',
    wallets: 'Apple Pay / Google Pay',
    walletsDescription: 'Tezkor to‘lov',
    agreement: 'Men roziman:',
    terms: 'xarid shartlari',
    invalidEmail:
      'To‘g‘ri email kiriting yoki maydonni bo‘sh qoldiring',
    acceptTerms: 'Shartlarga rozilik bildiring',
    demoTitle: 'Namoyish rejimi',
    demoDescription:
      'To‘lov va avtomatik yetkazish hali ulanmagan. Pul yechilmaydi va eSIM berilmaydi.',
  },

  uk: {
    title: 'Оформлення та оплата',
    buyingFor: 'Ви купуєте інтернет для',
    days: 'днів',
    total: 'Разом до сплати:',
    deliveryTitle: 'Отримання eSIM',
    telegramTitle: 'Через Telegram',
    telegramDescription:
      'Після оплати QR-код та інструкцію з активації буде надіслано вам у Telegram.',
    telegramNote: 'Основний спосіб доставки',
    emailLabel: 'Email (необов’язково)',
    emailPlaceholder: 'example@gmail.com',
    emailHint:
      'Вкажіть пошту, якщо бажаєте додатково отримати копію eSIM.',
    paymentTitle: 'Оберіть спосіб оплати:',
    cards: 'Visa та MasterCard',
    cardsDescription: 'Банківські картки',
    wallets: 'Apple Pay / Google Pay',
    walletsDescription: 'Швидка оплата',
    agreement: 'Погоджуюся з',
    terms: 'умовами покупки',
    invalidEmail:
      'Вкажіть правильний Email або залиште поле порожнім',
    acceptTerms: 'Підтвердіть згоду з умовами',
    demoTitle: 'Демонстраційний режим',
    demoDescription:
      'Оплату й автоматичну доставку ще не підключено. Кошти не списуються, eSIM не видається.',
  },

  de: {
    title: 'Bestellung & Zahlung',
    buyingFor: 'Du kaufst Internet für',
    days: 'Tage',
    total: 'Gesamtbetrag:',
    deliveryTitle: 'eSIM-Zustellung',
    telegramTitle: 'Über Telegram',
    telegramDescription:
      'Nach der Zahlung werden dein QR-Code und die Aktivierungsanleitung über Telegram zugestellt.',
    telegramNote: 'Standard-Zustellmethode',
    emailLabel: 'E-Mail (optional)',
    emailPlaceholder: 'example@gmail.com',
    emailHint:
      'Gib deine E-Mail-Adresse ein, wenn du zusätzlich eine Kopie erhalten möchtest.',
    paymentTitle: 'Zahlungsmethode auswählen:',
    cards: 'Visa & MasterCard',
    cardsDescription: 'Bankkarten',
    wallets: 'Apple Pay / Google Pay',
    walletsDescription: 'Schnelle Zahlung',
    agreement: 'Ich stimme den',
    terms: 'Kaufbedingungen zu',
    invalidEmail:
      'Bitte eine gültige E-Mail eingeben oder das Feld leer lassen',
    acceptTerms: 'Bitte den Bedingungen zustimmen',
    demoTitle: 'Demomodus',
    demoDescription:
      'Zahlungen und automatische Zustellung sind noch nicht verbunden. Es wird kein Geld abgebucht und keine eSIM ausgestellt.',
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

  if (!open || !country || !tariff) return null;

  const text = translations[lang] ?? translations.ru;

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

  const displayTotal = formatPrice(
    tariff.priceKzt,
    currency
  );

  const daysLabel = `${tariff.days} ${text.days}`;

  const handleContinue = () => {
    const trimmedEmail = email.trim();

    // Email необязательный, но если введён —
    // проверяем корректность.
    if (
      trimmedEmail &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)
    ) {
      onShowToast(text.invalidEmail, 'error');
      return;
    }

    if (!terms) {
      onShowToast(text.acceptTerms, 'error');
      return;
    }

    // Пока это только демонстрация оформления.
    // Настоящая оплата и доставка будут подключены отдельно.
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

        {/* Страна */}
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

        {/* Тариф и сумма */}
        <div className="space-y-2.5 rounded-2xl border border-gray-800 bg-gray-900 p-4">
          <div className="text-base font-bold text-white">
            {tariff.volume} · {daysLabel}
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-gray-800 pt-3">
            <span className="text-sm text-gray-400">
              {text.total}
            </span>
            <span className="text-lg font-extrabold tabular-nums text-brand-400">
              {displayTotal}
            </span>
          </div>
        </div>

        {/* Доставка через Telegram */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-gray-200">
            {text.deliveryTitle}
          </h4>

          <div className="rounded-2xl border border-brand-500/40 bg-brand-500/10 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-500/20 text-brand-400">
                <Send className="h-6 w-6" />
              </div>

              <div className="min-w-0 flex-1 space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-base font-bold text-white">
                    {text.telegramTitle}
                  </span>
                  <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                </div>

                <p className="text-xs font-medium text-cyan-300">
                  {text.telegramNote}
                </p>

                <p className="text-sm leading-relaxed text-gray-300">
                  {text.telegramDescription}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Необязательный email */}
        <div className="space-y-2">
          <label
            htmlFor="checkout-email"
            className="flex items-center gap-2 text-sm font-semibold text-gray-300"
          >
            <Mail className="h-4 w-4 text-gray-400" />
            {text.emailLabel}
          </label>

          <input
            id="checkout-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={text.emailPlaceholder}
            className="w-full rounded-xl border border-gray-800 bg-gray-900 px-3.5 py-3 text-sm text-white placeholder-gray-500 focus:border-brand-500 focus:outline-none"
          />

          <p className="text-xs leading-relaxed text-gray-500">
            {text.emailHint}
          </p>
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
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/20 text-brand-400">
                <CreditCard className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-bold text-white">
                  {text.cards}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  {text.cardsDescription}
                </p>
              </div>
            </div>

            <ChevronRight className="h-5 w-5 shrink-0 text-gray-500" />
          </button>

          <button
            type="button"
            onClick={handleContinue}
            className="flex w-full items-center justify-between gap-3 rounded-2xl border border-gray-800 bg-gray-900 p-3.5 text-left transition-all hover:border-brand-500/50"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
                <Apple className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-bold text-white">
                  {text.wallets}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  {text.walletsDescription}
                </p>
              </div>
            </div>

            <ChevronRight className="h-5 w-5 shrink-0 text-gray-500" />
          </button>
        </div>

        {/* Согласие с условиями */}
        <label className="flex min-h-[52px] cursor-pointer items-center gap-3 py-2 text-base font-medium text-gray-300">
          <input
            type="checkbox"
            checked={terms}
            onChange={(event) => setTerms(event.target.checked)}
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
